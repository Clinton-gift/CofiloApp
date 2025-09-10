import React from 'react';
import { StyleSheet, Pressable, type DimensionValue } from 'react-native';
import { Image } from 'expo-image';

type Props = {
  /** number, `${number}%`, or 'auto' */
  width?: DimensionValue;
  /** default 170 */
  height?: number;
  /** tap handler (e.g., go to Amazon page) */
  onPress?: () => void;
};

export default function HomePageImage({
  width = '97%' as DimensionValue,
  height = 170,
  onPress,
}: Props) {
  return (
    <Pressable
      style={[styles.wrap, { width, height }]}
      onPress={onPress}
      disabled={!onPress}
      android_ripple={onPress ? { color: 'rgba(0,0,0,0.08)' } : undefined}
    >
      <Image
        source={require('../../assets/images/SummerSale.png')}
        style={styles.banner}
        contentFit="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // wrapper keeps it centered and clips rounded corners
  wrap: {
    alignSelf: 'center',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
  },
  banner: { width: '100%', height: '100%' },
});
