import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import "./global.css";

import { dynamicClient } from "@/clients/dynamic";
import { useDynamic } from "@/clients/dynamic/hooks";
import { CustomTheme } from "@/constants/theme";

export default function RootLayout() {
  const [loaded] = useFonts({
    "GeistMono-Regular": require("../assets/fonts/GeistMono-Regular.ttf"),
    "GeistMono-Medium": require("../assets/fonts/GeistMono-Medium.ttf"),
    "GeistMono-SemiBold": require("../assets/fonts/GeistMono-SemiBold.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  console.log("loaded", dynamicClient.reactNative);

  return (
    <ThemeProvider value={CustomTheme}>
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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!auth.token}>
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/verify-otp" />
        <Stack.Screen name="+not-found" />
      </Stack.Protected>
    </Stack>
  );
}
