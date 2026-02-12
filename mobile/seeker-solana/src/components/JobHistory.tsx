/**
 * ActivityList: Simple flat list of completed jobs.
 *
 * Each row shows: checkmark/X, "Earned 0.001 BOLT" or "Job failed", relative time.
 * Tap to open detail modal.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import type { CompletedJob } from "../services/WebSocketService";
import { colors, spacing, borderRadius, fontSize, fontFamily } from "../theme";
import { EmptyState } from "./EmptyState";
import { JobDetailModal } from "./JobDetailModal";

interface ActivityListProps {
  jobs: CompletedJob[];
  isConnected?: boolean;
}

// ── Helpers ────────────────────────────────────

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// ── Components ─────────────────────────────────

function ActivityRow({
  job,
  onPress,
}: {
  job: CompletedJob;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}
    >
      <View style={styles.rowLeft}>
        <Text style={job.success ? styles.checkmark : styles.failmark}>
          {job.success ? "✓" : "✗"}
        </Text>
        <Text style={job.success ? styles.rowLabel : styles.rowLabelFailed}>
          {job.success ? "Earned 0.001 BOLT" : "Job failed"}
        </Text>
      </View>
      <Text style={styles.rowTime}>{formatRelativeTime(job.timestamp)}</Text>
    </Pressable>
  );
}

export function ActivityList({ jobs, isConnected = false }: ActivityListProps) {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  // Derive from jobs prop so the modal updates when payment_posted/feedback_posted mutate the job
  const selectedJob = selectedJobId ? jobs.find(j => j.jobId === selectedJobId) ?? null : null;

  if (jobs.length === 0) {
    if (isConnected) {
      return (
        <EmptyState
          icon={"\u{1F50E}"}
          title="Listening for jobs..."
          subtitle="They'll appear here as they complete"
        />
      );
    }
    return (
      <EmptyState
        icon={"\u26A1"}
        title="No activity yet"
        subtitle="Go to Dashboard and tap Go Live to start earning"
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.jobId}
        renderItem={({ item }) => (
          <ActivityRow job={item} onPress={() => setSelectedJobId(item.jobId)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <JobDetailModal
        job={selectedJob}
        visible={selectedJobId !== null}
        onClose={() => setSelectedJobId(null)}
      />
    </View>
  );
}

// Keep legacy export name for backwards compat during transition
export { ActivityList as JobHistory };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  rowPressed: {
    backgroundColor: colors.surfaceLight,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  checkmark: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.success,
  },
  failmark: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.bold,
    color: colors.error,
  },
  rowLabel: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.text,
  },
  rowLabelFailed: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.medium,
    color: colors.error,
  },
  rowTime: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.textDim,
  },
  separator: {
    height: spacing.xs,
  },
});
