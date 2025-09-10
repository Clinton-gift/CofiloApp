import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import HomePageRecentOrdersHeading from './HomePageRecentOrdersHeading';
import HomePageRecentOrdersOption from './HomePageRecentOrdersOption';

const CARD = '#FFFFFF';

export default function HomePageRecentOrdersSection() {
  return (
    <View style={styles.card}>
      <HomePageRecentOrdersHeading onSeeAll={() => {}} />
      <HomePageRecentOrdersOption
        brand="Shein"
        time="12.09.25 12:34"
        amount="50,000 FCFA"
        status="Successful"
      />
      <HomePageRecentOrdersOption
        brand="Shein"
        time="12.09.25 12:34"
        amount="12 000 FCFA"
        status="Successful"
      />
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
