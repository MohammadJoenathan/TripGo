import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { COLORS, FONTS } from "../../assets/theme";

const API_URL = "https://6a056abcaa826ca75c09c909.mockapi.io/artikel";

export default function EditArtikel({ route, navigation }) {
  const { item } = route.params;

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(item.image);
  const [category, setCategory] = useState(item.category);

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!title || !description || !image) {
      Alert.alert("Validasi", "Semua input wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      await axios.put(`${API_URL}/${item.id}`, {
        title,
        description,
        image,
        category,
      });

      Alert.alert("Sukses", "Artikel berhasil diperbarui!");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Gagal update artikel!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>✏️ Edit Artikel</Text>

        <Text style={styles.label}>Judul</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Deskripsi</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Link Gambar</Text>
        <TextInput style={styles.input} value={image} onChangeText={setImage} />

        <Text style={styles.label}>Kategori</Text>
        <View style={styles.categoryRow}>
          {["Alam", "Budaya", "Kuliner"].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.catBtn,
                category === cat && styles.catBtnActive,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.catText,
                  category === cat && styles.catTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.saveText}>Simpan Perubahan</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
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

  saveBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },

  saveText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },

  backText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.primary,
    textAlign: "center",
  },
});