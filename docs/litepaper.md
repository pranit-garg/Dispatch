# Dispatch: Agent-Native Compute via x402 Payment, ERC-8004 Reputation, and BOLT Token Settlement

**Pranit Garg, February 2026**

---

## Abstract

AI agents are becoming autonomous economic actors that need compute on their own terms. They cannot negotiate GPU leases, sign enterprise contracts, or evaluate provider quality. They need compute that is purchasable via HTTP, priced per job, and backed by verifiable trust signals.

Dispatch is a compute service that routes AI inference jobs from agents to idle consumer hardware (phones and desktops). Agents pay USDC per job via x402 HTTP payment headers. Workers process jobs and return ed25519 signed receipts over their outputs. Coordinators match jobs to workers based on device type, routing policy, and onchain reputation scores. The system runs on a dual-chain architecture: Solana for economics (USDC payments, Seeker device support) and Monad for trust (ERC-8004 identity and reputation, receipt anchoring).

Dispatch combines x402 payments with ERC-8004 reputation, both co-authored by the same team at Coinbase, into a working compute marketplace built on idle consumer devices. BOLT is the planned settlement token that will align network incentives: agents pay USDC, coordinators auto-swap to BOLT via Jupiter DEX, workers earn BOLT with token upside, and a 5% burn on every job creates deflationary pressure. The testnet MVP is live on Monad and Solana with 12,000+ lines of TypeScript, dual-chain coordinators, mobile and desktop workers, and end-to-end cryptographic verification.

---

## Current Status

| Component | Status |
|-----------|--------|
| Coordinator (Monad + Solana) | Live on testnet |
| Desktop workers (Node.js + Ollama) | Live |
| Mobile workers (React Native) | Live, submitted to Solana dApp Store |
| x402 USDC payments | Implemented (testnet mode) |
| Ed25519 receipt signing | Implemented |
| ERC-8004 worker identity | Live on Monad testnet |
| ERC-8004 per-job reputation | Live on Monad testnet |
| ComputeRouter SDK | Implemented |
| CLI (`@dispatch/cli`) | In development |
| BOLT token (SPL) | Designed, not yet deployed |
| Jupiter DEX integration | Designed, not yet deployed |
| BOLT staking tiers | Designed, not yet deployed |

**What's working today:** Full end-to-end flow from agent to coordinator to worker, with USDC settlement, ed25519 receipts, and ERC-8004 reputation. Desktop and mobile workers processing real AI inference (summarization, classification, extraction, LLM via Ollama).

**What's next:** BOLT token deployment on Solana devnet, CLI release, Jupiter DEX integration for automatic USDC-to-BOLT settlement.

---

**[Read the full litepaper (PDF)](https://github.com/pranit-garg/Dispatch/raw/main/docs/Dispatch_Litepaper.pdf)**

If GitHub's in-browser PDF preview fails, use the raw link above to download/open directly.
