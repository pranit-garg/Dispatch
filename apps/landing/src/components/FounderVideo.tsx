"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Pranit provides this, leave empty until then
const VIDEO_URL = "";

export function FounderVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold md:text-3xl">See it in action</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-xl border border-accent/30"
          style={{ boxShadow: "0 0 40px rgba(212,162,70,0.08)" }}
        >
          <div className="relative aspect-video bg-[#0d0d12]">
            {VIDEO_URL && playing ? (
              <iframe
                src={VIDEO_URL}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              /* Facade: custom play button */
              <button
                onClick={() => VIDEO_URL && setPlaying(true)}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-4"
              >
                {/* Play button */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-accent/10 transition-all group-hover:bg-accent/20 group-hover:scale-110">
                  <svg className="h-6 w-6 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-sm text-text-muted">
                  {VIDEO_URL ? "Watch the demo" : "Demo video coming soon"}
                </span>
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
