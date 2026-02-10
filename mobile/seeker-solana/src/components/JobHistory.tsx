/**
 * JobHistory — Scrollable list of recently completed jobs.
 *
 * Each row shows:
 * - Task type icon/badge
 * - Timestamp (relative, e.g. "2m ago")
 * - Duration in ms
 * - Success/fail status
 * - Chevron indicator (tappable for detail modal)
 */
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import type { CompletedJob } from "../services/WebSocketService";
import { colors, spacing, borderRadius, fontSize, fontFamily } from "../theme";
import { EmptyState } from "./EmptyState";
import { JobDetailModal } from "./JobDetailModal";

interface JobHistoryProps {
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

const TASK_TYPE_COLORS: Record<string, string> = {
  summarize: "#d4a246",
  classify: "#8b5cf6",
  extract_json: "#ec4899",
  TASK: "#d4a246",
};

// ── Components ─────────────────────────────────

function JobRow({
  job,
  onPress,
}: {
  job: CompletedJob;
  onPress: () => void;
}) {
  const badgeColor = TASK_TYPE_COLORS[job.taskType] ?? colors.textDim;

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        <View style={[styles.typeBadge, { backgroundColor: badgeColor + "20" }]}>
          <Text style={[styles.typeText, { color: badgeColor }]}>
            {job.taskType}
          </Text>
        </View>
        <Text style={styles.timestamp}>{formatRelativeTime(job.timestamp)}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.duration}>{job.durationMs}ms</Text>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: job.success ? colors.success : colors.error },
          ]}
        />
        <Text style={styles.chevron}>{"\u203A"}</Text>
      </View>
    </Pressable>
  );
}

export function JobHistory({ jobs, isConnected = false }: JobHistoryProps) {
  const [selectedJob, setSelectedJob] = useState<CompletedJob | null>(null);
  const prevJobCount = useRef(jobs.length);

  // Animate when new jobs arrive
  useEffect(() => {
    if (jobs.length !== prevJobCount.current) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      prevJobCount.current = jobs.length;
    }
  }, [jobs.length]);

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
        title="Ready when you are"
        subtitle="Tap Go Live to start earning"
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Job History</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.jobId}
        renderItem={({ item }) => (
          <JobRow job={item} onPress={() => setSelectedJob(item)} />
        )}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <JobDetailModal
        job={selectedJob}
        visible={selectedJob !== null}
        onClose={() => setSelectedJob(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: colors.textDim,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  rowPressed: {
    backgroundColor: colors.surfaceLight,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  typeText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.bold,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  timestamp: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.textDim,
  },
  duration: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    color: colors.textSecondary,
    fontVariant: ["tabular-nums"],
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
  },
  chevron: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.regular,
    color: colors.textDim,
  },
  separator: {
    height: spacing.sm,
  },
});
