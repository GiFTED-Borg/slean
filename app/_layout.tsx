import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import "react-native-reanimated";
import "./global.css";

import { dynamicClient } from "@/clients/dynamic";

import { SessionProvider, useSession } from "@/contexts/SessionContext";
import { CustomTheme } from "@/constants/theme";
import SplashScreenAnimated from "@/components/splash-screen";
import TanstackProvider from "@/clients/tanstack";

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  const [loaded] = useFonts({
    "GeistMono-Light": require("../assets/fonts/GeistMono-Light.ttf"),
    "GeistMono-Regular": require("../assets/fonts/GeistMono-Regular.ttf"),
    "GeistMono-Medium": require("../assets/fonts/GeistMono-Medium.ttf"),
    "GeistMono-SemiBold": require("../assets/fonts/GeistMono-SemiBold.ttf"),
    "Orbitron-Medium": require("../assets/fonts/Orbitron-Medium.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      // Do any loading or prep work here
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulate loading
      setAppReady(true);
    };

    prepare();
  }, []);

  const onSplashFinish = async () => {
    setSplashDone(true);
  };

  if (!appReady) return null;

  if (!splashDone) {
    return <SplashScreenAnimated onFinish={onSplashFinish} />;
  }

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <TanstackProvider>
      <SessionProvider>
        <ThemeProvider value={CustomTheme}>
          <dynamicClient.reactNative.WebView />

          <RootNavigator />
          <StatusBar style="light" />
        </ThemeProvider>
      </SessionProvider>
    </TanstackProvider>
  );
}

function RootNavigator() {
  const { isAuthenticated, isLoading } = useSession();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/verify-otp" />
        <Stack.Screen name="+not-found" />
      </Stack.Protected>
    </Stack>
  );
}
