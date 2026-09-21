import { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../constants/theme";

const SPLASH_DURATION = 2200; // durasi splash (ms), samain sama lama animasi progress bar

export default function Splash() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current; // 0 -> 1

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: SPLASH_DURATION,
      useNativeDriver: false, // width animation gak bisa pakai native driver
    }).start();

    const timer = setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, SPLASH_DURATION + 200);
    return () => clearTimeout(timer);
  }, []);

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Image
          source={require("../../assets/images/logo_R.png")}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>REVEA</Text>
      </Animated.View>

      <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
        Teman kulitmu sehari-hari
      </Animated.Text>

      <Animated.View style={[styles.loadingLabel, { opacity: fadeAnim }]}>
        <Text style={styles.loadingText}>LOADING...</Text>
      </Animated.View>

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: barWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  logoIcon: {
    width: 140,
    height: 140,
  },
  logoText: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.primaryDark,
    letterSpacing: 6,
    marginTop: 4,
  },
  tagline: {
    color: colors.textMuted,
    marginTop: 8,
    marginBottom: 40,
  },
  loadingLabel: {
    marginBottom: 8,
  },
  loadingText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
  },
  progressTrack: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.card,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
