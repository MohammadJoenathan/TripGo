import React from 'react';
import { View, Text, Image, Modal, Button, TouchableWithoutFeedback, StyleSheet,} from 'react-native';
import { COLORS, FONTS } from '../../assets/theme';

const DetailModal = ({ visible, item, onClose, type }) => {
  // Jika tidak ada item, tidak perlu render apapun
  if (!item) return null;

  // Menentukan sumber gambar dan teks berdasarkan tipe data
  const imageUri = type === 'wisata' ? item.gambar : item.thumbnail;
  const title = type === 'wisata' ? item.nama : item.judul;
  const description = type === 'wisata' ? item.deskripsi : item.konten;

  return (
    <Modal visible={visible} transparent animationType="slide">
      {/* Overlay gelap: menekan area luar modal akan menutupnya */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBg} />
      </TouchableWithoutFeedback>

      <View style={styles.modalBox}>
        <Image source={{ uri: imageUri }} style={styles.modalImg} />

        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{description}</Text>
          <Button title="Tutup" onPress={onClose} color={COLORS.primary} />
        </View>
      </View>
    </Modal>
  );
};
export default DetailModal;

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  modalBox: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    maxHeight: '85%',
  },

  modalImg: {
    width: '100%',
    height: 220,
  },

  modalContent: {
    padding: 16,
  },

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