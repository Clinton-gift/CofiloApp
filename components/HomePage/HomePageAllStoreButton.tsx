import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const BLUE = '#2B7FFF';

type Props = { onPress?: () => void };

export default function HomePageAllStoreButton({ onPress }: Props) {
  return (
    <Pressable style={styles.allStoresBtn} android_ripple={{ color: 'rgba(255,255,255,0.2)' }} onPress={onPress}>
      <Text style={styles.allStoresText}>All Stores</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  allStoresBtn: {
    backgroundColor: BLUE,
    borderRadius: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allStoresText: { color: '#fff', fontSize: 18, fontFamily: 'ClashGrotesk' },
});
