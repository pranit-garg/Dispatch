"use client";
import { motion } from "framer-motion";

interface FlowLineProps {
  delay: number;
  vertical?: boolean;
}

export function FlowLine({ delay, vertical }: FlowLineProps) {
  return (
    <div className={`relative ${vertical ? "h-8 w-px mx-auto" : "h-px w-8 md:w-12 my-auto"}`}>
      <div className={`absolute inset-0 ${vertical ? "bg-gradient-to-b" : "bg-gradient-to-r"} from-border via-accent/30 to-border`} />
      <motion.div
        initial={{ [vertical ? "top" : "left"]: "-10%" }}
        animate={{ [vertical ? "top" : "left"]: "110%" }}
        transition={{ duration: 1.5, delay, repeat: Infinity, ease: "linear" }}
        className={`absolute ${vertical ? "left-1/2 -translate-x-1/2 h-2 w-2" : "top-1/2 -translate-y-1/2 h-2 w-2"} rounded-full bg-accent`}
        style={{ boxShadow: "0 0 8px rgba(212,162,70,0.6)" }}
      />
    </div>
  );
}
