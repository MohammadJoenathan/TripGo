import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../assets/theme";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.replace("MainTabs");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>🔐 Login</Text>
        <Text style={styles.subtitle}>
          Silakan login untuk masuk ke aplikasi TripGo.
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Masukkan email..."
          placeholderTextColor={COLORS.gray}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>

        {/* Password Input + Icon Mata */}
        <View style={styles.passwordBox}>
          <TextInput
            placeholder="Masukkan password..."
            placeholderTextColor={COLORS.gray}
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.loginText}>Masuk</Text>
          )}
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Tidak punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerLink}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.primaryDark,
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.darkGray,
    marginBottom: 25,
    textAlign: "center",
    lineHeight: 18,
  },

  label: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    marginBottom: 6,
    color: COLORS.charcoal,
  },

  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.charcoal,
    marginBottom: 15,
  },

  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 15,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.charcoal,
  },

  loginBtn: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },

  loginText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },

  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },

  registerText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.gray,
  },

  registerLink: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.primary,
  },
});