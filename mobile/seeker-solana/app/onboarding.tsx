/**
 * Onboarding: 3-step horizontal pager introducing Dispatch to new users.
 *
 * Steps:
 * 1. "Earn from your phone" - hero headline + gold circle visual
 * 2. "How it works" - 3-step vertical flow (Connect, Compute, Earn)
 * 3. "Get started" - choose Device Key or Wallet, then start
 *
 * On completion, sets `dispatch_has_onboarded` in AsyncStorage and
 * navigates to the main tabs.
 */
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useWallet, type SigningMode } from "../src/contexts/WalletProvider";
import {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontFamily,
} from "../src/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ONBOARDED_KEY = "dispatch_has_onboarded";
const SIGNING_MODE_KEY = "dispatch_signing_mode";
const TOTAL_STEPS = 3;

// ---------------------------------------------------------------------------
// Step 1: Hero
// ---------------------------------------------------------------------------
function StepEarn() {
  return (
    <View style={[styles.page, styles.centered]}>
      {/* Gold circle with brand icon */}
      <View style={styles.heroCircle}>
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 64, height: 64, borderRadius: 12 }}
        />
      </View>

      <Text style={styles.headline}>Your phone{"\n"}can earn BOLT</Text>

      <Text style={styles.subtitle}>
        Dispatch routes AI jobs to your idle phone. You earn crypto for every
        task completed.
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Step 2: How it works
// ---------------------------------------------------------------------------
const HOW_STEPS = [
  {
    num: "1",
    title: "Connect",
    desc: "Link your device to the Dispatch network",
  },
  {
    num: "2",
    title: "Compute",
    desc: "Your phone runs lightweight AI tasks in the background",
  },
  {
    num: "3",
    title: "Earn",
    desc: "Earn BOLT for every completed job",
  },
] as const;

function StepHow() {
  return (
    <View style={[styles.page, styles.centeredHow]}>
      <Text style={styles.headline}>How it works</Text>

      <View style={styles.howList}>
        {HOW_STEPS.map((step, idx) => (
          <View key={step.num} style={styles.howRow}>
            {/* Gold numbered circle */}
            <View style={styles.howCircle}>
              <Text style={styles.howCircleNum}>{step.num}</Text>
            </View>

            {/* Connector line between circles */}
            {idx < HOW_STEPS.length - 1 && <View style={styles.howLine} />}

            <View style={styles.howText}>
              <Text style={styles.howTitle}>{step.title}</Text>
              <Text style={styles.howDesc}>{step.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Step 3: Get started (signing mode choice)
// ---------------------------------------------------------------------------
function StepStart({ onComplete }: { onComplete: (mode: SigningMode) => void }) {
  const [selected, setSelected] = useState<SigningMode | null>(null);

  return (
    <View style={[styles.page, styles.centeredStart]}>
      <Text style={styles.headline}>Get started</Text>

      <View style={styles.cardRow}>
        {/* Device Key card */}
        <Pressable
          style={[
            styles.card,
            selected === "device-key" && styles.cardSelected,
          ]}
          onPress={() => setSelected("device-key")}
        >
          <View style={styles.cardIconWrap}>
            <Ionicons name="key-outline" size={22} color={colors.accent} />
          </View>
          <Text style={styles.cardTitle}>Device Key</Text>
          <Text style={styles.cardDesc}>
            Simple, works everywhere. A local keypair signs your work receipts.
          </Text>
        </Pressable>

        {/* Wallet card */}
        <Pressable
          style={[
            styles.card,
            selected === "wallet" && styles.cardSelected,
          ]}
          onPress={() => setSelected("wallet")}
        >
          <View style={styles.cardIconWrap}>
            <Ionicons name="wallet-outline" size={22} color={colors.accent} />
          </View>
          <Text style={styles.cardTitle}>Wallet</Text>
          <Text style={styles.cardDesc}>
            Use Phantom wallet. Android only via Mobile Wallet Adapter.
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.ctaButton, !selected && styles.ctaDisabled]}
        disabled={!selected}
        onPress={() => selected && onComplete(selected)}
      >
        <Text style={styles.ctaText}>Start Earning BOLT</Text>
      </Pressable>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Dot Indicators
// ---------------------------------------------------------------------------
function Dots({ active }: { active: number }) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, i === active && styles.dotActive]}
        />
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Main Onboarding Screen
// ---------------------------------------------------------------------------
export default function OnboardingScreen() {
  const router = useRouter();
  const wallet = useWallet();
  const scrollRef = useRef<ScrollView>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveStep(page);
  };

  const handleComplete = async (mode: SigningMode) => {
    await AsyncStorage.multiSet([
      [ONBOARDED_KEY, "true"],
      [SIGNING_MODE_KEY, mode],
    ]);
    wallet.switchSigningMode(mode);
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        bounces={false}
      >
        <StepEarn />
        <StepHow />
        <StepStart onComplete={handleComplete} />
      </ScrollView>

      <Dots active={activeStep} />
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // -- Pages ----------------------------------------------------------------
  page: {
    width: SCREEN_WIDTH,
    paddingHorizontal: spacing.xl,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredHow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 60,
  },
  centeredStart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // -- Step 1: Hero ---------------------------------------------------------
  heroCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
    // subtle glow
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  heroCircleIcon: {
    fontSize: 48,
    color: colors.background,
    fontFamily: fontFamily.bold,
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
  },

  // -- Step 2: How it works -------------------------------------------------
  howList: {
    marginTop: spacing.xl,
    gap: spacing.lg,
    width: "100%",
  },
  howRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    position: "relative",
  },
  howCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
    zIndex: 1,
  },
  howCircleNum: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.background,
  },
  howLine: {
    position: "absolute",
    left: 19,
    top: 40,
    width: 2,
    height: spacing.lg,
    backgroundColor: colors.border,
  },
  howText: {
    flex: 1,
    paddingTop: 2,
  },
  howTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.lg,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  howDesc: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: fontSize.sm * 1.5,
  },

  // -- Step 3: Get started --------------------------------------------------
  cardRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    width: "100%",
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
  },
  cardSelected: {
    borderColor: colors.accent,
  },
  cardIconWrap: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  cardIcon: {
    fontSize: 22,
  },
  cardTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.md,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardDesc: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: fontSize.xs * 1.5,
  },

  // -- CTA ------------------------------------------------------------------
  ctaButton: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: "100%",
    alignItems: "center",
  },
  ctaDisabled: {
    opacity: 0.4,
  },
  ctaText: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.lg,
    color: colors.background,
  },

  // -- Dots -----------------------------------------------------------------
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.accent,
    width: 24,
  },
});
