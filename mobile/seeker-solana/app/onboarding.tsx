/**
 * Onboarding: single splash screen introducing Dispatch to new users.
 *
 * On "Get Started" tap, sets device-key signing mode and navigates to tabs.
 */
import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useWallet } from "../src/contexts/WalletProvider";
import {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontFamily,
} from "../src/theme";

const ONBOARDED_KEY = "dispatch_has_onboarded";
const SIGNING_MODE_KEY = "dispatch_signing_mode";

export default function OnboardingScreen() {
  const router = useRouter();
  const wallet = useWallet();

  const handleGetStarted = async () => {
    await AsyncStorage.multiSet([
      [ONBOARDED_KEY, "true"],
      [SIGNING_MODE_KEY, "device-key"],
    ]);
    wallet.switchSigningMode("device-key");
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.centered}>
        {/* Gold circle with brand icon */}
        <View style={styles.heroCircle}>
          <Image
            source={require("../assets/icon.png")}
            style={{ width: 64, height: 64, borderRadius: 12 }}
          />
        </View>

        <Text style={styles.headline}>
          Your phone earns{"\n"}while you sleep
        </Text>

        <Text style={styles.subtitle}>
          Dispatch routes AI jobs to your idle phone.{"\n"}Tap below to start
          earning.
        </Text>

        <Pressable style={styles.ctaButton} onPress={handleGetStarted}>
          <Text style={styles.ctaText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  heroCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  headline: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.md,
    lineHeight: fontSize.xxl * 1.2,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: fontSize.md * 1.6,
    maxWidth: 300,
    marginBottom: spacing.xl,
  },
  ctaButton: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: "100%",
    alignItems: "center",
  },
  ctaText: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.background,
  },
});
