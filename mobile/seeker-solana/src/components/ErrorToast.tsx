/**
 * ErrorToast: Thin red banner at the top of the dashboard.
 *
 * Subscribes to wsService "error" events and auto-dismisses after 4 seconds.
 * Animates slide-down on appear, slide-up on dismiss.
 */
import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, Animated } from "react-native";
import { wsService } from "../services/WebSocketService";
import { colors, spacing, fontSize, fontFamily, borderRadius } from "../theme";

export function ErrorToast() {
  const [message, setMessage] = useState<string | null>(null);
  const translateY = useRef(new Animated.Value(-80)).current;
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsub = wsService.on("error", (errorMsg) => {
      // Clear any pending dismiss
      if (dismissTimer.current) clearTimeout(dismissTimer.current);

      setMessage(errorMsg);

      // Slide down
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }).start();

      // Auto-dismiss after 4s
      dismissTimer.current = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -80,
          duration: 250,
          useNativeDriver: true,
        }).start(() => setMessage(null));
      }, 4000);
    });

    return () => {
      unsub();
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [translateY]);

  if (!message) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Text style={styles.text} numberOfLines={2}>
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: spacing.md,
    right: spacing.md,
    zIndex: 100,
    backgroundColor: colors.error + "E6", // 90% opacity
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  text: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    textAlign: "center",
  },
});
