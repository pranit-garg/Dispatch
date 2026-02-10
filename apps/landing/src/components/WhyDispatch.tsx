"use client";

import { motion } from "framer-motion";

const blocks = [
  {
    title: "HTTP-native payments",
    description: "Agents pay USDC via x402 headers. The coordinator auto-swaps to BOLT via Jupiter DEX. Workers earn BOLT with real upside — hold, stake for priority, or sell.",
    tag: "x402 / BOLT",
  },
  {
    title: "Portable onchain reputation",
    description: "Workers build ERC-8004 reputation that follows them across apps. BOLT staking amplifies your score — Verified workers get 1.5x, Sentinels get 2x reputation multiplier.",
    tag: "ERC-8004",
  },
  {
    title: "100x lower barrier to entry",
    description: "Any phone or laptop earns BOLT while idle. No GPU, no datacenter. Optional staking starts at just 100 BOLT for priority matching.",
    tag: "Idle devices",
  },
  {
    title: "Solana for economics, Monad for trust",
    description: "BOLT lives on Solana — where 150K+ Seeker phones have wallets. ERC-8004 reputation lives on Monad — where smart contract programmability enables verifiable identity. Each chain does what it's best at.",
    tag: "Dual-chain",
  },
  {
    title: "Cryptographic receipts",
    description: "Every result includes an ed25519 signature over the output hash. Verifiable proof of who computed what — designed for onchain anchoring.",
    tag: "ed25519",
  },
  {
    title: "Fully open source",
    description: "Coordinator, worker SDK, Seeker app, BOLT contracts — all MIT licensed. Fork it, audit it, deploy your own network.",
    tag: "MIT license",
  },
];

function PaymentIllustration() {
  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      <motion.div
        animate={{ x: [0, 60, 60], opacity: [1, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/4 h-8 w-8 rounded-full border-2 border-accent bg-accent/20"
      />
      <div className="h-px w-32 bg-gradient-to-r from-accent/50 to-accent/10" />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="h-16 w-16 rounded-xl border border-border bg-bg-card flex items-center justify-center"
      >
        <span className="text-accent font-mono text-xs font-bold">BOLT</span>
      </motion.div>
    </div>
  );
}

function ReputationIllustration() {
  return (
    <div className="relative h-48 w-full flex items-center justify-center gap-1">
      {[0.3, 0.5, 0.7, 0.85, 1].map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="w-6 rounded-t bg-gradient-to-t from-accent/40 to-accent origin-bottom"
          style={{ height: `${h * 120}px` }}
        />
      ))}
    </div>
  );
}

function DeviceIllustration() {
  return (
    <div className="relative h-48 w-full flex items-center justify-center gap-6">
      <motion.div
        animate={{ boxShadow: ["0 0 0px rgba(212,162,70,0)", "0 0 20px rgba(212,162,70,0.3)", "0 0 0px rgba(212,162,70,0)"] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="h-20 w-12 rounded-lg border border-border bg-bg-card"
      />
      <motion.div
        animate={{ boxShadow: ["0 0 0px rgba(212,162,70,0)", "0 0 20px rgba(212,162,70,0.3)", "0 0 0px rgba(212,162,70,0)"] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className="h-16 w-24 rounded-lg border border-border bg-bg-card"
      />
    </div>
  );
}

function DualChainIllustration() {
  return (
    <div className="relative h-48 w-full flex items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="h-14 w-14 rounded-full border-2 border-green flex items-center justify-center"
      >
        <span className="text-green text-xs font-bold">SOL</span>
      </motion.div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} className="h-px w-3 bg-accent" />
        ))}
      </div>
      <motion.div
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="h-14 w-14 rounded-full border-2 border-accent flex items-center justify-center"
      >
        <span className="text-accent text-xs font-bold">MON</span>
      </motion.div>
    </div>
  );
}

function ReceiptIllustration() {
  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      <motion.div
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        className="h-20 w-20 rounded-xl border-2 border-green/50 bg-green/5 flex items-center justify-center"
      >
        <motion.svg className="h-10 w-10 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>
    </div>
  );
}

function OpenSourceIllustration() {
  return (
    <div className="relative h-48 w-full flex items-center justify-center font-mono text-accent/60">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-2xl"
      >
        {"{ "}
        <span className="text-accent">open</span>
        {" }"}
      </motion.div>
    </div>
  );
}

const illustrations = [
  PaymentIllustration,
  ReputationIllustration,
  DeviceIllustration,
  DualChainIllustration,
  ReceiptIllustration,
  OpenSourceIllustration,
];

export function WhyDispatch() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28" id="why">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse, #d4a246, transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">Why Dispatch?</h2>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">
            Different tradeoffs than every other compute network.
          </p>
        </motion.div>

        <div className="space-y-0">
          {blocks.map((block, i) => {
            const Illustration = illustrations[i];
            const isEven = i % 2 === 1;
            return (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 }}
                className={`flex flex-col gap-8 py-16 md:py-20 ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                } md:items-center md:gap-16`}
              >
                {/* Text */}
                <div className="flex-1">
                  <span className="mb-3 inline-block rounded-full border border-border px-3 py-1 text-xs text-text-dim">
                    {block.tag}
                  </span>
                  <h3 className="text-2xl font-bold md:text-3xl">{block.title}</h3>
                  <p className="mt-4 text-text-muted leading-relaxed">{block.description}</p>
                </div>
                {/* Illustration */}
                <div className="flex-1">
                  {Illustration && <Illustration />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
