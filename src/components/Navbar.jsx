import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTS } from '../../assets/theme';

export default function Navbar() {
  return (
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
          onPress={() => Alert.alert('Notifikasi', 'Tidak ada notifikasi')}
        >
          <Text>🔔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },

  appName: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.white,
  },

  tagline: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.accentLight,
  },

  headerRight: {
    flexDirection: 'row',
    gap: 10,
  },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});