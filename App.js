import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';

import * as SplashScreen from 'expo-splash-screen';
import { COLORS } from './assets/theme/index';
import ListBlog from './src/components/ListBlog';

SplashScreen.preventAutoHideAsync();

// AppHeader = komponen navbar atas aplikasi
const AppHeader = () => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <TouchableOpacity
        style={styles.profileCircle}
        onPress={() => Alert.alert('Akun', 'Ini halaman profil akun')}
        activeOpacity={0.8}
      >
        <Text style={styles.profileText}>N</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.appName}>TripGo</Text>
        <Text style={styles.tagline}>Ponorogo Explorer</Text>
      </View>
    </View>

    <View style={styles.headerRight}>
      <TouchableOpacity
        style={styles.iconBtn}
        onPress={() => Alert.alert('Cari', 'Fitur pencarian')}
      >
        <Text>🔍</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconBtn}
        onPress={() => Alert.alert('Notifikasi', 'Tidak ada notifikasi')}
      >
        <Text>🔔</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// App = komponen utama aplikasi TripGo
export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-ExtraBold': Poppins_800ExtraBold,
  });

  // onLayout = menyembunyikan splash screen setelah font selesai dimuat
  const onLayout = useCallback(async () => {
    if (fontsLoaded || fontError) await SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top']} onLayout={onLayout}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

        <AppHeader />

        <ListBlog
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Berisi semua styling yang digunakan pada App.js
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.primaryDark },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: COLORS.primaryDark,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  profileCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: COLORS.white,
  },

  appName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.white,
  },

  tagline: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: COLORS.accentLight,
  },

  headerRight: { flexDirection: 'row', gap: 10 },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});