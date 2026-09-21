import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";

const icons = {
  home: "home-outline",
  konsultasi: "chatbubble-ellipses-outline",
  forum: "people-outline",
  shop: "cart-outline",
  "kelas-webinar": "school-outline",
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.card },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={icons[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="konsultasi" options={{ title: "Konsultasi" }} />
      <Tabs.Screen name="forum" options={{ title: "Forum" }} />
      <Tabs.Screen name="shop" options={{ title: "Shop" }} />
      <Tabs.Screen name="kelas-webinar" options={{ title: "Kelas & Webinar" }} />
      {/* Profil sengaja disembunyikan dari bottom tab, diakses lewat ikon di pojok kanan atas */}
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}
