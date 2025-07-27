import { Stack } from "expo-router";

export default function ChallengesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="challenge/[id]" />
    </Stack>
  );
}
