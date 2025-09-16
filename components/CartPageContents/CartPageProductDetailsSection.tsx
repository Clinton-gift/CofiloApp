import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';

const WHITE = '#FFFFFF';
const DARK = '#0F172B';
const BLUE = '#2B7FFF';
const RED = '#EF4444';
const PILL_BG = '#EEF3F8';
const CARD_R = 22;

type Props = {
  title: string;
  chipColor: string;
  chipSize: string | number;
  qty: number;
  priceLabel: string;
  onInc: () => void;
  onDec: () => void;
};

export default function CartPageProductDetailsSection({
  title,
  chipColor,
  chipSize,
  qty,
  priceLabel,
  onInc,
  onDec,
}: Props) {
  return (
    <View style={styles.card}>
      {/* product image */}
      <Image
        source={require('../../assets/images/ProductsC.png')}
        style={styles.productImg}
        contentFit="cover"
      />

      {/* right column */}
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text numberOfLines={1} style={styles.prodTitle}>{title}</Text>

        {/* chips */}
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <View style={styles.chip}><Text style={styles.chipTxt}>{chipColor}</Text></View>
          <View style={[styles.chip, { marginLeft: 10 }]}><Text style={styles.chipTxt}>{String(chipSize)}</Text></View>
        </View>

        {/* qty + price row */}
        <View style={styles.qtyRow}>
          <View style={styles.qtyPill}>
            <Pressable onPress={onDec} style={[styles.circleBtnSm, { backgroundColor: RED }]}>
              <Text style={styles.circleBtnTxtSm}>−</Text>
            </Pressable>
            <Text style={styles.qtyTxtSm}>{qty}</Text>
            <Pressable onPress={onInc} style={[styles.circleBtnSm, { backgroundColor: BLUE }]}>
              <Text style={styles.circleBtnTxtSm}>＋</Text>
            </Pressable>
          </View>

          <Text style={styles.price}>{priceLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: CARD_R,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...(Platform.OS === 'android'
      ? { elevation: 1 }
      : { shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } }),
  },
  productImg: { width: 110, height: 110, borderRadius: 18 },
  prodTitle: { fontFamily: 'ClashGrotesk', fontSize: 14, color: DARK, fontWeight: '700' },

  chip: { backgroundColor: DARK, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  chipTxt: { color: '#fff', fontFamily: 'ClashGrotesk', fontSize: 12, fontWeight: '700' },

  qtyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  qtyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PILL_BG,
    borderRadius: 18,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 8,
  },
  circleBtnSm: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  circleBtnTxtSm: { color: '#fff', fontSize: 16, fontFamily: 'ClashGrotesk', fontWeight: '700', lineHeight: 16 },
  qtyTxtSm: { minWidth: 16, textAlign: 'center', fontSize: 14, color: DARK, fontFamily: 'ClashGrotesk', fontWeight: '700' },
  price: { fontFamily: 'ClashGrotesk', fontSize: 14, color: DARK, fontWeight: '700' },
});
