"use client";

import { motion } from "framer-motion";

const chains = [
  {
    name: "Monad",
    type: "EVM",
    logo: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
        <path d="M6 24V8l10 8-10 8z" fill="#836EF9"/>
        <path d="M16 24V8l10 8-10 8z" fill="#836EF9" fillOpacity="0.6"/>
      </svg>
    ),
    network: "eip155:10143",
    scheme: "ExactEvmScheme",
    facilitator: "x402-facilitator.molandak.org",
    port: "4010",
    color: "accent",
  },
  {
    name: "Solana",
    type: "SVM",
    logo: (
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
        <defs>
          <linearGradient id="sol-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9945FF"/>
            <stop offset="1" stopColor="#14F195"/>
          </linearGradient>
        </defs>
        <path d="M6 22l3-3h17l-3 3H6z" fill="url(#sol-grad)"/>
        <path d="M6 13l3 3h17l-3-3H6z" fill="url(#sol-grad)"/>
        <path d="M6 10l3-3h17l-3 3H6z" fill="url(#sol-grad)"/>
      </svg>
    ),
    network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
    scheme: "ExactSvmScheme",
    facilitator: "x402.org/facilitator",
    port: "4020",
    color: "green",
  },
];

export function Chains() {
  return (
    <section className="border-t border-border px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Dual-chain from day one
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">
            Same protocol, same worker code, different settlement rails.
            Each chain runs its own coordinator with its own database.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {chains.map((chain, i) => (
            <motion.div
              key={chain.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-xl border border-border bg-bg-card p-6 ${
                chain.color === "accent" ? "glow-accent" : "glow-green"
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    chain.color === "accent"
                      ? "bg-accent/10 text-accent-bright"
                      : "bg-green/10 text-green"
                  }`}
                >
                  {chain.logo}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{chain.name}</h3>
                  <p className="text-xs text-text-dim">Port {chain.port}</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-text-dim">network</span>
                  <span className="text-text-muted">{chain.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dim">scheme</span>
                  <span className="text-text-muted">{chain.scheme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dim">facilitator</span>
                  <span className="text-text-muted">{chain.facilitator}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
