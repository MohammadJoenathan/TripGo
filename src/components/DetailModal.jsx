import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { COLORS, FONTS } from "../../assets/theme";

const API_URL = "https://xxxx.mockapi.io/artikel"; // GANTI LINK MOCKAPI

export default function DetailModal({ route, navigation }) {
  const { item, type } = route.params;

  const imageUri = type === "wisata" ? item.gambar : item.image;
  const title = type === "wisata" ? item.nama : item.title;
  const description = type === "wisata" ? item.deskripsi : item.description;

  const scrollY = useRef(new Animated.Value(0)).current;
  const clampedScroll = Animated.diffClamp(scrollY, 0, 70);

  const headerTranslateY = clampedScroll.interpolate({
    inputRange: [0, 70],
    outputRange: [0, -70],
  });

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${item.id}`);
      Alert.alert("Sukses", "Artikel berhasil dihapus!");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Gagal menghapus artikel!");
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Hapus Artikel",
      `Yakin ingin menghapus "${item.title}"?`,
      [
        { text: "Batal", style: "cancel" },
        { text: "Hapus", style: "destructive", onPress: handleDelete },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Navbar */}
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detail</Text>
      </Animated.View>

      {/* Content */}
      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Image source={{ uri: imageUri }} style={styles.image} />

        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{description}</Text>

          {/* Tombol hanya muncul kalau type artikel */}
          {type === "artikel" && (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => navigation.navigate("EditArtikel", { item })}
              >
                <Text style={styles.actionText}>✏️ Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={confirmDelete}
              >
                <Text style={styles.actionText}>🗑️ Hapus</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },

  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    backgroundColor: COLORS.primaryDark,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.white,
  },

  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  image: {
    width: "100%",
    height: 240,
  },

  body: {
    padding: 16,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.charcoal,
    marginBottom: 12,
  },

  text: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.darkGray,
    lineHeight: 20,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },

  editBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },

  deleteBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },

  actionText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.white,
  },
});