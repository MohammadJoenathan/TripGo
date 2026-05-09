import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../assets/theme";

export default function AddArtikel({ navigation }) {
  const [namaWisata, setNamaWisata] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState("");
  const [kategori, setKategori] = useState("Alam");

  const handleUpload = () => {
    Alert.alert(
      "Unggah Artikel",
      `Artikel berhasil diunggah!\n\nNama: ${namaWisata}\nKategori: ${kategori}`
    );

    setNamaWisata("");
    setDeskripsi("");
    setGambar("");
    setKategori("Alam");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>📝 Tulis Artikel Wisata</Text>

        <Text style={styles.label}>Nama Wisata</Text>
        <TextInput
          placeholder="Masukkan nama wisata..."
          placeholderTextColor={COLORS.gray}
          style={styles.input}
          value={namaWisata}
          onChangeText={setNamaWisata}
        />

        <Text style={styles.label}>Deskripsi</Text>
        <TextInput
          placeholder="Masukkan deskripsi wisata..."
          placeholderTextColor={COLORS.gray}
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          multiline
          value={deskripsi}
          onChangeText={setDeskripsi}
        />

        <Text style={styles.label}>Link Gambar (URL)</Text>
        <TextInput
          placeholder="Masukkan link gambar..."
          placeholderTextColor={COLORS.gray}
          style={styles.input}
          value={gambar}
          onChangeText={setGambar}
        />

        <Text style={styles.label}>Kategori</Text>

        <View style={styles.categoryRow}>
          {["Alam", "Budaya", "Kuliner"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.catBtn,
                kategori === item && styles.catBtnActive,
              ]}
              onPress={() => setKategori(item)}
            >
              <Text
                style={[
                  styles.catText,
                  kategori === item && styles.catTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={handleUpload}
          activeOpacity={0.8}
        >
          <Text style={styles.uploadText}>Unggah</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>⬅ Kembali</Text>
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

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.primaryDark,
    marginBottom: 20,
    textAlign: "center",
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

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  catBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
  },

  catBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  catText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.charcoal,
  },

  catTextActive: {
    color: COLORS.white,
  },

  uploadBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    marginTop: 10,
  },

  uploadText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },

  backBtn: {
    marginTop: 15,
    alignItems: "center",
  },

  backText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.primary,
  },
});