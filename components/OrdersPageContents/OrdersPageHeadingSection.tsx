import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WHITE = '#FFFFFF';
const DARK = '#0F172B';

export default function OrdersPageHeadingSection() {
  return (
    <View style={styles.headerBar}>
      <Text style={styles.headerTitle}>Orders</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // full-bleed white header (parent has 20px side padding)
  headerBar: {
    backgroundColor: WHITE,
    paddingVertical: 19,
    alignItems: 'center',
    marginHorizontal: -20, // bleed edge-to-edge
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontFamily: 'ClashGrotesk',
    marginTop: 50,
    fontSize: 22,
    color: DARK,
    fontWeight: '700',
  },
});
