"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "Open",
    stake: "0 $BOLT",
    benefits: "CHEAP tier jobs, standard matching",
    color: "text-text-muted",
  },
  {
    name: "Verified",
    stake: "100 $BOLT",
    benefits: "All tiers, +5 priority, 1.5x rep multiplier",
    color: "text-accent-bright",
  },
  {
    name: "Sentinel",
    stake: "1,000 $BOLT",
    benefits: "Priority matching, +10 bonus, 2x rep, revenue share",
    color: "text-accent",
  },
];

const flywheelSteps = [
  "More jobs",
  "USDC \u2192 $BOLT",
  "Buy pressure",
  "Workers stake",
  "Supply locks",
  "5% burned",
];

export function Tokenomics() {
  return (
    <section
      className="relative overflow-hidden border-t border-border px-6 py-20 md:py-28"
      id="bolt"
    >
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          {/* Coming Soon badge */}
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent-bright">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Coming Soon
          </span>
          <h2 className="text-3xl font-bold md:text-4xl">
            USDC today. BOLT tomorrow.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            Workers earn USDC per job right now. When BOLT launches, every
            dollar of compute will flow through the BOLT token, creating buy
            pressure, supply lock, and burns.
          </p>
        </motion.div>

        {/* Current Status callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 text-center"
        >
          <p className="text-sm font-semibold text-emerald-400">
            Current Status
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Today: Workers earn USDC for each completed job via x402
            micropayments. No token required to participate.
          </p>
        </motion.div>

        {/* Value accrual flywheel — planned, visually subdued */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20 rounded-2xl border border-dashed border-border p-8 md:p-10 opacity-80"
        >
          <div className="mb-10 flex items-center justify-center gap-3 text-center">
            <h3 className="text-lg font-semibold text-text-muted">
              Value Accrual Flywheel
            </h3>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
              Planned
            </span>
          </div>

          {/* Ring layout on desktop, stacked on mobile */}
          <div className="relative mx-auto max-w-lg">
            {/* Connecting circle line (desktop only) */}
            <div className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-center">
              <div className="h-48 w-48 rounded-full border border-dashed border-accent/20" />
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {flywheelSteps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-bold text-accent">
                    {i + 1}
                  </div>
                  <span className="text-center text-sm font-medium">{step}</span>
                </motion.div>
              ))}
            </div>

            {/* Loop indicator */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 flex items-center justify-center gap-2 text-xs text-accent"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              Continuous cycle
            </motion.div>
          </div>
        </motion.div>

        <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border p-8 opacity-80">
          {/* Staking tiers — planned */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 flex items-center gap-3">
              <h3 className="text-lg font-semibold">Staking Tiers</h3>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                Planned
              </span>
            </div>
            <p className="mb-4 text-sm text-text-muted">
              Staking is optional. Anyone can earn with zero stake. Higher tiers
              unlock priority matching and reputation multipliers.
            </p>
            <p className="mb-6 rounded-lg border border-border bg-bg-card/50 px-4 py-2.5 text-xs text-text-dim">
              Staking tiers activate when BOLT launches on Solana.
            </p>
            <div className="space-y-4">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-border bg-bg-card p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${tier.color}`}>
                      {tier.name}
                    </span>
                    <span className="font-mono text-sm text-text-dim">
                      {tier.stake}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">{tier.benefits}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
