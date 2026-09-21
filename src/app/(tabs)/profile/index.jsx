import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors } from "../../../constants/theme";
import { useAuth } from "../../../context/AuthContext";

export default function Profile() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/welcome");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.avatar} />
      <Text style={styles.name}>{user?.username ?? "Reva Alma"}</Text>
      <Text style={styles.email}>{user?.email ?? ""}</Text>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/(tabs)/profile/edit")}>
        <Text style={styles.menuText}>Edit Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
        <Text style={[styles.menuText, { color: colors.primaryDark }]}>Keluar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: "center", paddingTop: 40 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: "700", color: colors.text },
  email: { color: colors.textMuted, marginBottom: 24 },
  menuItem: {
    width: "85%",
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  menuText: { color: colors.text, fontWeight: "600" },
});