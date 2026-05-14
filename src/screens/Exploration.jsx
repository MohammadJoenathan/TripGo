import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { FlashList } from "@shopify/flash-list";

import { COLORS, FONTS } from "../../assets/theme";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

import { CATEGORIES } from "../data/categories";
import formatDate from "../utils/formatDate";

const API_URL = "https://6a056abcaa826ca75c09c909.mockapi.io/artikel";

export default function Exploration() {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [artikel, setArtikel] = useState([]);

  const fetchArtikel = async () => {
    try {
      const res = await axios.get(API_URL);

      const mapped = res.data.map((item) => ({
        ...item,
        date: formatDate(item.createdAt),
      }));

      setArtikel(mapped);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Gagal mengambil artikel!");
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchArtikel();
    });

    return unsubscribe;
  }, [navigation]);

  const filteredArticles = useMemo(() => {
    let data = artikel;

    if (selectedCategory !== "all") {
      data = data.filter((item) => item.category === selectedCategory);
    }

    if (searchText.trim() !== "") {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return data;
  }, [searchText, selectedCategory, artikel]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Navbar />

      <View style={styles.content}>
        <Text style={styles.title}>🔎 Cari Artikel Wisata</Text>

        <TextInput
          placeholder="Cari artikel wisata Ponorogo..."
          placeholderTextColor={COLORS.gray}
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />

        <View style={styles.categoryRow}>
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
        </View>

        <Text style={styles.subtitle}>📰 Hasil Pencarian</Text>

        {filteredArticles.length === 0 ? (
          <Text style={styles.emptyText}>Tidak ada artikel yang ditemukan.</Text>
        ) : (
          <FlashList
            data={filteredArticles}
            estimatedItemSize={120}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BlogCard
                item={item}
                onPress={() =>
                  navigation.navigate("DetailModal", {
                    item,
                    type: "artikel",
                  })
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
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