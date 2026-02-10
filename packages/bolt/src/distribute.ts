import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import type { BoltConfig } from "./types.js";
import { BOLT } from "@dispatch/protocol";

/**
 * Distribute BOLT tokens to a worker after job completion.
 *
 * [DESIGNED] — SPL token transfer from coordinator treasury to worker.
 * Called after USDC→BOLT swap completes.
 *
 * Flow:
 * 1. Deduct protocol fee (5%)
 * 2. Transfer remaining BOLT to worker's ATA
 * 3. Send protocol fee to treasury (burned or redistributed)
 */
export async function distributeBolt(
  workerPubkey: string,
  boltAmount: string,
  config: BoltConfig
): Promise<string> {
  const connection = new Connection(config.rpcUrl, "confirmed");

  // Calculate protocol fee
  const totalLamports = BigInt(boltAmount);
  const fee = (totalLamports * BigInt(BOLT.PROTOCOL_FEE_BPS)) / 10000n;
  const workerAmount = totalLamports - fee;

  // [DESIGNED] In production:
  // 1. createTransferInstruction from treasury → worker ATA (workerAmount)
  // 2. createTransferInstruction from treasury → burn address (fee)
  // 3. Sign with coordinator keypair and send transaction

  console.log(
    `[BOLT] Distributing ${workerAmount} BOLT to ${workerPubkey} (fee: ${fee} BOLT)`
  );

  // Placeholder — return empty sig until staking program is deployed
  return "";
}
