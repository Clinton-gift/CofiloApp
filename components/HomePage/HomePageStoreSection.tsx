import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import HomePageProductOptions from './HomePageProductOptions';
import HomePageAllStoreButton from './HomePageAllStoreButton';

const CARD = '#FFFFFF';

type Props = {
  onAllStores?: () => void;
  onSheinPress?: () => void; // NEW
};

export default function HomePageStoreSection({ onAllStores, onSheinPress }: Props) {
  return (
    <View style={styles.card}>
      <HomePageProductOptions onSheinPress={onSheinPress} />
      <HomePageAllStoreButton onPress={onAllStores} />
    </View>
  );
}

const r = 24;

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD, borderRadius: r, padding: 16, marginBottom: 16,
    ...(Platform.OS === 'android'
      ? { elevation: 1 }
      : { shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }),
  },
});
