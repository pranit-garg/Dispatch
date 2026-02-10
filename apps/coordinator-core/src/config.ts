export interface CoordinatorConfig {
  port: number;
  dbPath: string;
  network: string;
  payTo: string;
  facilitatorUrl: string;
  asset?: string; // EVM USDC address (Monad), not needed for Solana
  /** Enable BOLT token settlement (USDC → BOLT swap after x402 payment) */
  boltEnabled?: boolean;
  /** BOLT SPL token mint address (Solana) */
  boltMint?: string;
}

export function configFromEnv(overrides?: Partial<CoordinatorConfig>): CoordinatorConfig {
  return {
    port: overrides?.port ?? parseInt(process.env.PORT ?? "4010", 10),
    dbPath: overrides?.dbPath ?? process.env.DB_PATH ?? "./data/coordinator.db",
    network: overrides?.network ?? process.env.NETWORK ?? "eip155:10143",
    payTo: overrides?.payTo ?? process.env.PAY_TO ?? "",
    facilitatorUrl: overrides?.facilitatorUrl ?? process.env.FACILITATOR_URL ?? "",
    asset: overrides?.asset ?? process.env.ASSET,
    boltEnabled: overrides?.boltEnabled ?? process.env.BOLT_ENABLED === "true",
    boltMint: overrides?.boltMint ?? process.env.BOLT_MINT,
  };
}
