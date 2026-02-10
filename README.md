# Dispatch

**The compute layer AI agents pay into.**

Agents submit HTTP requests with [x402](https://www.x402.org/) payment headers. Idle phones and desktops process the work. USDC settles per job. No token, no staking — just HTTP and stablecoins.

[dispatch.computer](https://dispatch.computer) · [Docs](https://docs.dispatch.computer) · [Android APK](https://expo.dev/artifacts/eas/pRku9ZWEqdSGS2poEU9VjN.apk)

---

## How It Works

```
Agent (HTTP + x402)  →  Coordinator  →  Worker (phone/desktop)
                            ↓                    ↓
                     Route by reputation    Process job
                     + device type          Sign ed25519 receipt
                            ↓                    ↓
                     USDC settles ←──────── Result returned
```

1. **Agent submits a job** — HTTP POST with an x402 payment header. No SDK required.
2. **Coordinator routes it** — Matches to the best worker by device type, reputation score, and routing policy (FAST / CHEAP / PRIVATE).
3. **Worker processes** — Summarization, classification, extraction, or LLM inference via Ollama.
4. **Worker signs a receipt** — ed25519 signature over the output hash. Cryptographic proof of who computed what.
5. **USDC settles** — x402 micropayment on Solana (SPL) or Monad (EVM). Worker gets paid per job.

## Why Agents?

AI agents need cheap inference at scale. They operate autonomously and can't negotiate GPU leases. Dispatch gives them a simple interface: HTTP request in, verified result out, payment handled inline.

## What's Working (Testnet)

- Full end-to-end flow: agent → coordinator → worker → receipt → settlement
- Android app picking up jobs via WebSocket ([APK](https://expo.dev/artifacts/eas/pRku9ZWEqdSGS2poEU9VjN.apk))
- Desktop workers with Ollama LLM inference
- Ed25519 receipt signing and verification
- Dual-chain coordinators (Monad + Solana)
- Real-time dashboard showing completed jobs and earnings
- Three routing policies: FAST, CHEAP, PRIVATE
- Trust pairing for private job routing
- ERC-8004 worker registration and per-job reputation on Monad

## Solana + Seeker

- **Mobile Wallet Adapter** for worker authentication via Phantom
- **SPL USDC** settlement via x402 `ExactSvmScheme`
- **150K+ Seeker pre-orders** — each device is a potential compute node
- **Ed25519 receipts** use Solana's native signature scheme
- Seeker app submitted to the [Solana dApp Store](https://dappstore.app/)

## Monad + ERC-8004

Dispatch is the first project to combine [x402](https://www.x402.org/) payments with [ERC-8004](https://github.com/erc-8004/erc-8004-contracts) reputation — both designed by the same team at Coinbase.

- **Worker identity** — Workers register as ERC-8004 agents on Monad → receive an agent NFT
- **Per-job reputation** — After every completed job, the coordinator posts onchain feedback: score, skill tag, feedback hash
- **Reputation-aware routing** — Higher-reputation workers get priority in job matching
- **Monad's fast finality** makes per-job reputation updates practical at scale

Contracts on Monad Testnet:
- Identity Registry: `0x8004A818BFB912233c491871b3d84c89A494BD9e`
- Reputation Registry: `0x8004B663056A597Dffe9eCcC1965A193B7388713`

## Architecture

```
packages/
  protocol/          — Shared types, enums, WS messages, pricing
  compute-router/    — Client SDK (decentralized + hosted adapters)
  erc8004/           — ERC-8004 viem wrappers (identity + reputation)
apps/
  coordinator-core/     — Express + SQLite + WebSocket hub
  coordinator-monad/    — Monad x402 config (port 4010)
  coordinator-solana/   — Solana x402 config (port 4020)
  worker-desktop/       — Desktop worker (Node.js + Ollama)
  seeker-simulator/     — Mobile seeker simulator
  cloudbot-demo/        — CLI demo (3 scenarios)
  landing/              — Next.js landing page
  docs/                 — Fumadocs API documentation
mobile/
  seeker-solana/        — React Native Seeker app (Expo + MWA)
chain/
  monad/contracts/      — Solidity receipt anchor
  solana/receipt-anchor/ — Anchor program receipt anchor
```

## Tech Stack

| Layer | Tech |
|-------|------|
| Protocol | TypeScript monorepo, 8K+ lines |
| Coordinators | Express, SQLite, WebSocket |
| Payments | x402 USDC micropayments (Coinbase) |
| Verification | ed25519 signed receipts |
| Reputation | ERC-8004 on Monad (viem) |
| Mobile | React Native, Expo, Solana MWA |
| Desktop Workers | Node.js + Ollama |
| Landing + Docs | Next.js 15, Tailwind, Fumadocs |
| Chains | Solana devnet + Monad testnet |

## Quick Start

```bash
pnpm install && pnpm build
```

### Run Monad E2E

```bash
# Terminal 1 — Coordinator
pnpm dev:monad

# Terminal 2 — Desktop worker
COORDINATOR_URL=http://localhost:4010 pnpm worker:desktop

# Terminal 3 — Seeker simulator
COORDINATOR_URL=http://localhost:4010 pnpm worker:seeker

# Terminal 4 — Run demo
pnpm demo:monad
```

### Run Solana E2E

```bash
# Terminal 1 — Coordinator
pnpm dev:solana

# Terminal 2 — Worker
COORDINATOR_URL=http://localhost:4020 pnpm worker:desktop

# Terminal 3 — Run demo
pnpm demo:solana
```

### Automated E2E

```bash
pnpm e2e    # Spawns coordinators + workers, runs demo scenarios, cleans up
pnpm test   # Unit tests
```

## Links

| | |
|-|-|
| Landing page | [dispatch.computer](https://dispatch.computer) |
| Documentation | [docs.dispatch.computer](https://docs.dispatch.computer) |
| Android APK | [Download](https://expo.dev/artifacts/eas/pRku9ZWEqdSGS2poEU9VjN.apk) |
| ERC-8004 Contracts | [erc-8004/erc-8004-contracts](https://github.com/erc-8004/erc-8004-contracts) |
| x402 Protocol | [x402.org](https://www.x402.org/) |

## License

MIT — see [LICENSE](LICENSE).
