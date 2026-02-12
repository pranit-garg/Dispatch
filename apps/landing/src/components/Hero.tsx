"use client";

import { motion } from "framer-motion";
import { JobFlowDiagram } from "./hero/JobFlowDiagram";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Ambient glow, CSS only */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(ellipse, #d4a246, transparent 70%)" }}
        />
        <div className="absolute -top-20 -left-40 h-[400px] w-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #d4a246, transparent 70%)" }}
        />
        <div className="absolute -top-20 -right-40 h-[400px] w-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #d4a246, transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-1.5 text-sm text-text-muted"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-green animate-pulse" />
          Live on Monad Testnet + Solana Devnet
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 text-xs text-text-dim"
        >
          Available on the Solana dApp Store
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
        >
          Cheap AI compute for agents.{" "}
          <span className="bg-gradient-to-r from-[#d4a246] to-[#f0c674] bg-clip-text text-transparent">
            Passive income
          </span>{" "}
          for workers.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted md:text-xl"
        >
          Agents pay pennies per job via HTTP. Workers earn BOLT from idle
          phones and laptops. Every result is cryptographically verified.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="https://docs.dispatch.computer/docs/getting-started/quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-[#0a0a0e] transition-colors hover:bg-accent-bright"
          >
            {/* Terminal icon */}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Run Your First Job
          </a>
          <a
            href="https://docs.dispatch.computer/docs/guides/run-worker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-text-muted transition-colors hover:border-border-bright hover:text-text"
          >
            {/* Device/hardware icon */}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Earn as a Worker
          </a>
        </motion.div>

        {/* Animated job flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <JobFlowDiagram />
        </motion.div>
      </div>
    </section>
  );
}
