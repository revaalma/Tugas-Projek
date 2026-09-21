import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../../../constants/theme";
import { useData } from "../../../context/DataContext";

export default function TambahForum() {
  const [text, setText] = useState("");
  const [tag, setTag] = useState("");
  const router = useRouter();
  const { addForumPost } = useData();

  const handlePost = () => {
    if (!text.trim()) {
      Alert.alert("Belum diisi", "Tulis dulu pertanyaan atau ceritanya ya.");
      return;
    }
    addForumPost(text, tag);
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textArea}
        placeholder="Apa yang ingin kamu tanyakan atau bagikan?"
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

      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Posting</Text>
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
});