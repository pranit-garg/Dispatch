/**
 * Skeleton: Shimmer placeholder for loading states.
 *
 * Renders a rounded rectangle with an animated gold shimmer sweep.
 * Used as a placeholder matching the shape of StatusCard, EarningsCard, etc.
 */
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, type ViewStyle } from "react-native";
import { colors, borderRadius } from "../theme";

interface SkeletonProps {
  width: number | string;
  height: number;
  style?: ViewStyle;
  radius?: number;
}

export function Skeleton({
  width,
  height,
  style,
  radius = borderRadius.md,
}: SkeletonProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View
      style={[
        {
          width: width as number,
          height,
          borderRadius: radius,
          backgroundColor: colors.surface,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
}

/** Pre-composed skeleton matching the dashboard layout */
export function DashboardSkeleton() {
  return (
    <View style={styles.container}>
      {/* Header skeleton */}
      <View style={styles.headerSkeleton}>
        <Skeleton width={140} height={32} />
        <Skeleton width={120} height={16} style={{ marginTop: 8 }} />
      </View>

      {/* StatusCard skeleton */}
      <Skeleton width="100%" height={120} radius={borderRadius.lg} />

      {/* EarningsCard skeleton */}
      <Skeleton width="100%" height={100} radius={borderRadius.lg} />

      {/* WorkerToggle skeleton */}
      <View style={styles.toggleSkeleton}>
        <Skeleton width={180} height={180} radius={90} />
      </View>

      {/* JobHistory skeleton */}
      <Skeleton width={100} height={14} />
      <Skeleton width="100%" height={56} />
      <Skeleton width="100%" height={56} />
    </View>
  );
}

const styles = StyleSheet.create({
  shimmer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 120,
    backgroundColor: colors.accent + "08",
  },
  container: {
    padding: 24,
    gap: 24,
  },
  headerSkeleton: {
    alignItems: "center",
    paddingTop: 8,
  },
  toggleSkeleton: {
    alignItems: "center",
    paddingVertical: 24,
  },
});
