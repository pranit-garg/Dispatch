/**
 * Theme constants — dark mode colors matching the Dispatch landing page.
 * Consistent with https://dispatch.computer
 */
export const colors = {
  background: "#0a0a0e",
  surface: "#1a1a22",
  surfaceLight: "#252535",
  border: "#2a2a35",
  accent: "#d4a246", // Gold
  accentLight: "#e8b84a",
  accentDim: "#b8922e",
  success: "#34d399",
  error: "#ef4444",
  warning: "#eab308",
  text: "#f8fafc",
  textSecondary: "#94a3b8",
  textDim: "#64748b",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 24,
  xxl: 32,
} as const;
