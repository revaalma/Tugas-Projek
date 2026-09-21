import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors } from "../../../constants/theme";
import { doctors } from "../../../data/dummyData";

export default function Konsultasi() {
  const [tab, setTab] = useState("tersedia"); // "tersedia" | "riwayat"
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Konsultasi</Text>

      <View style={styles.toggleRow}>
        <TouchableOpacity onPress={() => setTab("tersedia")}>
          <Text style={tab === "tersedia" ? styles.toggleActive : styles.toggle}>Tersedia</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("riwayat")}>
          <Text style={tab === "riwayat" ? styles.toggleActive : styles.toggle}>Riwayat</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/(tabs)/konsultasi/${item.id}`)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.role}>{item.role}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 20 },
  title: { fontSize: 20, fontWeight: "700", color: colors.text, paddingHorizontal: 20 },
  toggleRow: { flexDirection: "row", gap: 20, paddingHorizontal: 20, marginVertical: 14 },
  toggle: { color: colors.textMuted, fontWeight: "600" },
  toggleActive: { color: colors.primaryDark, fontWeight: "700" },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  name: { fontWeight: "600", color: colors.text },
  role: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
});