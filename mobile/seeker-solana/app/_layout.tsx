/**
 * Root layout. Wraps the entire app with providers and dark theme.
 *
 * Responsibilities:
 * 1. Loads Space Grotesk font family (matching dispatch.computer)
 * 2. Holds splash screen visible until fonts are ready
 * 3. Wraps everything in WalletProvider for global state
 * 4. Routes to onboarding or tabs based on AsyncStorage flag
 */
import "../src/polyfills";
import React, { useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WalletProvider } from "../src/contexts/WalletProvider";
import { colors } from "../src/theme";

SplashScreen.preventAutoHideAsync();

const ONBOARDED_KEY = "dispatch_has_onboarded";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDED_KEY).then((value) => {
      setHasOnboarded(value === "true");
    });
  }, []);

  const onLayoutReady = useCallback(async () => {
    if (fontsLoaded && hasOnboarded !== null) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, hasOnboarded]);

  useEffect(() => {
    onLayoutReady();
  }, [onLayoutReady]);

  if (!fontsLoaded || hasOnboarded === null) {
    return null;
  }

  return (
    <WalletProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "fade",
        }}
      >
        {!hasOnboarded && (
          <Stack.Screen
            name="onboarding"
            options={{ gestureEnabled: false }}
          />
        )}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </WalletProvider>
  );
}
