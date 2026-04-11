import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../assets/theme";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { BLOG } from "../data/blogs";
import { CATEGORIES } from "../data/categories";

export default function Exploration() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  // Gabungkan semua artikel + tambahkan kategori dari section
  const allArticles = useMemo(() => {
    let articles = [];
    BLOG.forEach((section) => {
      const mapped = section.data.map((item) => ({
        ...item,
        kategori: section.kategori,
      }));
      articles = [...articles, ...mapped];
    });
    return articles;
  }, []);

  // Filter artikel berdasarkan kategori + search
  const filteredArticles = useMemo(() => {
    let data = allArticles;
    // filter kategori
    if (selectedCategory !== "all") {
      data = data.filter((item) => item.kategori === selectedCategory);
    }
    // filter search judul
    if (searchText.trim() !== "") {
      data = data.filter((item) =>
        item.judul.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return data;
  }, [searchText, selectedCategory, allArticles]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Navbar />
      <View style={styles.content}>
        <Text style={styles.title}>🔎 Cari Artikel Wisata</Text>
        <TextInput
          placeholder="Cari berita wisata Ponorogo..."
          placeholderTextColor={COLORS.gray}
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}/>

        {/* Button kategori sejajar 1 baris */}
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.catBtn,
                selectedCategory === cat.id && styles.catBtnActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}>
              <Text
                style={[
                  styles.catText,
                  selectedCategory === cat.id && styles.catTextActive,
                ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subtitle}>📰 Hasil Pencarian</Text>

        {filteredArticles.length === 0 ? (
          <Text style={styles.emptyText}>Tidak ada artikel yang ditemukan.</Text>
        ) : (
          <FlatList
            data={filteredArticles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BlogCard item={item} onPress={() => {}} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }} />
        )}
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

  title: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginHorizontal: 16,
    color: COLORS.charcoal,
    marginBottom: 10,
  },

  searchInput: {
    marginHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.charcoal,
  },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
  },

  catBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
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

  subtitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    marginHorizontal: 16,
    marginVertical: 10,
    color: COLORS.primary,
  },

  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.gray,
    marginHorizontal: 16,
    marginTop: 20,
  },
});