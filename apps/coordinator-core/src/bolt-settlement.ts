import { BOLT, type BoltPayment } from "@dispatch/protocol";

/**
 * Configuration for BOLT settlement.
 * Used by the Solana coordinator to auto-swap USDC → BOLT after x402 payment.
 */
export interface BoltSettlementConfig {
  /** BOLT SPL token mint address */
  boltMint: string;
  /** USDC SPL token mint address */
  usdcMint: string;
  /** Solana RPC URL */
  rpcUrl: string;
  /** Protocol treasury wallet for fee collection + burns */
  treasuryPubkey: string;
  /** Jupiter API base URL (defaults to mainnet) */
  jupiterApiUrl?: string;
}

/**
 * Settle a job payment in BOLT tokens.
 *
 * [DESIGNED] — Called by the coordinator after x402 USDC payment is verified.
 *
 * Flow:
 * 1. USDC received via x402 → coordinator holds it
 * 2. Swap USDC → BOLT via Jupiter DEX
 * 3. Deduct 5% protocol fee (burned)
 * 4. Transfer remaining BOLT to worker
 *
 * This ensures 100% of economic activity flows through BOLT — every job
 * creates buy pressure on the token, unlike a simple fee skim.
 */
export async function settleBolt(
  jobId: string,
  usdcAmount: string,
  workerPubkey: string,
  config: BoltSettlementConfig
): Promise<BoltPayment> {
  const jupiterApi = config.jupiterApiUrl ?? "https://quote-api.jup.ag/v6";

  // Step 1: Get Jupiter quote (USDC → BOLT)
  let boltAmount = "0";
  try {
    const quoteUrl = new URL(`${jupiterApi}/quote`);
    quoteUrl.searchParams.set("inputMint", config.usdcMint);
    quoteUrl.searchParams.set("outputMint", config.boltMint);
    quoteUrl.searchParams.set("amount", usdcAmount);
    quoteUrl.searchParams.set("slippageBps", "50");

    const quoteRes = await fetch(quoteUrl.toString());
    if (quoteRes.ok) {
      const quote = await quoteRes.json();
      boltAmount = quote.outAmount ?? "0";
    }
  } catch (err) {
    console.warn(`[BOLT] Jupiter quote failed for job ${jobId}:`, err);
  }

  // Step 2: Calculate protocol fee (5% of BOLT received)
  const totalBolt = BigInt(boltAmount || "0");
  const protocolFee = (totalBolt * BigInt(BOLT.PROTOCOL_FEE_BPS)) / 10000n;
  const workerBolt = totalBolt - protocolFee;

  // Step 3: [DESIGNED] Execute swap + transfers on-chain
  // In production:
  // - Build Jupiter swap transaction (USDC → BOLT)
  // - Add SPL transfer instruction (workerBolt → worker ATA)
  // - Add SPL burn instruction (protocolFee → burn)
  // - Sign with coordinator keypair and send as atomic transaction

  console.log(
    `[BOLT] Settlement for job ${jobId}: ${usdcAmount} USDC → ${boltAmount} BOLT ` +
    `(worker: ${workerBolt}, fee: ${protocolFee})`
  );

  return {
    job_id: jobId,
    usdc_amount: usdcAmount,
    bolt_amount: workerBolt.toString(),
    worker_pubkey: workerPubkey,
    protocol_fee: protocolFee.toString(),
    tx_signature: "", // Populated after actual on-chain execution
  };
}
