import 'react-native-gesture-handler';

import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { fontType } from "./assets/theme";
import Router from "./src/navigation/Router";

export default function App() {
  const [loaded] = useFonts(fontType);

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <Router />
    </SafeAreaProvider>
  );
}