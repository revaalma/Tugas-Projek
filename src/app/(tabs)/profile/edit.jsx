import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../../../constants/theme";
import { useAuth } from "../../../context/AuthContext";

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const router = useRouter();

  const handleSave = () => {
    if (!username.trim()) {
      Alert.alert("Belum diisi", "Username gak boleh kosong.");
      return;
    }
    updateUser({ username: username.trim(), email: email.trim() });
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar} />

      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24, alignItems: "center" },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.primary, marginBottom: 24 },
  label: { alignSelf: "flex-start", color: colors.textMuted, marginBottom: 6 },
  input: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    width: "100%",
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});