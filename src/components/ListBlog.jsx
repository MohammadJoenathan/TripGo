import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  SectionList,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  Button,
  Dimensions,
} from 'react-native';

import { COLORS, FONTS } from '../../assets/theme';

const { width } = Dimensions.get('window');

// Data wisata untuk slider
const WISATA = [
  {
    id: 'w1',
    nama: 'Telaga Ngebel',
    kategori: 'Alam',
    gambar:
      'https://akcdn.detik.net.id/community/media/visual/2022/10/31/telaga-ngebel-ponorogo-4.jpeg?w=4000',
    deskripsi: 'Danau indah di kaki Gunung Wilis, cocok untuk healing.',
  },
  {
    id: 'w2',
    nama: 'Goa Lowo',
    kategori: 'Alam',
    gambar:
      'https://aswajanews.isnuponorogo.org/wp-content/uploads/2024/09/IMG-20240901-WA0017.jpg',
    deskripsi: 'Gua wisata panjang dengan stalaktit yang menakjubkan.',
  },
  {
    id: 'w3',
    nama: 'Reog Ponorogo',
    kategori: 'Budaya',
    gambar:
      'https://imgcdn.espos.id/@espos/images/2024/12/20241223122926-pertunjukan-reog-3.jpg?quality=60',
    deskripsi: 'Seni budaya kebanggaan Ponorogo yang mendunia.',
  },
  {
    id: 'w4',
    nama: 'Sate Ponorogo',
    kategori: 'Kuliner',
    gambar:
      'https://www.finnafood.com/blog/wp-content/uploads/2024/07/sate-ponorogo.jpg',
    deskripsi: 'Kuliner khas Ponorogo dengan bumbu kacang yang khas.',
  },
];

// Data artikel untuk SectionList
const BLOG = [
  {
    title: '🌿 Wisata Alam',
    kategori: 'Alam',
    data: [
      {
        id: 'a1',
        judul: 'Telaga Ngebel',
        penulis: 'Mohammad Joenathan',
        tanggal: '12 Mar 2025',
        thumbnail:
          'https://i.pinimg.com/1200x/89/19/5b/89195b7b3a1c00c119ab2ae930e30270.jpg',
        konten:
          'Nikmati ketenangan danau vulkanik Ponorogo saat matahari terbit pertama kali menyapa permukaannya.',
      },
      {
        id: 'a2',
        judul: 'Goa Lowo',
        penulis: 'Tito',
        tanggal: '3 Mar 2025',
        thumbnail:
          'https://aswajanews.isnuponorogo.org/wp-content/uploads/2024/09/IMG-20240901-WA0017.jpg',
        konten:
          'Goa Lowo menyimpan keajaiban alam bawah tanah yang memukau. Dengan panjang lebih dari 2 kilometer, gua ini dinobatkan sebagai gua terpanjang di Asia Tenggara.',
      },
    ],
  },
  {
    title: '🎭 Seni & Budaya',
    kategori: 'Budaya',
    data: [
      {
        id: 'b1',
        judul: 'Reog Ponorogo',
        penulis: 'Mohammad Joenathan',
        tanggal: '20 Feb 2025',
        thumbnail:
          'https://imgcdn.espos.id/@espos/images/2024/12/20241223122926-pertunjukan-reog-3.jpg?quality=60',
        konten: 'Reog Ponorogo bukan sekadar tari, tetapi identitas...',
      },
      {
        id: 'b2',
        judul: 'Grebeg Suro',
        penulis: 'Ardiansyah',
        tanggal: '10 Feb 2025',
        thumbnail:
          'https://aswajanews.isnuponorogo.org/wp-content/uploads/2023/07/grebeg.png',
        konten:
          'Setiap tahun sekali, Ponorogo berubah menjadi lautan budaya dalam festival akbar Grebeg Suro.',
      },
    ],
  },
  {
    title: '🍜 Kuliner Khas',
    kategori: 'Kuliner',
    data: [
      {
        id: 'c1',
        judul: 'Sate Ponorogo',
        penulis: 'Mohammad Joenathan',
        tanggal: '5 Feb 2025',
        thumbnail:
          'https://www.finnafood.com/blog/wp-content/uploads/2024/07/sate-ponorogo.jpg',
        konten:
          'Potongan daging lebih lebar, bumbu kacang lebih kental — inilah keunikan sate kebanggaan Ponorogo.',
      },
      {
        id: 'c2',
        judul: 'Dawet Jabung Ponorogo',
        penulis: 'Prayitno',
        tanggal: '12 Feb 2025',
        thumbnail:
          'https://img-global.cpcdn.com/recipes/07bc5722b36ef788/1280x1280sq80/photo.webp',
        konten:
          'Minuman tradisional khas dari Desa Jabung, Kecamatan Mlarak, Ponorogo, Jawa Timur, yang terkenal dengan perpaduan rasa manis gula aren asli dan gurihnya santan murni.',
      },
    ],
  },
];

