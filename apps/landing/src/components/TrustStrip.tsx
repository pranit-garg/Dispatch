"use client";

import { motion } from "framer-motion";

const technologies = [
  "x402 Payments",
  "Monad",
  "Solana",
  "$BOLT Token",
  "TypeScript",
  "ed25519",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function TrustStrip() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 text-xs uppercase tracking-widest text-text-dim"
        >
          Built with
        </motion.p>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3"
        >
          {technologies.map((name, i) => (
            <motion.span key={name} variants={item} className="flex items-center">
              {i > 0 && (
                <span className="mr-2 text-text-dim/40 select-none" aria-hidden>
                  &middot;
                </span>
              )}
              <span className="font-mono text-sm text-text-dim">{name}</span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
