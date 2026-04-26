import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../assets/theme";

export default function DetailModal({ route, navigation }) {
  const { item, type } = route.params;

  // Menentukan sumber gambar dan teks berdasarkan tipe data
  const imageUri = type === "wisata" ? item.gambar : item.thumbnail;
  const title = type === "wisata" ? item.nama : item.judul;
  const description = type === "wisata" ? item.deskripsi : item.konten;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detail</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: imageUri }} style={styles.image} />

        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.primaryDark,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.white,
  },

  content: {
    flex: 1,
  },

  image: {
    width: "100%",
    height: 240,
  },

  body: {
    padding: 16,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.charcoal,
    marginBottom: 12,
  },

  text: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
});