import type { StakeTier } from "@dispatch/protocol";

export interface BoltConfig {
  /** BOLT SPL token mint address */
  boltMint: string;
  /** USDC SPL token mint (devnet or mainnet) */
  usdcMint: string;
  /** Solana RPC URL */
  rpcUrl: string;
  /** Protocol treasury wallet for fee collection */
  treasuryPubkey: string;
  /** Jupiter API base URL */
  jupiterApiUrl?: string;
}

export interface StakeAccount {
  pubkey: string;
  tier: StakeTier;
  amount: bigint;
  stakedAt: number;
}
