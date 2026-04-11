import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../assets/theme';

export default function ItemWishlist({ item, onRemove }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.gambar }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.nama}</Text>
        <Text style={styles.category}>{item.kategori}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.deskripsi}
        </Text>
      </View>
      <TouchableOpacity style={styles.starBtn} onPress={() => onRemove(item.id)}>
        <Text style={styles.star}>⭐</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
  },

  info: {
    flex: 1,
  },

  title: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.charcoal,
  },

  category: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 2,
  },

  desc: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 4,
  },

  starBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },

  star: {
    fontSize: 16,
  },
});