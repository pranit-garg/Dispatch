/**
 * Polyfills for React Native environment.
 * Must be imported before any code that uses Buffer or crypto.
 *
 * React Native doesn't have Node.js globals like Buffer or crypto,
 * so we polyfill them here. expo-crypto provides a native-backed
 * crypto.getRandomValues that tweetnacl needs for key generation.
 */
import { getRandomValues } from "expo-crypto";
import { Buffer } from "buffer";

// Polyfill crypto.getRandomValues for tweetnacl (needs PRNG for key generation)
if (typeof globalThis.crypto === "undefined") {
  (globalThis as Record<string, unknown>).crypto = {} as Crypto;
}
if (!globalThis.crypto.getRandomValues) {
  globalThis.crypto.getRandomValues = getRandomValues as typeof globalThis.crypto.getRandomValues;
}

// Make Buffer globally available (tweetnacl and other libs expect it)
if (typeof global !== "undefined") {
  (global as Record<string, unknown>).Buffer = Buffer;
}
