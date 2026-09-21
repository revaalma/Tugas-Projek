import { Stack } from "expo-router";

export default function ForumStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="tambah" options={{ headerShown: true, title: "Tambah Postingan" }} />
      <Stack.Screen name="edit/[id]" options={{ headerShown: true, title: "Edit Postingan" }} />
    </Stack>
  );
}
