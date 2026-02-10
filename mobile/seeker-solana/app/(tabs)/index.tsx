/**
 * Dashboard screen — the main screen of the app.
 *
 * Layout (top to bottom):
 * 1. StatusCard — connection status + worker ID
 * 2. EarningsCard — SOL earned + jobs completed
 * 3. WorkerToggle — big start/stop button
 * 4. JobHistory — recent completed jobs
 */
import React, { useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorker } from "../../src/hooks/useWorker";
import { StatusCard } from "../../src/components/StatusCard";
import { EarningsCard } from "../../src/components/EarningsCard";
import { WorkerToggle } from "../../src/components/WorkerToggle";
import { JobHistory } from "../../src/components/JobHistory";
import { ErrorToast } from "../../src/components/ErrorToast";
import { DashboardSkeleton } from "../../src/components/Skeleton";
import { colors, spacing, fontSize, fontFamily } from "../../src/theme";

export default function DashboardScreen() {
  const worker = useWorker();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (worker.status === "disconnected") {
        await worker.connect();
      }
    } finally {
      setTimeout(() => setRefreshing(false), 1000);
    }
  }, [worker]);

  if (worker.isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <DashboardSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ErrorToast />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/icon.png")}
            style={{ width: 28, height: 28, borderRadius: 6 }}
          />
          <Text style={styles.title}>Dispatch</Text>
          <Text style={styles.subtitle}>Compute Node</Text>
          <View style={styles.headerDivider} />
        </View>

        {/* Wallet connection banner */}
        {worker.signingMode === "wallet" && !worker.walletAddress && (
          <View style={styles.walletBanner}>
            <Text style={styles.walletBannerText}>
              Link your Phantom wallet to earn SOL for compute jobs
            </Text>
          </View>
        )}

        {/* Status */}
        <StatusCard
          status={worker.status}
          coordinatorUrl={worker.coordinatorUrl}
          workerId={worker.workerId}
          signingMode={worker.signingMode}
          walletAddress={worker.walletAddress}
        />

        {/* Earnings */}
        <EarningsCard
          totalEarnings={worker.totalEarnings}
          jobsCompleted={worker.jobsCompleted}
        />

        {/* Toggle */}
        <WorkerToggle
          status={worker.status}
          onToggle={worker.toggle}
          isToggling={worker.isToggling}
          signingMode={worker.signingMode}
          walletConnected={!!worker.walletAddress}
        />

        {/* Job History */}
        <JobHistory
          jobs={worker.jobHistory}
          isConnected={worker.status === "connected"}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  header: {
    alignItems: "center",
    gap: spacing.xs,
    paddingTop: spacing.sm,
  },
  title: {
    fontSize: fontSize.xxl,
    fontFamily: fontFamily.bold,
    color: colors.text,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.accentLight,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  headerDivider: {
    width: "60%",
    height: 1,
    backgroundColor: colors.border,
    marginTop: spacing.sm,
  },
  walletBanner: {
    backgroundColor: colors.warning + "20",
    borderWidth: 1,
    borderColor: colors.warning + "40",
    borderRadius: 12,
    padding: spacing.md,
    alignItems: "center",
  },
  walletBannerText: {
    fontSize: fontSize.sm,
    color: colors.warning,
    fontFamily: fontFamily.semibold,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
