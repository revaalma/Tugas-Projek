import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../../constants/theme";

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/logo_R.png")}
        style={styles.logoIcon}
        resizeMode="contain"
      />
      <Text style={styles.logoText}>REVEA</Text>

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => router.push("/(auth)/sign-in")}
      >
        <Text style={styles.buttonPrimaryText}>MASUK</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => router.push("/(auth)/sign-up")}
      >
        <Text style={styles.buttonSecondaryText}>DAFTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logoIcon: {
    width: 110,
    height: 110,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primaryDark,
    letterSpacing: 5,
    marginTop: 4,
    marginBottom: 48,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    width: "80%",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonPrimaryText: {
    color: "#fff",
    fontWeight: "600",
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    width: "80%",
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: colors.primaryDark,
    fontWeight: "600",
  },
});
