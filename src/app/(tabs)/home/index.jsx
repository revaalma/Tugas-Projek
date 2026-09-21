import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/theme";
import { useAuth } from "../../../context/AuthContext";
import { beautyTips } from "../../../data/dummyData";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={[styles.headerRow, { paddingHorizontal: 20 }]}>
          <Text style={styles.greeting}>Hi, {user?.username ?? "Reva"}!</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
            <Ionicons name="person-circle-outline" size={32} color={colors.primaryDark} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.section, { paddingHorizontal: 20 }]}>Tips Kecantikan</Text>

        {/* Card tips bisa di-scroll ke samping */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tipsRow}
        >
          {beautyTips.map((tip) => (
            <TouchableOpacity key={tip.id} style={styles.tipCard}>
              <View style={styles.tipIllustration}>
                <Ionicons name="sparkles-outline" size={28} color={colors.primaryDark} />
              </View>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipLink}>Baca selengkapnya</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => router.push("/(tabs)/kelas-webinar")}
        >
          <Text style={styles.link}>Lihat Kelas & Webinar →</Text>
        </TouchableOpacity>

        <Text style={[styles.section, { paddingHorizontal: 20 }]}>Artikel</Text>
        {/* TODO: render list artikel dari data/dummyData.js atau API */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: { fontSize: 20, fontWeight: "700", color: colors.text },
  section: { fontSize: 16, fontWeight: "600", color: colors.text, marginTop: 20, marginBottom: 10 },
  tipsRow: { paddingHorizontal: 20, gap: 12 },
  tipCard: {
    width: 140,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
  },
  tipIllustration: {
    width: "100%",
    height: 70,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  tipTitle: { color: colors.text, fontWeight: "600", fontSize: 13, marginBottom: 6 },
  tipLink: { color: colors.primaryDark, fontSize: 11, fontWeight: "600" },
  link: { color: colors.primaryDark, marginTop: 16, fontWeight: "600" },
});