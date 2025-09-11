import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';

const DARK = '#0F172B';

type Props = { onSeeAll?: () => void };

export default function HomePageRecentOrdersHeading({ onSeeAll }: Props) {
  return (
    <View style={styles.rowBetween}>
      <Text style={styles.sectionTitle}>Recent orders</Text>

      <Pressable style={styles.seeAllBtn} onPress={onSeeAll}>
        <Text style={styles.seeAllText}>See all</Text>
        <Image
          source={require('../../assets/images/ArrowRight.png')}
          style={styles.seeAllIcon}
          contentFit="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, color: DARK, marginBottom: 12, fontWeight: '700', fontFamily: 'ClashGrotesk' },

  // pill button container
  seeAllBtn: {
    backgroundColor: '#0F172B',
    paddingHorizontal: 19,
    height: 30,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: { color: '#fff', fontSize: 14, fontFamily: 'ClashGrotesk' },
  // add space between text and arrow
  seeAllIcon: { width: 6, height: 11, tintColor: '#fff', marginLeft: 10 },
});
