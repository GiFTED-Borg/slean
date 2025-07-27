import { Stack } from "expo-router";

export default function CoursesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="course/[id]" />
      <Stack.Screen name="lessons/[id]" />
    </Stack>
  );
}
