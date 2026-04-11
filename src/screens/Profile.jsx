import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../assets/theme";
import Navbar from "../components/Navbar";

export default function Profile() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Navbar />
      <View style={styles.content}>
        <Text style={styles.pageTitle}>👤 Profil Akun</Text>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>N</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Natan</Text>
            <Text style={styles.email}>natan@gmail.com</Text>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => Alert.alert("Edit Profil", "Fitur edit profil")}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>⚙️ Settings</Text>
        <View style={styles.settingBox}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              Alert.alert("Change Password", "Fitur ubah password")
            }>
            <Text style={styles.settingText}>🔒 Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => Alert.alert("Notification", "Pengaturan notifikasi")}>
            <Text style={styles.settingText}>🔔 Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => Alert.alert("Theme", "Pengaturan tema aplikasi")}>
            <Text style={styles.settingText}>🎨 Theme</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>ℹ️ About</Text>
        <View style={styles.settingBox}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              Alert.alert("Privacy Policy", "Halaman kebijakan privasi")
            }>
            <Text style={styles.settingText}>📄 Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              Alert.alert("Support Center", "Hubungi support TripGo")
            }>
            <Text style={styles.settingText}>💬 Support Center</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => Alert.alert("Logout", "Anda berhasil logout")}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },

  content: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 14,
  },

  pageTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    color: COLORS.charcoal,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.white,
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.charcoal,
  },

  email: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },

  editBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
  },

  editText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.white,
  },

  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
    color: COLORS.primary,
  },

  settingBox: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  settingItem: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },

  settingText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.charcoal,
  },

  logoutBtn: {
    marginTop: 30,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },

  logoutText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },
});