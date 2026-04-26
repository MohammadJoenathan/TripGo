import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SectionList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../../assets/theme";

import { BLOG } from "../data/blogs";
import { CATEGORIES } from "../data/categories";
import { WISATA } from "../data/wisatas";

import WisataCard from "./WisataCard";
import BlogCard from "./BlogCard";

export default function ListBlog({ selectedCategory, setSelectedCategory }) {
  const navigation = useNavigation();

  // Memfilter data wisata sesuai kategori aktif
  const wisataFiltered = useMemo(() => {
    if (selectedCategory === "all") return WISATA;
    return WISATA.filter((w) => w.kategori === selectedCategory);
  }, [selectedCategory]);

  // Memfilter data artikel sesuai kategori aktif
  const blogFiltered = useMemo(() => {
    if (selectedCategory === "all") return BLOG;
    return BLOG.filter((b) => b.kategori === selectedCategory);
  }, [selectedCategory]);

  // Klik wisata -> buka detail full screen
  const openWisata = (item) => {
    navigation.navigate("DetailModal", { item, type: "wisata" });
  };

  // Klik artikel -> buka detail full screen
  const openArtikel = (item) => {
    navigation.navigate("DetailModal", { item, type: "artikel" });
  };

  const ListHeader = () => (
    <View>
      <Text style={styles.sectionTitle}>🏆 Destinasi Unggulan</Text>

      <FlatList
        data={wisataFiltered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WisataCard item={item} onPress={openWisata} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      <Text style={styles.sectionTitle}>📌 Kategori</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catRow}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.catBtn,
              selectedCategory === cat.id && styles.catBtnActive,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text
              style={[
                styles.catText,
                selectedCategory === cat.id && styles.catTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>📰 Artikel Wisata</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <SectionList
        sections={blogFiltered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BlogCard item={item} onPress={openArtikel} />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 10,
    paddingHorizontal: 16,
    color: COLORS.charcoal,
  },

  catRow: {
    paddingHorizontal: 16,
    gap: 10,
    paddingBottom: 8,
  },

  catBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
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

  sectionHeader: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.offWhite,
    marginTop: 10,
  },
});