import type { BoltConfig } from "./types.js";

export interface SwapResult {
  inputAmount: string;
  outputAmount: string;
  txSignature: string;
  protocolFee: string;
}

/**
 * Swap USDC to BOLT via Jupiter DEX.
 *
 * [DESIGNED] — Jupiter integration for USDC→BOLT atomic swap.
 * Called after x402 USDC payment is verified by the coordinator.
 *
 * Flow:
 * 1. Get Jupiter quote (USDC → BOLT)
 * 2. Build swap transaction
 * 3. Sign and send
 * 4. Return swap result with amounts
 */
export async function swapUsdcToBolt(
  usdcAmount: string,
  config: BoltConfig
): Promise<SwapResult> {
  const jupiterApi = config.jupiterApiUrl ?? "https://quote-api.jup.ag/v6";

  // Get quote from Jupiter
  const quoteUrl = new URL(`${jupiterApi}/quote`);
  quoteUrl.searchParams.set("inputMint", config.usdcMint);
  quoteUrl.searchParams.set("outputMint", config.boltMint);
  quoteUrl.searchParams.set("amount", usdcAmount);
  quoteUrl.searchParams.set("slippageBps", "50"); // 0.5% slippage

  const quoteRes = await fetch(quoteUrl.toString());
  if (!quoteRes.ok) {
    throw new Error(`Jupiter quote failed: ${quoteRes.statusText}`);
  }
  const quote = await quoteRes.json();

  // [DESIGNED] In production: build tx from Jupiter swap API, sign, and send
  // For now, return the quote data as the swap result
  return {
    inputAmount: usdcAmount,
    outputAmount: quote.outAmount ?? "0",
    txSignature: "", // Populated after actual swap execution
    protocolFee: String(Math.floor(Number(quote.outAmount ?? 0) * 0.05)), // 5%
  };
}
