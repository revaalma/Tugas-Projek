import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "../../../../constants/theme";
import { useData } from "../../../../context/DataContext";

export default function EditForum() {
  const { id } = useLocalSearchParams();
  const { forumPosts, updateForumPost, deleteForumPost } = useData();
  const post = forumPosts.find((p) => p.id === id);

  const [text, setText] = useState(post?.text ?? "");
  const [tag, setTag] = useState(post?.tag ?? "");
  const router = useRouter();

  const handleSave = () => {
    if (!text.trim()) {
      Alert.alert("Belum diisi", "Isi dulu postingannya ya.");
      return;
    }
    updateForumPost(id, text, tag);
    router.back();
  };

  const handleDelete = () => {
    Alert.alert("Hapus postingan?", "Postingan yang dihapus gak bisa dikembalikan.", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          deleteForumPost(id);
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textArea}
        placeholder="Tips biar cepet tinggi gimana ya?"
        placeholderTextColor={colors.textMuted}
        value={text}
        onChangeText={setText}
        multiline
      />
      <Text style={styles.label}>Tambahkan Tag (opsional)</Text>
      <TextInput
        style={styles.input}
        placeholder="#Kesehatan"
        placeholderTextColor={colors.textMuted}
        value={tag}
        onChangeText={setTag}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Selesai</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Hapus Postingan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  textArea: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    height: 120,
    textAlignVertical: "top",
    color: colors.text,
  },
  label: { color: colors.textMuted, marginTop: 16, marginBottom: 8 },
  input: { backgroundColor: colors.card, borderRadius: 14, padding: 14, color: colors.text },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  deleteButton: {
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 12,
  },
  deleteButtonText: { color: colors.primaryDark, fontWeight: "600" },
});