import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../assets/theme";
import Navbar from "../components/Navbar";
import ItemWishlist from "../components/ItemWishlist";
import { WISATA } from "../data/wisatas";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([WISATA[0], WISATA[2]]);
  const removeWishlist = (id) => {
    const filtered = wishlist.filter((item) => item.id !== id);
    setWishlist(filtered);
  };
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Navbar />
      <View style={styles.content}>
        <Text style={styles.title}>⭐ Wishlist Destinasi</Text>
        {wishlist.length === 0 ? (
          <Text style={styles.emptyText}>
            Belum ada destinasi yang disimpan.
          </Text>
        ) : (
          <FlatList
            data={wishlist}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ItemWishlist item={item} onRemove={removeWishlist} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}/>
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
    marginBottom: 10,
    color: COLORS.charcoal,
  },

  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.gray,
    marginHorizontal: 16,
    marginTop: 20,
  },
});