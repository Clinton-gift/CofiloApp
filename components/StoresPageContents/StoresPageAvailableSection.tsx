import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const DARK = '#0F172B';
const TILE = 60;
const R = 16;

type Props = {
  /** Gap from the left edge in px. Default: 10 */
  edgeOffset?: number;
};

export default function StoresPageAvailableSection({ edgeOffset = 10 }: Props) {
  const router = useRouter();
  const goAmazon = () => router.push('/amazon' as const);

  return (
    <View style={[styles.featureRow, { paddingLeft: edgeOffset }]}>
      {/* Shein tile (left-aligned) */}
      <Pressable
        style={styles.tile}
        onPress={goAmazon}
        accessibilityRole="button"
        accessibilityLabel="Open Amazon page"
        hitSlop={8}
      >
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
  tileIcon: { width: 34, height: 34 },
  tileLabel: {
    fontSize: 12,
    color: DARK,
    fontFamily: 'ClashGrotesk',
    textAlign: 'center',
    fontWeight: '700',
  },
});
