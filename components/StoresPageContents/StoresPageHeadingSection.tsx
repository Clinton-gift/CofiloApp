import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WHITE = '#FFFFFF';
const DARK = '#0F172B';

export default function StoresPageHeadingSection() {
  return (
    <View style={styles.headerBar}>
      <Text style={styles.headerTitle}>Stores</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // full-bleed white header
  headerBar: {
    backgroundColor: WHITE,
    paddingVertical: 19,
    alignItems: 'center',
    marginHorizontal: -20, // negate parent padding to bleed edge-to-edge
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontFamily: 'ClashGrotesk',
    marginTop: 50,
    fontSize: 22,
    color: DARK,
    fontWeight: '700', // bold
  },
});
