"use client";

import { motion } from "framer-motion";

const agentFeatures = [
  "LLM inference via HTTP",
  "Task processing (summarize, classify, extract)",
  "Three routing policies (FAST, CHEAP, PRIVATE)",
  "Ed25519 verified receipts",
  "SDK + CLI available",
];

const workerFeatures = [
  "Desktop workers (Node.js + Ollama)",
  "Mobile workers via Seeker (Android)",
  "Earn USDC per completed job",
  "ERC-8004 reputation on Monad",
  "Trust pairing for private jobs",
];

function CheckItem({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex items-start gap-3 text-sm text-text-muted"
    >
      <svg
        className="mt-0.5 h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      {text}
    </motion.li>
  );
}

const stats = [
  { label: "chains", value: "2" },
  { label: "latency", value: "<500ms" },
  { label: "lines of code", value: "12K+" },
  { label: "license", value: "MIT" },
];

export function NetworkStatus() {
  return (
    <section className="border-t border-border px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold md:text-4xl"
        >
          What&rsquo;s live today.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mx-auto mt-4 max-w-xl text-center text-text-muted"
        >
          Both sides of the network are fully functional on testnet. Submit jobs
          as an agent or earn as a worker.
        </motion.p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* For Agents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="rounded-xl border border-border bg-bg-card p-6"
          >
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <svg
                  className="h-4 w-4 text-accent-bright"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">For Agents</h3>
            </div>
            <ul className="space-y-3">
              {agentFeatures.map((f, i) => (
                <CheckItem key={f} text={f} delay={0.15 + i * 0.05} />
              ))}
            </ul>
          </motion.div>

          {/* For Workers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="rounded-xl border border-border bg-bg-card p-6"
          >
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green/10">
                <svg
                  className="h-4 w-4 text-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">For Workers</h3>
            </div>
            <ul className="space-y-3">
              {workerFeatures.map((f, i) => (
                <CheckItem key={f} text={f} delay={0.2 + i * 0.05} />
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-dim"
        >
          {stats.map((s, i) => (
            <span key={s.label}>
              {i > 0 && (
                <span className="mr-6 text-border hidden sm:inline">
                  &middot;
                </span>
              )}
              <span className="font-mono">{s.value}</span>{" "}
              <span>{s.label}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
