import React, { useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../assets/theme";

export default function BlogCard({ item, onPress }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <TouchableOpacity
        style={styles.blogWrapper}
        activeOpacity={0.85}
        onPress={() => onPress(item)}
      >
        <View style={styles.blogCard}>
          <Image source={{ uri: item.image }} style={styles.blogImg} />

          <View style={styles.textContainer}>
            <Text style={styles.blogTitle} numberOfLines={2}>
              {item.title}
            </Text>

            <Text style={styles.blogMeta}>
              ✍️ TripGo Team • 🗓️ {item.date}
            </Text>
          </View>

          <View style={styles.arrowBox}>
            <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
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
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
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

  arrowBox: {
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