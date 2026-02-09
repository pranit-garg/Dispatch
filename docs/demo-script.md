# OpenClaw — Monolith Hackathon Demo Script

## Intro (30s)

**What is OpenClaw?** A decentralized compute network that turns any device — phone, laptop, GPU rig — into a compute node. Jobs get routed to the cheapest or fastest available worker, paid via x402 micropayments, with cryptographic receipts proving every result.

**The problem:** AI inference is centralized, expensive, and opaque. You pay OpenAI and trust they ran your model. OpenClaw makes compute verifiable, permissionless, and multi-chain.

---

## Demo Flow

### Step 1: Coordinator Dashboard (15s)

Open `http://localhost:4400/dashboard` in browser.

**Show:**
- Worker count (registered + online)
- Jobs completed so far
- Receipt verification rate (100% = every result is cryptographically signed)

**Say:** "This is the coordinator — it matches jobs to workers and verifies receipts. Think of it as a decentralized load balancer."

---

### Step 2: Mobile App — Wallet Connection (20s)

Open the Seeker app on the Android device.

**Show:**
- Tap "Connect Wallet" — Phantom opens, approve connection
- Wallet address appears in the app
- Toggle between "Wallet Signing" and "Device Key" modes

**Say:** "Workers authenticate with their Solana wallet. The app supports Phantom via Mobile Wallet Adapter, or a local device key for background operation."

---

### Step 3: Start Mobile Worker (10s)

Tap "Start Worker" in the app.

**Show:**
- Status changes to "Online — waiting for jobs"
- Dashboard updates to show +1 worker online

**Say:** "This phone is now a compute node on the network. It registered its capabilities and public key over WebSocket."

---

### Step 4: Submit a Compute Job (15s)

Run the cloudbot CLI:

```bash
pnpm --filter cloudbot-demo start -- --chain solana
```

**Show:**
- Job submission output: job ID, policy tier, privacy class
- Polling for result...

**Say:** "We're submitting an LLM inference job. The coordinator finds the best available worker — in this case, our phone."

---

### Step 5: Watch the Job Complete (15s)

**Show (split screen if possible):**
- Mobile app: "Processing job..." indicator
- CLI: Result appears with latency timing

**Say:** "The worker ran the inference, signed a receipt with its private key, and returned the result. End to end in under 2 seconds."

---

### Step 6: Receipt Verification (15s)

**Show in CLI output:**
- Receipt hash (output_hash)
- Worker public key
- Signature verification: `VERIFIED (ed25519)`

**Show on dashboard:**
- Receipt verification rate updated
- Job appears in recent jobs table as "completed"

**Say:** "Every result comes with a cryptographic receipt — the worker signs a hash of the output with their ed25519 key. The coordinator verifies this signature independently. This is verifiable compute."

---

### Step 7: (Optional) On-Chain Receipt

If Solana anchoring is enabled, show the transaction on Solana Explorer.

**Say:** "Receipts can be anchored on-chain for permanent, tamper-proof audit trails. This transaction proves this specific worker produced this specific output at this specific time."

---

## Technical Highlights to Mention

- **Multi-chain:** Same coordinator protocol works on Monad (EVM) and Solana (SVM). Workers register on either chain.
- **x402 payments:** Jobs are paid via the x402 HTTP payment protocol — the fee is embedded in the HTTP request itself. No token approvals, no separate payment step.
- **Privacy tiers:** PUBLIC jobs go to any worker. PRIVATE jobs only route to workers the user has explicitly trust-paired with (think: your own GPU at home).
- **Atomic matching:** The coordinator uses a synchronous claim-and-assign pattern — no race conditions, no double-booking workers.
- **Mobile-first:** The Seeker app runs on Solana Mobile Stack. Any Android phone with Phantom becomes a compute node.

---

## Q&A Prep

**"How is this different from Akash/Render?"**
Those are GPU rental marketplaces. OpenClaw is a job routing network — it's task-level, not VM-level. Submit a prompt, get a result with a receipt. No containers, no SSH.

**"How do you prevent workers from returning garbage?"**
Receipts. The worker signs a hash of the output. If the output doesn't match the hash, the receipt is invalid. Future: stake slashing for invalid receipts.

**"What's the business model?"**
The coordinator takes a fee on each job via x402. Workers set their own prices. Market-driven pricing.

**"Is this mainnet-ready?"**
This is a hackathon prototype. The protocol design is production-grade, but we're on devnet/testnet. Next steps: stake-based reputation, multi-coordinator federation, GPU worker support.
