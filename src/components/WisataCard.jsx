import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../../assets/theme';

const { width } = Dimensions.get('window');
const WisataCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.slide}
      onPress={() => onPress(item)}
      activeOpacity={0.85}>
      <Image source={{ uri: item.gambar }} style={styles.slideImg} />
      <View style={styles.slideInfo}>
        <Text style={styles.slideTitle}>{item.nama}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default WisataCard;

const styles = StyleSheet.create({
  slide: {
    width: width * 0.72,
    height: 200,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.lightGray,
  },

  slideImg: {
    width: '100%',
    height: '100%',
  },

  slideInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  slideTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },
});