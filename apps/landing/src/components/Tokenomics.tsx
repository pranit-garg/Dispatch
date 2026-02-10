"use client";

import { motion } from "framer-motion";

const tiers = [
  { name: "Open", stake: "0 BOLT", benefits: "CHEAP tier jobs, standard matching", color: "text-text-muted" },
  { name: "Verified", stake: "100 BOLT", benefits: "All tiers, +5 priority, 1.5x rep multiplier", color: "text-accent-bright" },
  { name: "Sentinel", stake: "1,000 BOLT", benefits: "Priority matching, +10 bonus, 2x rep, revenue share", color: "text-accent" },
];

const distribution = [
  { label: "Worker Rewards", pct: 40, color: "bg-accent" },
  { label: "Team + Advisors", pct: 15, color: "bg-accent/70" },
  { label: "Treasury / DAO", pct: 15, color: "bg-accent/50" },
  { label: "Community", pct: 10, color: "bg-green" },
  { label: "Liquidity", pct: 10, color: "bg-green/70" },
  { label: "Hackathon", pct: 5, color: "bg-green/50" },
  { label: "Partners", pct: 5, color: "bg-text-dim" },
];

const flywheelSteps = [
  "More jobs",
  "USDC \u2192 BOLT",
  "Buy pressure",
  "Workers stake",
  "Supply locks",
  "5% burned",
];

export function Tokenomics() {
  return (
    <section className="relative overflow-hidden border-t border-border px-6 py-20 md:py-28" id="bolt">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent-bright">
            BOLT Token
          </span>
          <h2 className="text-3xl font-bold md:text-4xl">
            Pay in USDC. Earn in BOLT.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            Every dollar of compute flows through BOLT. Agents pay stablecoins.
            Workers earn BOLT with real upside — hold, stake for priority, or sell.
          </p>
        </motion.div>

        {/* Value accrual flywheel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="mb-8 text-center text-lg font-semibold text-text-muted">Value Accrual Flywheel</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {flywheelSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg border border-border bg-bg-card px-4 py-2 text-sm font-medium"
                >
                  {step}
                </motion.div>
                {i < flywheelSteps.length - 1 && (
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="text-accent"
                  >
                    &rarr;
                  </motion.span>
                )}
              </div>
            ))}
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-accent"
            >
              &#8635;
            </motion.span>
          </div>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Staking tiers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-lg font-semibold">Staking Tiers</h3>
            <p className="mb-6 text-sm text-text-muted">
              Staking is optional — anyone can earn BOLT with zero stake.
              Higher tiers unlock priority matching and reputation multipliers.
            </p>
            <div className="space-y-4">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-border bg-bg-card p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${tier.color}`}>{tier.name}</span>
                    <span className="font-mono text-sm text-text-dim">{tier.stake}</span>
                  </div>
                  <p className="text-sm text-text-muted">{tier.benefits}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-lg font-semibold">Token Distribution</h3>
            <p className="mb-6 text-sm text-text-muted">
              1 billion BOLT, fixed supply. Never inflationary.
              5% protocol fee burned on every job.
            </p>
            <div className="space-y-3">
              {distribution.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted">{item.label}</span>
                    <span className="font-mono text-text-dim">{item.pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-bg-card overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
