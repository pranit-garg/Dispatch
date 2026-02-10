/**
 * StatusCard — Shows connection status, coordinator URL, and worker ID.
 *
 * Visual indicators:
 * - Green dot = connected and processing jobs (pulsing)
 * - Red dot = disconnected
 * - Yellow dot = reconnecting (lost connection, trying to get back)
 * - Blue dot = connecting (initial connection attempt)
 */
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import type { ConnectionStatus } from "../services/WebSocketService";
import { colors, spacing, borderRadius, fontSize, fontFamily } from "../theme";

import type { SigningMode } from "../contexts/WalletProvider";

interface StatusCardProps {
  status: ConnectionStatus;
  coordinatorUrl: string;
  workerId: string | null;
  signingMode?: SigningMode;
  walletAddress?: string | null;
}

const STATUS_CONFIG: Record<
  ConnectionStatus,
  { color: string; label: string }
> = {
  connected: { color: colors.success, label: "Online" },
  disconnected: { color: colors.error, label: "Offline" },
  reconnecting: { color: colors.warning, label: "Reconnecting..." },
  connecting: { color: colors.accentLight, label: "Going live..." },
};

export function StatusCard({
  status,
  coordinatorUrl,
  workerId,
  signingMode = "device-key",
  walletAddress,
}: StatusCardProps) {
  const config = STATUS_CONFIG[status];
  const isWalletMode = signingMode === "wallet";
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulsing green dot when connected
  useEffect(() => {
    if (status === "connected") {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.6,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [status, pulseAnim]);

  // Show wallet address (base58 truncated) or worker ID (hex truncated)
  const identityLabel = isWalletMode ? "Identity" : "Node ID";
  const identityValue = isWalletMode
    ? walletAddress
      ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
      : "No wallet linked"
    : workerId
    ? `${workerId.slice(0, 8)}...${workerId.slice(-8)}`
    : "---";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.statusRow}>
          {status === "connected" ? (
            <Animated.View
              style={[
                styles.dot,
                { backgroundColor: config.color, opacity: pulseAnim },
              ]}
            />
          ) : (
            <View style={[styles.dot, { backgroundColor: config.color }]} />
          )}
          <Text style={[styles.statusLabel, { color: config.color }]}>
            {config.label}
          </Text>
        </View>
        <Text style={styles.badge}>
          {isWalletMode ? "WALLET" : "DEVICE KEY"}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Network</Text>
        <Text style={styles.value} numberOfLines={1}>
          {coordinatorUrl}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>{identityLabel}</Text>
        <Text style={styles.value} numberOfLines={1}>
          {identityValue}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.full,
  },
  statusLabel: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semibold,
  },
  badge: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: colors.accent,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    overflow: "hidden",
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.textDim,
  },
  value: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
    maxWidth: "60%",
  },
});
