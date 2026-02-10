"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    label: "Quote",
    detail: "Agent requests a price for job type and routing policy",
    sub: "GET /v1/quote \u2192 FAST ~$0.010 | CHEAP ~$0.001",
  },
  {
    num: "02",
    label: "Pay",
    detail: "x402 embeds USDC payment directly in the HTTP header",
    sub: "HTTP 402 \u2192 sign USDC tx \u2192 retry with X-PAYMENT",
  },
  {
    num: "03",
    label: "Match",
    detail: "Coordinator claims the best worker by reputation, stake tier, and device type",
    sub: "BOLT stakers get priority \u00b7 Sentinels get 2x rep boost",
  },
  {
    num: "04",
    label: "Execute",
    detail: "Worker processes the task and signs the output",
    sub: "LLM inference \u00b7 summarization \u00b7 classification \u2192 ed25519 receipt",
  },
  {
    num: "05",
    label: "Settle",
    detail: "USDC auto-swaps to BOLT via Jupiter. Worker earns BOLT, 5% burned.",
    sub: "BOLT settlement \u2192 worker wallet \u00b7 protocol fee \u2192 burn address",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-t border-border px-6 py-20 md:py-28" id="how">
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">How it works</h2>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">
            Five steps from request to BOLT-settled, cryptographically verified result.
          </p>
        </motion.div>

        {/* Desktop: horizontal flow */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-[calc(10%)] right-[calc(10%)] h-px"
              style={{ background: "linear-gradient(to right, transparent, #d4a246 20%, #d4a246 80%, transparent)" }}
            />
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-card font-mono text-sm font-bold text-accent-bright shadow-[0_0_20px_rgba(212,162,70,0.15)]">
                    {step.num}
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{step.label}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{step.detail}</p>
                  <p className="mt-2 font-mono text-[10px] text-text-dim leading-relaxed">{step.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="space-y-6 md:hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-bg-card font-mono text-sm font-bold text-accent-bright">
                {step.num}
              </div>
              <div>
                <h3 className="text-sm font-semibold">{step.label}</h3>
                <p className="mt-1 text-sm text-text-muted">{step.detail}</p>
                <p className="mt-1 font-mono text-xs text-text-dim">{step.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
