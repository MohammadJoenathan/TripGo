import React, { useRef } from "react";
import {
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { COLORS, FONTS } from "../../assets/theme";

const { width } = Dimensions.get("window");

export default function WisataCard({ item, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Interpolation: scale -> opacity overlay
  const overlayOpacity = scaleAnim.interpolate({
    inputRange: [0.95, 1],
    outputRange: [0.7, 0.45],
  });

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(item)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.slide, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={{ uri: item.gambar }} style={styles.slideImg} />

        {/* Overlay menggunakan Interpolation */}
        <Animated.View
          style={[
            styles.slideInfo,
            {
              opacity: overlayOpacity,
            },
          ]}
        >
          <Text style={styles.slideTitle}>{item.nama}</Text>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  slide: {
    width: width * 0.72,
    height: 200,
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: COLORS.lightGray,
  },

  slideImg: {
    width: "100%",
    height: "100%",
  },

  slideInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "black",
  },

  slideTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },
});