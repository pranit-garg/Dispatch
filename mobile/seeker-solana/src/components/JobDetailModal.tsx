/**
 * JobDetailModal: Bottom sheet modal showing full details for a completed job.
 *
 * Slides up from the bottom with a semi-transparent overlay.
 * Displays: Job ID, Task Type, Timestamp, Duration, Result, Earnings.
 */
import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Linking,
  StyleSheet,
} from "react-native";
import type { CompletedJob } from "../services/WebSocketService";
import { colors, spacing, borderRadius, fontSize, fontFamily } from "../theme";

interface JobDetailModalProps {
  job: CompletedJob | null;
  visible: boolean;
  onClose: () => void;
}

const TASK_DISPLAY_NAMES: Record<string, string> = {
  summarize: "Summary",
  classify: "Classify",
  extract_json: "Extract",
  TASK: "AI Task",
};

// ── Helpers ────────────────────────────────────

function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function truncateId(id: string, maxLen = 16): string {
  if (id.length <= maxLen) return id;
  return id.slice(0, 8) + "..." + id.slice(-6);
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

// ── Component ──────────────────────────────────

export function JobDetailModal({ job, visible, onClose }: JobDetailModalProps) {
  if (!job) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          {/* Close button */}
          <Pressable style={styles.closeButton} onPress={onClose} hitSlop={12}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>

          {/* Title */}
          <Text style={styles.sheetTitle}>Job Details</Text>

          {/* Detail rows */}
          <View style={styles.rows}>
            <DetailRow label="Job ID" value={truncateId(job.jobId)} mono />
            <DetailRow label="Task Type" value={TASK_DISPLAY_NAMES[job.taskType] ?? job.taskType} />
            {job.prompt && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Task</Text>
                <Text style={[styles.detailValue, styles.promptText]}>{job.prompt}</Text>
              </View>
            )}
            <DetailRow label="Timestamp" value={formatTimestamp(job.timestamp)} />
            <DetailRow label="Duration" value={formatDuration(job.durationMs)} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Result</Text>
              <View style={styles.resultContainer}>
                <View
                  style={[
                    styles.resultDot,
                    {
                      backgroundColor: job.success
                        ? colors.success
                        : colors.error,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.detailValue,
                    { color: job.success ? colors.success : colors.error },
                  ]}
                >
                  {job.success ? "Success" : "Failed"}
                </Text>
              </View>
            </View>
            <DetailRow label="Earnings" value="0.001 BOLT (devnet)" accent />

            {/* Solana BOLT payment transaction */}
            {job.paymentTxHash ? (
              <Pressable
                style={styles.detailRow}
                onPress={() => {
                  if (job.paymentExplorerUrl) {
                    Linking.openURL(job.paymentExplorerUrl);
                  }
                }}
              >
                <Text style={styles.detailLabel}>Payment Tx</Text>
                <View style={styles.txLinkContainer}>
                  <Text style={styles.solanaTxHash}>
                    {job.paymentTxHash.slice(0, 6)}...{job.paymentTxHash.slice(-4)}
                  </Text>
                  <Text style={styles.solanaLinkIcon}>↗</Text>
                </View>
              </Pressable>
            ) : (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment Tx</Text>
                <Text style={[styles.detailValue, { color: colors.textDim }]}>Batching...</Text>
              </View>
            )}
            <DetailRow label="Payment Network" value="Solana Devnet" />

            {/* Monad reputation transaction */}
            {job.feedbackTxHash ? (
              <Pressable
                style={styles.detailRow}
                onPress={() => {
                  if (job.feedbackExplorerUrl) {
                    Linking.openURL(job.feedbackExplorerUrl);
                  }
                }}
              >
                <Text style={styles.detailLabel}>Reputation Tx</Text>
                <View style={styles.txLinkContainer}>
                  <Text style={styles.txHash}>
                    {job.feedbackTxHash.slice(0, 6)}...{job.feedbackTxHash.slice(-4)}
                  </Text>
                  <Text style={styles.linkIcon}>↗</Text>
                </View>
              </Pressable>
            ) : (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Reputation Tx</Text>
                <Text style={[styles.detailValue, { color: colors.textDim }]}>Pending...</Text>
              </View>
            )}
            {job.feedbackNetwork && (
              <DetailRow label="Reputation Network" value={job.feedbackNetwork === "monad-testnet" ? "Monad Testnet" : job.feedbackNetwork} />
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ── Sub-components ─────────────────────────────

function DetailRow({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text
        style={[
          styles.detailValue,
          mono && styles.mono,
          accent && styles.accentValue,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

// ── Styles ─────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  closeButton: {
    position: "absolute",
    top: spacing.md,
    right: spacing.lg,
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    color: colors.textSecondary,
  },
  sheetTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.semibold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  rows: {
    gap: spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.textDim,
  },
  detailValue: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.text,
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  resultDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
  },
  mono: {
    fontFamily: "monospace",
  },
  accentValue: {
    color: colors.accent,
    fontFamily: fontFamily.semibold,
  },
  txLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  txHash: {
    fontSize: fontSize.sm,
    fontFamily: "monospace",
    color: "#8b5cf6",
  },
  linkIcon: {
    fontSize: fontSize.sm,
    color: "#8b5cf6",
  },
  solanaTxHash: {
    fontSize: fontSize.sm,
    fontFamily: "monospace",
    color: "#d4a246",
  },
  solanaLinkIcon: {
    fontSize: fontSize.sm,
    color: "#d4a246",
  },
  promptText: {
    flex: 1,
    textAlign: "right",
    marginLeft: spacing.md,
  },
});
