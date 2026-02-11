# Dispatch Video Scripts

## 1. Pitch Video (2-3 min, talking head + screen recordings)

> This video also embeds in the landing page FounderVideo section.
> Record as: talking head (webcam) with screen recording cut-ins at [SHOW] cues.
> Tone: calm, confident, direct. Not salesy. You're explaining something real.

---

### SCRIPT

**[0:00 - 0:15] HOOK**

Hey, I'm Pranit. I built Dispatch: a compute network where AI agents pay for inference and idle devices earn for processing it.

One HTTP request in, one verified result out, payment settled inline.

**[0:15 - 0:45] PROBLEM**

[SHOW: screen recording of an AI agent making API calls, hitting rate limits or pricing pages]

Right now, if an AI agent needs compute, it has two options: expensive API calls to centralized providers, or trying to negotiate GPU leases. Neither works at scale.

Agents need cheap inference. They need it on-demand. And they can't sign contracts or manage cloud accounts. They just make HTTP requests.

**[0:45 - 1:30] SOLUTION**

[SHOW: dispatch.computer landing page, scroll through]

Dispatch is the layer between agents and compute. An agent sends a standard HTTP POST with an x402 payment header. The coordinator matches it to an idle worker based on reputation and routing policy. The worker processes the job, signs a cryptographic receipt, and gets paid in USDC. That's it.

[SHOW: CLI demo on the landing page, click "Run Command"]

Here's what that looks like in practice. One CLI command, one result, with a signed receipt proving who computed what.

[SHOW: Seeker phone - open app, tap "Get Started", jobs start flowing within seconds]

On mobile, it's even simpler. Open the app, tap once, and your phone starts processing AI jobs and earning BOLT.

**[1:30 - 2:00] WHY NOW**

Three things make this possible today that didn't exist a year ago.

First, x402: Coinbase's protocol for HTTP-native micropayments. Agents can pay per request without accounts or API keys.

Second, ERC-8004: onchain agent identity and reputation. Workers register, build track records, and agents discover trusted compute through the registry. We're on Monad for this because per-job reputation updates need fast, cheap finality.

Third, Solana Mobile Wallet Adapter and the Seeker. A whole fleet of phones that start earning with a single tap. No wallet setup, no configuration. Open, tap, earn.

[SHOW: Seeker phone mockup from the landing page]

**[2:00 - 2:30] TRACTION**

[SHOW: docs.dispatch.computer, GitHub repo]

This is a working MVP. Dual-chain: Solana for payments and mobile, Monad for identity and reputation. 12,000+ lines of TypeScript. Full end-to-end flow running on testnet.

Desktop workers running Ollama for real LLM inference. A mobile Android app picking up jobs over WebSocket. Ed25519 signed receipts on every result.

Zero-friction mobile: one tap to start earning. Jobs flow within seconds of opening the app.

And the entire codebase was written by AI agents, which seems fitting for a compute network built for AI agents.

**[2:30 - 2:50] CLOSE**

[SHOW: dispatch.computer with CTA buttons visible]

Dispatch. Cheap compute for agents. Passive income for workers. Every result verified.

Check it out at dispatch.computer, or read the docs, or fork the whole thing. It's MIT licensed.

---

## 2. Technical Demo (2-3 min, screen recording + voiceover)

> Record as: screen recording with voiceover narration.
> Tone: technical but accessible. Walk through code and live flows.
> No webcam needed, just your screen and voice.

---

### SCRIPT

**[0:00 - 0:20] INTRO**

This is a technical walkthrough of Dispatch. I'll show the architecture, run a live end-to-end job, and walk through the Solana and Monad integrations.

**[0:20 - 0:50] ARCHITECTURE**

[SHOW: VS Code with the monorepo open, file tree visible]

Dispatch is a TypeScript monorepo. Six packages:

- `coordinator`: the routing and matching layer, Express + WebSocket
- `worker`: desktop workers running Node.js with Ollama
- `cli`: the agent-facing CLI for submitting jobs
- `erc8004`: viem wrappers for Monad's Identity and Reputation registries
- `bolt`: token distribution and staking logic
- Mobile app in `mobile/seeker-solana/`: React Native + Expo

