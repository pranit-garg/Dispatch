/**
 * WalletProvider: React context for wallet and worker state.
 *
 * Wraps the entire app to provide:
 * - Worker ID (public key hex)
 * - Connection status
 * - Total earnings (persisted to AsyncStorage)
 * - Job history
 *
 * This is the bridge between the WebSocketService singleton
 * and the React component tree.
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWorkerId } from "../services/KeyManager";
import {
  wsService,
  type ConnectionStatus,
  type CompletedJob,
} from "../services/WebSocketService";
import { DeviceKeyProvider } from "../services/DeviceKeyProvider";
import { MWAProvider } from "../services/MWAProvider";
import type { SigningProvider } from "../services/SigningProvider";

// ── Context Shape ─────────────────────────────

export type SigningMode = "wallet" | "device-key";

interface WalletContextType {
  workerId: string | null;
  status: ConnectionStatus;
  totalEarnings: number;
  jobsCompleted: number;
  jobHistory: CompletedJob[];
  coordinatorUrl: string;
  signingMode: SigningMode;
  walletAddress: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  setCoordinatorUrl: (url: string) => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  switchSigningMode: (mode: SigningMode) => void;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

// ── Storage Keys ──────────────────────────────

const STORAGE_EARNINGS = "dispatch_total_earnings";
const STORAGE_JOBS_COMPLETED = "dispatch_jobs_completed";
const STORAGE_JOB_HISTORY = "dispatch_job_history";
const STORAGE_COORDINATOR_URL = "dispatch_coordinator_url";
const STORAGE_SIGNING_MODE = "dispatch_signing_mode";

// Coordinator URL. Set via EXPO_PUBLIC_COORDINATOR_URL or change in Settings
const DEFAULT_COORDINATOR_URL =
  process.env.EXPO_PUBLIC_COORDINATOR_URL ?? "wss://dispatch-solana.up.railway.app";

// ── Provider ──────────────────────────────────

export function WalletProvider({ children }: { children: ReactNode }) {
  const [workerId, setWorkerId] = useState<string | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [jobsCompleted, setJobsCompleted] = useState(0);
  const [jobHistory, setJobHistory] = useState<CompletedJob[]>([]);
  const [coordinatorUrl, setCoordinatorUrlState] = useState(DEFAULT_COORDINATOR_URL);
  const [isLoading, setIsLoading] = useState(true);
  const [signingMode, setSigningMode] = useState<SigningMode>("device-key");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Signing providers (persisted across renders)
  const deviceKeyProvider = useRef(new DeviceKeyProvider()).current;
  const mwaProvider = useRef(new MWAProvider()).current;

  // Load persisted state on mount and set up device key provider as default
  useEffect(() => {
    async function loadPersistedState() {
      try {
        const [
          storedEarnings,
          storedJobsCompleted,
          storedHistory,
          storedUrl,
          storedSigningMode,
          storedWorkerId,
        ] = await Promise.all([
          AsyncStorage.getItem(STORAGE_EARNINGS),
          AsyncStorage.getItem(STORAGE_JOBS_COMPLETED),
          AsyncStorage.getItem(STORAGE_JOB_HISTORY),
          AsyncStorage.getItem(STORAGE_COORDINATOR_URL),
          AsyncStorage.getItem(STORAGE_SIGNING_MODE),
          getWorkerId(),
        ]);

        if (storedEarnings) {
          const earnings = parseFloat(storedEarnings);
          setTotalEarnings(earnings);
          wsService.setEarnings(earnings);
        }
        if (storedJobsCompleted) {
          setJobsCompleted(parseInt(storedJobsCompleted, 10));
        }
        if (storedHistory) {
          const history = JSON.parse(storedHistory) as CompletedJob[];
          setJobHistory(history);
          wsService.setJobHistory(history);
        }
        const effectiveCoordinatorUrl = storedUrl ?? DEFAULT_COORDINATOR_URL;
        setCoordinatorUrlState(effectiveCoordinatorUrl);
        wsService.setCoordinatorUrl(effectiveCoordinatorUrl);

        const effectiveSigningMode: SigningMode =
          storedSigningMode === "wallet" ? "wallet" : "device-key";
        setSigningMode(effectiveSigningMode);
        wsService.setSigningProvider(
          effectiveSigningMode === "wallet" ? mwaProvider : deviceKeyProvider
        );

        if (storedWorkerId) {
          setWorkerId(storedWorkerId);
        }
      } catch (err) {
        console.warn("[Wallet] Failed to load persisted state:", err);
      } finally {
        setIsLoading(false);
      }
    }

    void loadPersistedState();
  }, [deviceKeyProvider, mwaProvider]);

  // Subscribe to WebSocketService events
  useEffect(() => {
    const unsubs = [
      wsService.on("statusChange", (newStatus) => {
        setStatus(newStatus);
      }),

      wsService.on("registered", (wId) => {
        setWorkerId(wId);
      }),

      wsService.on("jobCompleted", (job) => {
        setJobHistory((prev) => {
          const next = [job, ...prev].slice(0, 50);
          // Persist in background
          void AsyncStorage.setItem(STORAGE_JOB_HISTORY, JSON.stringify(next));
          return next;
        });

        if (job.success) {
          setJobsCompleted((prev) => {
            const next = prev + 1;
            void AsyncStorage.setItem(STORAGE_JOBS_COMPLETED, String(next));
            return next;
          });
        }
      }),

      wsService.on("earnings", (newTotal) => {
        setTotalEarnings(newTotal);
        void AsyncStorage.setItem(STORAGE_EARNINGS, String(newTotal));
      }),
    ];

    return () => {
      for (const unsub of unsubs) unsub();
    };
  }, []);

  const connect = useCallback(async () => {
    await wsService.connect();
  }, []);

  const disconnect = useCallback(() => {
    wsService.disconnect();
  }, []);

  const setCoordinatorUrl = useCallback((url: string) => {
    const nextUrl = url.trim();
    if (!nextUrl || nextUrl === coordinatorUrl) return;

    const shouldReconnect = status === "connected" || status === "reconnecting";
    if (shouldReconnect) {
      wsService.disconnect();
    }

    setCoordinatorUrlState(nextUrl);
    wsService.setCoordinatorUrl(nextUrl);
    void AsyncStorage.setItem(STORAGE_COORDINATOR_URL, nextUrl);

    if (shouldReconnect) {
      void wsService.connect();
    }
  }, [coordinatorUrl, status]);

  // Connect to wallet via MWA (opens Phantom for authorization)
  const connectWallet = useCallback(async () => {
    const available = await mwaProvider.isAvailable();
    if (!available) {
      throw new Error("Mobile Wallet Adapter is only available on Android.");
    }

    try {
      await mwaProvider.connect();
      const address = mwaProvider.getWalletAddress();
      setWalletAddress(address);
      setSigningMode("wallet");
      wsService.setSigningProvider(mwaProvider);
      void AsyncStorage.setItem(STORAGE_SIGNING_MODE, "wallet");

      console.log(`[Wallet] Connected: ${address}`);
    } catch (err) {
      console.error("[Wallet] MWA connection failed:", err);
      // Fallback to device key
      wsService.setSigningProvider(deviceKeyProvider);
      setSigningMode("device-key");
      void AsyncStorage.setItem(STORAGE_SIGNING_MODE, "device-key");
      throw err;
    }
  }, [mwaProvider, deviceKeyProvider]);

  const disconnectWallet = useCallback(async () => {
    await mwaProvider.disconnect();
    setWalletAddress(null);
    // Switch back to device key
    wsService.setSigningProvider(deviceKeyProvider);
    setSigningMode("device-key");
    void AsyncStorage.setItem(STORAGE_SIGNING_MODE, "device-key");
  }, [deviceKeyProvider, mwaProvider]);

  const switchSigningMode = useCallback((mode: SigningMode) => {
    if (mode === "device-key") {
      wsService.setSigningProvider(deviceKeyProvider);
      setSigningMode("device-key");
      setWalletAddress(null);
    } else {
      // Switch to wallet mode. User must call connectWallet() separately
      setSigningMode("wallet");
      wsService.setSigningProvider(mwaProvider);
    }
    void AsyncStorage.setItem(STORAGE_SIGNING_MODE, mode);
  }, [deviceKeyProvider, mwaProvider]);

  return (
    <WalletContext.Provider
      value={{
        workerId,
        status,
        totalEarnings,
        jobsCompleted,
        jobHistory,
        coordinatorUrl,
        signingMode,
        walletAddress,
        connect,
        disconnect,
        setCoordinatorUrl,
        connectWallet,
        disconnectWallet,
        switchSigningMode,
        isLoading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────

export function useWallet(): WalletContextType {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return ctx;
}
