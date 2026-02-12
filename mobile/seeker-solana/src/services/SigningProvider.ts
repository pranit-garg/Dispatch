/**
 * SigningProvider — Pluggable interface for signing operations.
 *
 * Abstracts away HOW signing happens so the worker can use either:
 * 1. DeviceKeyProvider — local tweetnacl keypair (existing behavior)
 * 2. MWAProvider — Solana wallet via Mobile Wallet Adapter
 *
 * Both produce ed25519 signatures, so the coordinator doesn't care
 * which one is used — it just verifies with nacl.sign.detached.verify().
 */

export interface SigningProvider {
  /** Unique name for this provider (for UI display / debugging) */
  readonly name: string;

  /** Get the public key as hex string (worker identity on the network) */
  getPublicKeyHex(): Promise<string>;

  /**
   * Sign arbitrary bytes. Returns base64-encoded ed25519 signature.
   * For MWA, this may trigger a wallet popup for approval.
   */
  signMessage(message: Uint8Array): Promise<string>;

  /** Initialize the provider (load keys, authorize wallet, etc.) */
  connect(): Promise<void>;

  /** Clean up (clear auth tokens, etc.) */
  disconnect(): Promise<void>;

  /** Whether this provider is available on this device */
  isAvailable(): Promise<boolean>;
}