[SHOW: briefly scroll through the packages/ directory]

**[0:50 - 1:30] LIVE E2E FLOW**

[SHOW: terminal, split view with coordinator logs visible]

Let me run a live job. I'll start the coordinator, connect a desktop worker, and submit a job from the CLI.

[SHOW: run `dispatch agent run --type llm --prompt "Explain x402 in one sentence" --policy fast`]

The agent submits the job via HTTP POST. The coordinator matches it to our connected worker based on routing policy. The worker runs the inference through Ollama, signs an ed25519 receipt over the output hash, and returns the result.

[SHOW: highlight the receipt in the response: hash, worker ID, signature]

That receipt is cryptographic proof. You can verify it independently using the worker's public key. No trust required.

[SHOW: split-screen - left: Seeker phone receiving and completing jobs, right: CLI submitting jobs and getting results]

And here's the magic: while the CLI is submitting jobs, the Seeker phone on the right is picking them up and completing them. Earnings tick up in real-time.

**[1:30 - 2:00] SOLANA INTEGRATION**

[SHOW: live Seeker phone - open app, tap Get Started, watch jobs flow in and earnings tick up]

On Solana, the mobile experience is zero-friction. Workers open the Seeker app, tap 'Get Started', and jobs start flowing within seconds. Device keys handle signing automatically. No wallet setup needed for the demo path, though Phantom wallet connection is available in Settings for power users.

Payment settlement uses x402 with USDC on Solana. The `ExactSvmScheme` handles the micropayment inline with the job request. Workers see USDC earnings accumulate in the app dashboard.

[SHOW: the coordinator code where x402 payment is verified]

**[2:00 - 2:30] MONAD INTEGRATION**

[SHOW: packages/erc8004/ code, the contract addresses]

On Monad, we use ERC-8004 for two things: identity and reputation.

Workers register as ERC-8004 agents and get an onchain identity NFT. After every completed job, the coordinator posts feedback to the Reputation Registry: a score, a skill tag, and a feedback hash.

[SHOW: the `claimWorker` function in coordinator that reads reputation scores]

The coordinator reads reputation scores when routing jobs. Higher reputation workers get priority. This creates a flywheel: do good work, build reputation, get better jobs.

The contracts are live on Monad testnet. Identity Registry at `0x8004A8...`, Reputation Registry at `0x8004B6...`.

**[2:30 - 2:50] CLOSE**

[SHOW: GitHub repo README]

That's Dispatch. A working dual-chain compute network with x402 payments, ERC-8004 reputation, and Solana mobile support.

12,000 lines of TypeScript, MIT licensed, built entirely by AI agents. The code is on GitHub, the docs are at docs.dispatch.computer, and it's live on testnet right now.

---

## Recording Notes

### Pitch Video
- **Length target**: 2:30 - 2:50
- **Format**: talking head (webcam) + screen recording cut-ins
- **Background**: clean, dark, minimal
- **Screen recordings needed**:
  - dispatch.computer landing page (scroll through)
  - CLI demo (click "Run Command" button)
  - docs.dispatch.computer (quick flash)
  - GitHub repo page (quick flash)
- **Delivery**: conversational, not rehearsed-sounding. Like explaining to a smart friend.

### Technical Demo
- **Length target**: 2:30 - 2:50
- **Format**: screen recording only, voiceover narration
- **Screen recordings needed**:
  - VS Code with monorepo open
  - Terminal running coordinator + worker + CLI
  - Seeker phone: open app, tap Get Started, jobs auto-flowing, earnings ticking up
  - Code highlights: x402 payment verification, ERC-8004 reputation read, ed25519 receipt signing
- **Delivery**: clear, paced, like a conference talk. Pause when showing code.

### Key Messages to Hit
1. "One HTTP request in, one verified result out"
2. "Written entirely by AI agents" (Colosseum Agent Hackathon requirement)
3. "x402 + ERC-8004 from the same team at Coinbase"
4. "Working MVP, not a spec"
5. "Dual-chain: each chain does what it's best at"
6. "Zero friction: open, tap, earn" (mobile demo)
