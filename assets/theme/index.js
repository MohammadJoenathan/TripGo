/**
 * File index.js
 * Digunakan untuk menggabungkan colors dan fonts agar import lebih mudah
 */

import COLORS from './colors';
import FONTS, { fontType } from './fonts';

/**
 * Fungsi export theme
 * supaya bisa dipakai dengan import { COLORS, FONTS }
 */
export { COLORS, FONTS, fontType };