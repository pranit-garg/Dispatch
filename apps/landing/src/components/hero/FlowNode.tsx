"use client";
import { motion } from "framer-motion";

interface FlowNodeProps {
  icon: React.ReactNode;
  label: string;
  delay: number;
  isActive?: boolean;
}

export function FlowNode({ icon, label, delay, isActive }: FlowNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`flex flex-col items-center gap-2 ${isActive ? "text-accent-bright" : "text-text-muted"}`}
    >
      <motion.div
        animate={isActive ? { boxShadow: "0 0 20px rgba(212,162,70,0.3)" } : {}}
        className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-bg-card transition-colors"
      >
        {icon}
      </motion.div>
      <span className="text-xs font-medium">{label}</span>
    </motion.div>
  );
}
