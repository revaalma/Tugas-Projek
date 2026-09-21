import { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { colors } from "../../../constants/theme";
import { doctors } from "../../../data/dummyData";

export default function DetailKonsultasi() {
  const { id } = useLocalSearchParams();
  const doctor = doctors.find((d) => d.id === id);
  const [messages, setMessages] = useState([]); // { id, text, from: "user" | "doctor" }
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: input, from: "user" }]);
    setInput("");
    // TODO: kirim ke backend / trigger balasan dokter
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{doctor?.name ?? "Dokter"}</Text>
      <Text style={styles.subHeader}>{doctor?.role}</Text>

      <FlatList
        style={{ flex: 1 }}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.from === "user" ? styles.bubbleUser : styles.bubbleDoctor]}>
            <Text style={item.from === "user" ? { color: "#fff" } : { color: colors.text }}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ketik pesan"
          placeholderTextColor={colors.textMuted}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { fontSize: 18, fontWeight: "700", color: colors.text, padding: 16, paddingBottom: 0 },
  subHeader: { color: colors.textMuted, paddingHorizontal: 16 },
  bubble: { maxWidth: "75%", borderRadius: 14, padding: 10, marginBottom: 8 },
  bubbleUser: { backgroundColor: colors.primary, alignSelf: "flex-end" },
  bubbleDoctor: { backgroundColor: colors.card, alignSelf: "flex-start" },
  inputRow: { flexDirection: "row", padding: 12, gap: 8, alignItems: "center" },
  input: { flex: 1, backgroundColor: colors.card, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10 },
  sendBtn: { backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
});
