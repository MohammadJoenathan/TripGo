// Konfigurasi tipografi – font Poppins dari Google Fonts
// Install: npx expo install expo-font @expo-google-fonts/poppins
const FONTS = {
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  extraBold: 'Poppins-ExtraBold',
  italic: 'Poppins-Italic',
  size: {
    tiny: 10, caption: 12, small: 13, body: 14,
    subtitle: 16, subheading: 18, heading: 20, hero: 32,
  },
  letterSpacing: { tight: -0.5, normal: 0, wide: 0.5, wider: 1.2 },
};

export default FONTS;