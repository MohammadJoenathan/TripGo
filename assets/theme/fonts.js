// assets/theme/fonts.js
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_400Regular_Italic,
} from '@expo-google-fonts/poppins';

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

export const fontType = {
  'Poppins-Light':     Poppins_300Light,
  'Poppins-Regular':   Poppins_400Regular,
  'Poppins-Medium':    Poppins_500Medium,
  'Poppins-SemiBold':  Poppins_600SemiBold,
  'Poppins-Bold':      Poppins_700Bold,
  'Poppins-ExtraBold': Poppins_800ExtraBold,
  'Poppins-Italic':    Poppins_400Regular_Italic,
};

export default FONTS;