import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../assets/theme";
import Navbar from "../components/Navbar";
import ListBlog from "../components/ListBlog";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Navbar />

      <ListBlog
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
});