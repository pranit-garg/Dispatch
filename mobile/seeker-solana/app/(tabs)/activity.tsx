/**
 * Activity tab — simple list of completed jobs showing earnings.
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorker } from "../../src/hooks/useWorker";
import { ActivityList } from "../../src/components/JobHistory";
import { colors, spacing, fontSize, fontFamily } from "../../src/theme";

export default function ActivityScreen() {
  const worker = useWorker();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity</Text>
      </View>
      <View style={styles.list}>
        <ActivityList
          jobs={worker.jobHistory}
          isConnected={worker.status === "connected"}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text,
  },
  list: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
});
