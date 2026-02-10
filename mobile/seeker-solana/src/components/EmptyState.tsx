/**
 * EmptyState: Reusable empty/placeholder component.
 *
 * Displays a gold-tinted icon circle, a title, and a subtitle.
 * Used when there's nothing to show yet (disconnected, no jobs, etc.).
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize, fontFamily } from "../theme";

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>{icon ?? "?"}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent + "18",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  iconText: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.accent,
  },
  title: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.semibold,
    color: colors.textSecondary,
  },
  subtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.textDim,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
  },
});
