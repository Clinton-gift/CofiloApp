import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';

const WHITE = '#FFFFFF';
const BG = '#F8FAFC';
const DARK = '#0F172B';
// const MUTED = '#94A3B8';

type StoreTileProps = {
  label: string;
  src: any;
  dimmed?: boolean;
  onPress?: () => void;
};

function StoreTile({ label, src, dimmed, onPress }: StoreTileProps) {
  return (
    <Pressable
      style={styles.tile}
      onPress={onPress}
      disabled={!onPress}
      android_ripple={onPress ? { color: 'rgba(0,0,0,0.06)' } : undefined}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={[styles.tileIconWrap, dimmed && styles.tileIconWrapDimmed]}>
        <Image source={src} style={styles.tileIcon} contentFit="contain" />
      </View>
      <Text style={[styles.tileLabel, dimmed && styles.tileLabelDimmed]}>{label}</Text>
    </Pressable>
  );
}

export default function StoresPage() {
  return (
    <View>
      {/* Full-bleed white header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Stores</Text>
      </View>

      {/* Full-bleed #F8FAFC content */}
      <View style={styles.content}>
        {/* Featured Shein */}
        <View style={styles.featureRow}>
          <StoreTile label="Shein" src={require('../../assets/images/Shein.png')} />
        </View>

        {/* Coming soon */}
        <Text style={styles.coming}>Coming soon</Text>

        {/* 4-column grid */}
        <View style={styles.grid}>
          <StoreTile label="AliExpress" src={require('../../assets/images/AliExpress.png')} dimmed />
          <StoreTile label="Amazon"    src={require('../../assets/images/Amazon.png')}    dimmed />
          <StoreTile label="Asos"      src={require('../../assets/images/Asos.png')}      dimmed />
          <StoreTile label="Zara"      src={require('../../assets/images/Zara.png')}      dimmed />
          <StoreTile label="Bershka"   src={require('../../assets/images/Bershka.png')}   dimmed />
        </View>
      </View>
    </View>
  );
}

const TILE = 60;
const R = 16;

const styles = StyleSheet.create({
  // negate parent horizontal padding (20) to bleed edge-to-edge
  headerBar: {
    backgroundColor: WHITE,
    paddingVertical: 19,
    alignItems: 'center',
    marginHorizontal: -20,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
headerTitle: {
  fontFamily: 'ClashGrotesk',
  marginTop: 50,
  fontSize: 22,
  color: DARK,
  fontWeight: '700', // add this
},



  content: {
    backgroundColor: BG,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },

  featureRow: { paddingVertical: 10 },

  // GRID
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // side padding to make gaps even; tiles provide their own horizontal padding
    marginHorizontal: -4,
    paddingTop: 8,
  },
  tile: {
    flexBasis: '25%',   // <-- 4 across, always wraps
    maxWidth: '25%',
    paddingHorizontal: 6,
    marginBottom: 18,
    alignItems: 'center',
  },
  tileIconWrap: {
    width: TILE,
    height: TILE,
    borderRadius: R,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  // “Coming soon” style: dim the container (not the image)
  tileIconWrapDimmed: { backgroundColor: '#FFFFFF' },

  tileIcon: { width: 32, height: 32 },

  tileLabel: {
    fontSize: 12,
    color: DARK,
    fontFamily: 'ClashGrotesk',
    textAlign: 'center',
    fontWeight: '500',
  },
  tileLabelDimmed: { color: '#6B7280' },

  coming: {
    fontSize: 16,
    color: DARK,
    fontFamily: 'ClashGrotesk',
    marginTop: 8,
    marginBottom: 10,
    fontWeight: '500',
  },
});
