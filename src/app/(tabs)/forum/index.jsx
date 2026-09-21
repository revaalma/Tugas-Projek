import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/theme";
import { useData } from "../../../context/DataContext";

export default function Forum() {
  const router = useRouter();
  const { forumPosts, deleteForumPost } = useData();

  const handleDelete = (id) => {
    Alert.alert("Hapus postingan?", "Postingan yang dihapus gak bisa dikembalikan.", [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", style: "destructive", onPress: () => deleteForumPost(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Forum</Text>

      <TextInput
        style={styles.search}
        placeholder="Cari Topik"
        placeholderTextColor={colors.textMuted}
      />

      <FlatList
        data={forumPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => router.push(`/(tabs)/forum/edit/${item.id}`)}
            >
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.text}>{item.text}</Text>
              <Text style={styles.tag}>{item.tag}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={18} color={colors.primaryDark} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => router.push("/(tabs)/forum/tambah")}>
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: 20, fontWeight: "700", color: colors.text, paddingHorizontal: 20 },
  search: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 14,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  author: { fontWeight: "700", color: colors.text },
  text: { color: colors.text, marginTop: 4 },
  tag: { color: colors.primaryDark, marginTop: 6, fontSize: 12, fontWeight: "600" },
  deleteBtn: { padding: 4, marginLeft: 8 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
});