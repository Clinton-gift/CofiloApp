import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WHITE = '#FFFFFF';
const DARK = '#0F172B';

export default function MorePageHeadingSection() {
  return (
    <View style={styles.headerBar}>
      <Text style={styles.headerTitle}>More</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // full-bleed white header; parent has 20px horizontal padding
  headerBar: {
    backgroundColor: WHITE,
    paddingVertical: 19,
    alignItems: 'center',
    marginHorizontal: -20,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontFamily: 'ClashGroteskBold',
    marginTop: 40,
    fontSize: 22,
    fontWeight: '700',


  },
});
