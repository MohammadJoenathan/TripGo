import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../assets/theme';

const BlogCard = ({ item, onPress }) => {
  return (
    <TouchableHighlight
      style={styles.blogWrapper}
      underlayColor={COLORS.border}
      onPress={() => onPress(item)}
    >
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
      </View>
    </TouchableHighlight>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  blogWrapper: {
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },

  blogCard: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    backgroundColor: COLORS.surface,
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
});