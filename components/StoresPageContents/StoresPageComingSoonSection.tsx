import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';

const DARK = '#0F172B';
const TILE = 60;
const R = 16;

export default function StoresPageComingSoonSection() {
  return (
    <>
      <Text style={styles.coming}>Coming soon</Text>

      {/* 4-column responsive grid */}
      <View style={styles.grid}>
        {[
          { label: 'AliExpress', img: require('../../assets/images/AliExpress.png') },
          { label: 'Amazon',    img: require('../../assets/images/Amazon.png') },
          { label: 'Asos',      img: require('../../assets/images/Asos.png') },
          { label: 'Zara',      img: require('../../assets/images/Zara.png') },
          { label: 'Bershka',   img: require('../../assets/images/Bershka.png') },
        ].map(s => (
          <Pressable key={s.label} style={styles.gridTile}>
            <View style={styles.tileIconWrapDimmed}>
              <Image source={s.img} style={styles.tileIcon} contentFit="contain" />
            </View>
            <Text style={styles.tileLabelDimmed}>{s.label}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  coming: {
    fontSize: 16,
    color: DARK,
    fontFamily: 'ClashGrotesk',
    marginTop: 8,
    marginBottom: 10,
    fontWeight: '500',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,  // balances tile horizontal padding
    paddingTop: 8,
  },
  gridTile: {
    flexBasis: '25%',
    maxWidth: '25%',
    paddingHorizontal: 6,
    marginBottom: 18,
    alignItems: 'center',
  },

  // dimmed (coming soon) container + label
  tileIconWrapDimmed: {
    width: TILE,
    height: TILE,
    borderRadius: R,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  tileIcon: { width: 32, height: 32 },

  tileLabelDimmed: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'ClashGrotesk',
    textAlign: 'center',
    fontWeight: '500',
  },
});
