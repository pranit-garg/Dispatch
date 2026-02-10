import { createServer, startServer, configFromEnv, buildPaymentConfig, type ERC8004Config } from "@dispatch/coordinator-core";
import { getReputationSummary, giveFeedback, buildJobFeedback } from "@dispatch/erc8004";
import { paymentMiddleware, x402ResourceServer } from "@x402/express";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { privateKeyToAccount } from "viem/accounts";
import { keccak256, toBytes } from "viem";

const config = configFromEnv({
  port: parseInt(process.env.PORT ?? "4010", 10),
  dbPath: process.env.DB_PATH ?? "./data/monad.db",
  network: "eip155:10143",
  payTo: process.env.MONAD_PAY_TO ?? "0x0000000000000000000000000000000000000000",
  facilitatorUrl: process.env.MONAD_FACILITATOR ?? "https://x402-facilitator.molandak.org",
  asset: process.env.MONAD_USDC ?? "0x534b2f3A21130d7a60830c2Df862319e593943A3",
});

const testnetMode = process.env.TESTNET_MODE === "true";

// ── x402 payment middleware (optional) ──────────
let middleware: ReturnType<typeof paymentMiddleware> | undefined;

if (!testnetMode) {
  const network = config.network as `${string}:${string}`;
  const resourceServer = new x402ResourceServer(
    new HTTPFacilitatorClient({ url: config.facilitatorUrl })
  ).register(network, new ExactEvmScheme());

  middleware = paymentMiddleware(buildPaymentConfig(config), resourceServer);
}

// ── ERC-8004 reputation (optional) ──────────────
// Activated when ERC8004_PRIVATE_KEY env var is set.
// Maps worker ed25519 pubkeys → on-chain agentId via keccak256 hash.

let erc8004: ERC8004Config | undefined;

const erc8004Key = process.env.ERC8004_PRIVATE_KEY;
if (erc8004Key) {
  const account = privateKeyToAccount(erc8004Key as `0x${string}`);

  /** Derive a deterministic agentId from a worker pubkey */
  function pubkeyToAgentId(pubkey: string): bigint {
    return BigInt(keccak256(toBytes(pubkey))) & ((1n << 128n) - 1n);
  }

  erc8004 = {
    async getReputationScore(pubkey: string): Promise<number | null> {
      try {
        const agentId = pubkeyToAgentId(pubkey);
        const summary = await getReputationSummary(agentId);
        if (summary.count === 0n) return null;
        // Convert int128 with decimals to 0-100 score
        const raw = Number(summary.summaryValue) / (10 ** summary.summaryValueDecimals);
        return Math.min(100, Math.max(0, raw));
      } catch {
        return null;
      }
    },

    async postFeedback(workerPubkey: string, jobId: string, success: boolean): Promise<void> {
      try {
        const agentId = pubkeyToAgentId(workerPubkey);
        const entry = buildJobFeedback({
          agentId,
          score: success ? 80 : 20,
          jobType: "COMPUTE",
          endpoint: `http://localhost:${config.port}`,
        });
        await giveFeedback(entry, account);
        console.log(`[ERC-8004] Posted ${success ? "positive" : "negative"} feedback for job ${jobId}`);
      } catch (err) {
        console.warn(`[ERC-8004] Failed to post feedback for job ${jobId}:`, err);
      }
    },
  };

  console.log(`[Monad Coordinator] ERC-8004 reputation: ENABLED (account: ${account.address})`);
} else {
  console.log(`[Monad Coordinator] ERC-8004 reputation: DISABLED (no ERC8004_PRIVATE_KEY)`);
}

// ── Start server ────────────────────────────────
const server = createServer(config, {
  ...(middleware && { paymentMiddleware: middleware }),
  ...(erc8004 && { erc8004 }),
});
startServer(config, server);

console.log(`[Monad Coordinator] x402 payment gating: ${testnetMode ? "DISABLED (testnet mode)" : "ENABLED"}`);