// Daftar kategori filter
const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'Alam', label: 'Alam' },
  { id: 'Budaya', label: 'Budaya' },
  { id: 'Kuliner', label: 'Kuliner' },
];

// komponen kartu wisata untuk slider FlatList
const WisataCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.slide} onPress={() => onPress(item)}>
    <Image source={{ uri: item.gambar }} style={styles.slideImg} />
    <View style={styles.slideInfo}>
      <Text style={styles.slideTitle}>{item.nama}</Text>
    </View>
  </TouchableOpacity>
);

// komponen kartu artikel untuk SectionList
const BlogCard = ({ item, onPress }) => (
  <TouchableHighlight
    style={styles.blogWrapper}
    underlayColor={COLORS.border}
    onPress={() => onPress(item)}
  >
    <View style={styles.blogCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.blogImg} />
      <View style={{ flex: 1 }}>
        <Text style={styles.blogTitle} numberOfLines={2}>
          {item.judul}
        </Text>
        <Text style={styles.blogMeta}>
          ✍️ {item.penulis} • 🗓️ {item.tanggal}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
);

// komponen modal untuk menampilkan detail wisata/artikel
const DetailModal = ({ visible, item, onClose, type }) => {
  if (!item) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBg} />
      </TouchableWithoutFeedback>

      <View style={styles.modalBox}>
        <Image
          source={{ uri: type === 'wisata' ? item.gambar : item.thumbnail }}
          style={styles.modalImg}
        />

        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {type === 'wisata' ? item.nama : item.judul}
          </Text>

          <Text style={styles.modalText}>
            {type === 'wisata' ? item.deskripsi : item.konten}
          </Text>

          <Button title="Tutup" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

// komponen utama untuk menampilkan wisata dan artikel berdasarkan kategori
export default function ListBlog({ selectedCategory, setSelectedCategory }) {
  const [modalItem, setModalItem] = useState(null);
  const [modalType, setModalType] = useState('wisata');

  //  memfilter data wisata sesuai kategori aktif
  const wisataFiltered = useMemo(() => {
    if (selectedCategory === 'all') return WISATA;
    return WISATA.filter((w) => w.kategori === selectedCategory);
  }, [selectedCategory]);

  // memfilter data artikel sesuai kategori aktif
  const blogFiltered = useMemo(() => {
    if (selectedCategory === 'all') return BLOG;
    return BLOG.filter((b) => b.kategori === selectedCategory);
  }, [selectedCategory]);

  // membuka modal detail wisata
  const openWisata = (item) => {
    setModalType('wisata');
    setModalItem(item);
  };

  // membuka modal detail artikel
  const openArtikel = (item) => {
    setModalType('artikel');
    setModalItem(item);
  };

  // closeModal = menutup modal detail wisata/artikel
  const closeModal = () => setModalItem(null);

  // Header = header SectionList yang berisi slider dan kategori
  const Header = () => (
    <View>
      <Text style={styles.sectionTitle}>🏆 Destinasi Unggulan</Text>

      <FlatList
        data={wisataFiltered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WisataCard item={item} onPress={openWisata} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      <Text style={styles.sectionTitle}>📌 Kategori</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catRow}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.catBtn,
              selectedCategory === cat.id && styles.catBtnActive,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text
              style={[
                styles.catText,
                selectedCategory === cat.id && styles.catTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>📰 Artikel Wisata</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <SectionList
        sections={blogFiltered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BlogCard item={item} onPress={openArtikel} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        ListHeaderComponent={Header}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />

      <DetailModal
        visible={!!modalItem}
        item={modalItem}
        onClose={closeModal}
        type={modalType}
      />
    </View>
  );
}

// Berisi semua styling yang digunakan pada ListBlog.jsx
const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 10,
    paddingHorizontal: 16,
    color: COLORS.charcoal,
  },

  slide: {
    width: width * 0.72,
    height: 200,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.lightGray,
  },

  slideImg: { width: '100%', height: '100%' },

  slideInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  slideTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },

  catRow: { paddingHorizontal: 16, gap: 10, paddingBottom: 8 },

  catBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },

  catBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },

  catText: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.charcoal },

  catTextActive: { color: COLORS.white },

  sectionHeader: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.offWhite,
    marginTop: 10,
  },

  blogWrapper: {
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },

  blogCard: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    backgroundColor: COLORS.surface,
  },

  blogImg: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
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

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)' },

  modalBox: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    maxHeight: '85%',
  },

  modalImg: { width: '100%', height: 220 },

  modalContent: { padding: 16 },

  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.charcoal,
    marginBottom: 10,
  },

  modalText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.darkGray,
    lineHeight: 20,
    marginBottom: 16,
  },
});