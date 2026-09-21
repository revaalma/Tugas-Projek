import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../constants/theme";
import { products } from "../../../data/dummyData";

export default function Shop() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Rekomendasi Produk</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.row}>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.rating}>★ {item.rating}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 20 },
  title: { fontSize: 20, fontWeight: "700", color: colors.text, paddingHorizontal: 20 },
  card: { backgroundColor: colors.card, borderRadius: 14, padding: 14, marginBottom: 12 },
  name: { fontWeight: "600", color: colors.text },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  price: { color: colors.primaryDark, fontWeight: "700" },
  rating: { color: colors.textMuted },
});