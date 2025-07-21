import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

import { dynamicClient } from "@/clients/dynamic";

import { useColorScheme } from "@/hooks/useColorScheme";

import { useDynamic } from "@/clients/dynamic/hooks";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  console.log("loaded", dynamicClient.reactNative);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <dynamicClient.reactNative.WebView />

      <RootNavigator />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { auth } = useDynamic();

  return (
    <Stack>
      <Stack.Protected guard={!!auth.token}>
        <Stack.Screen name="(app)/(tabs)" options={{ headerShown: true }} />
      </Stack.Protected>
      <Stack.Protected guard={!auth.token}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="verify-otp" />
        <Stack.Screen name="+not-found" />
      </Stack.Protected>
    </Stack>
  );
}
