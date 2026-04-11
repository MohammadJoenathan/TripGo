import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../assets/theme";

export default function ItemWishlist({ item, onRemove }) {
  return (
    <View style={styles.blogWrapper}>
      <View style={styles.blogCard}>
        <Image source={{ uri: item.thumbnail }} style={styles.blogImg} />

        <View style={styles.textContainer}>
          <Text style={styles.blogTitle} numberOfLines={2}>
            {item.judul}
          </Text>

          <Text style={styles.blogMeta}>
            ✍️ {item.penulis} • 🗓️ {item.tanggal}
          </Text>
        </View>

        {/* Tombol hapus wishlist */}
        <TouchableOpacity
          style={styles.starBtn}
          activeOpacity={0.7}
          onPress={() => onRemove(item.id)}
        >
          <Ionicons name="star" size={18} color={COLORS.accent} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blogWrapper: {
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 12,
    overflow: "hidden",
  },

  blogCard: {
    flexDirection: "row",
    padding: 12,
    gap: 12,
    backgroundColor: COLORS.surface,
    alignItems: "center",
  },

  blogImg: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
  },

  textContainer: {
    flex: 1,
  },

  blogTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.charcoal,
  },

  blogMeta: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 6,
  },

  starBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.offWhite,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});