/**
 * Tab layout. Two tabs: Dashboard and Settings.
 * Uses a dark theme tab bar with Ionicons, Space Grotesk labels,
 * and a status dot overlay on the Dashboard icon.
 */
import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useWorker } from "../../src/hooks/useWorker";
import { colors, fontFamily } from "../../src/theme";

const STATUS_DOT_COLORS: Record<string, string> = {
  connected: colors.success,
  disconnected: colors.error,
  connecting: colors.warning,
  reconnecting: colors.warning,
};

export default function TabLayout() {
  const worker = useWorker();
  const dotColor = STATUS_DOT_COLORS[worker.status] ?? colors.error;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          fontFamily: fontFamily.semibold,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, color }) => (
            <View>
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={22}
                color={color}
              />
              {/* Status dot */}
              <View
                style={{
                  position: "absolute",
                  top: -2,
                  right: -4,
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: dotColor,
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarLabel: "Activity",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
