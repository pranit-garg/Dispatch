/**
 * DeviceKeyProvider — Wraps the existing KeyManager into the SigningProvider interface.
 *
 * This is the default signing mode: a locally-generated ed25519 keypair
 * stored in expo-secure-store. No wallet app needed.
 *
 * Zero behavior change from the original KeyManager — just adapts it
 * to the pluggable SigningProvider interface.
 */
import { Buffer } from "buffer";
import { getOrCreateKeypair, type MobileKeyPair } from "./KeyManager";
import { signData } from "./KeyManager";
import type { SigningProvider } from "./SigningProvider";

export class DeviceKeyProvider implements SigningProvider {
  readonly name = "device-key";
  private keys: MobileKeyPair | null = null;

  async getPublicKeyHex(): Promise<string> {
    if (!this.keys) {
      this.keys = await getOrCreateKeypair();
    }
    return this.keys.pubkeyHex;
  }

  async signMessage(message: Uint8Array): Promise<string> {
    if (!this.keys) {
      this.keys = await getOrCreateKeypair();
    }
    const sig = signData(message, this.keys.secretKey);
    return Buffer.from(sig).toString("base64");
  }

  async connect(): Promise<void> {
    this.keys = await getOrCreateKeypair();
  }

  async disconnect(): Promise<void> {
    this.keys = null;
  }

  async isAvailable(): Promise<boolean> {
    // Device key is always available — we can always generate one
    return true;
  }
}
