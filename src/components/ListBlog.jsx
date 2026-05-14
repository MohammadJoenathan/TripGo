import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import axios from "axios";
import { FlashList } from "@shopify/flash-list";

import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../../assets/theme";

import { CATEGORIES } from "../data/categories";
import BlogCard from "./BlogCard";

import formatDate from "../utils/formatDate";

const API_URL = "https://6a056abcaa826ca75c09c909.mockapi.io/artikel";

export default function ListBlog({ selectedCategory, setSelectedCategory }) {
  const navigation = useNavigation();

  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET artikel dari API
  const fetchArtikel = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);

      const mapped = res.data.map((item) => ({
        ...item,
        date: formatDate(item.createdAt),
      }));

      setArtikel(mapped);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Gagal mengambil data artikel dari API!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  // refresh otomatis setelah tambah/edit/hapus artikel
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchArtikel();
    });

    return unsubscribe;
  }, [navigation]);

  // Destinasi Unggulan = 5 artikel terbaru
  const unggulan = useMemo(() => {
    const sorted = [...artikel].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return sorted.slice(0, 5);
  }, [artikel]);

  // Filter artikel berdasarkan kategori
  const artikelFiltered = useMemo(() => {
    if (selectedCategory === "all") return artikel;
    return artikel.filter((a) => a.category === selectedCategory);
  }, [selectedCategory, artikel]);

  // Klik artikel -> buka detail
  const openArtikel = (item) => {
    navigation.navigate("DetailModal", { item, type: "artikel" });
  };

  const ListHeader = () => (
    <View>
      <Text style={styles.sectionTitle}>🏆 Destinasi Unggulan</Text>

      {unggulan.length === 0 ? (
        <Text style={styles.emptyText}>
          Belum ada artikel unggulan (tambahkan artikel dulu).
        </Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
            {unggulan.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={styles.unggulanCard}
                onPress={() => openArtikel(item)}
              >
                <Image source={{ uri: item.image }} style={styles.unggulanImage} />

                <View style={styles.unggulanOverlay}>
                  <Text style={styles.unggulanTitle} numberOfLines={2}>
                    {item.title}
                  </Text>

                  <Text style={styles.unggulanMeta}>
                    {item.category} • {formatDate(item.createdAt)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

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

      {loading && (
        <Text style={styles.loadingText}>Mengambil artikel dari API...</Text>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <FlashList
        data={artikelFiltered}
        estimatedItemSize={120}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => (
          <BlogCard item={item} onPress={openArtikel} />
        )}
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

  loadingText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.gray,
    marginHorizontal: 16,
    marginBottom: 10,
  },

  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.gray,
    marginHorizontal: 16,
    marginBottom: 10,
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

  unggulanCard: {
    width: 260,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: COLORS.lightGray,
  },

  unggulanImage: {
    width: "100%",
    height: "100%",
  },

  unggulanOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  unggulanTitle: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.white,
  },

  unggulanMeta: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.offWhite,
    marginTop: 4,
  },
});