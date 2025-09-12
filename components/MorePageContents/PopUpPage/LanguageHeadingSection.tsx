import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DARK = '#0F172B';

export default function LanguageHeadingSection() {
  return (
    <>
      <View style={styles.grabber} />
      <Text style={styles.sheetTitle}>Change language</Text>
    </>
  );
}

const styles = StyleSheet.create({
  grabber: {
    alignSelf: 'center',
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  sheetTitle: {
    fontFamily: 'ClashGrotesk',
    fontSize: 22,
    fontWeight: '700',
    color: DARK,
    textAlign: 'center',
    marginBottom: 14,
  },
});
