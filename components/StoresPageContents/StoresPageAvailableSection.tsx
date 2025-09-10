import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';

const DARK = '#0F172B';
const TILE = 60;
const R = 16;

type Props = {
  /** Gap from the left edge in px. Default: 0 */
  edgeOffset?: number;
};

export default function StoresPageAvailableSection({ edgeOffset = 10 }: Props) {
  return (
    <View style={[styles.featureRow, { paddingLeft: edgeOffset }]}>
      {/* Shein tile (left-aligned) */}
      <Pressable style={styles.tile}>
        <View style={styles.tileIconWrap}>
          <Image
            source={require('../../assets/images/Shein.png')}
            style={styles.tileIcon}
            contentFit="contain"
          />
        </View>
        <Text style={styles.tileLabel}>Shein</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  featureRow: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start', // keep left-aligned
  },
  tile: { alignItems: 'center' },
  tileIconWrap: {
    width: TILE,
    height: TILE,
    borderRadius: R,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  tileIcon: { width: 32, height: 32 },
  tileLabel: {
    fontSize: 12,
    color: DARK,
    fontFamily: 'ClashGrotesk',
    textAlign: 'center',
    fontWeight: '500',
  },
});
