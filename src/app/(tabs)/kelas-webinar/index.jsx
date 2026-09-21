import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../constants/theme";
import { classes, webinars } from "../../../data/dummyData";

export default function KelasWebinar() {
  const [tab, setTab] = useState("kelas"); // "kelas" | "webinar"
  const data = tab === "kelas" ? classes : webinars;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, tab === "kelas" && styles.toggleBtnActive]}
          onPress={() => setTab("kelas")}
        >
          <Text style={tab === "kelas" ? styles.toggleTextActive : styles.toggleText}>Kelas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, tab === "webinar" && styles.toggleBtnActive]}
          onPress={() => setTab("webinar")}
        >
          <Text style={tab === "webinar" ? styles.toggleTextActive : styles.toggleText}>Webinar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSub}>{item.mentor ?? item.date}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  toggleRow: { flexDirection: "row", padding: 16, gap: 10 },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  toggleBtnActive: { backgroundColor: colors.primary },
  toggleText: { color: colors.textMuted, fontWeight: "600" },
  toggleTextActive: { color: "#fff", fontWeight: "600" },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: { fontWeight: "600", color: colors.text },
  cardSub: { color: colors.textMuted, marginTop: 4, fontSize: 12 },
});