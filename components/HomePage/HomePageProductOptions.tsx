import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';

const DARK = '#0F172B';

type Props = { onSheinPress?: () => void };

export default function HomePageProductOptions({ onSheinPress }: Props) {
  return (
    <>
      <Text style={styles.sectionTitle}>Stores</Text>

      <View style={styles.storeRow}>
        {/* Shein (clickable) */}
        <Pressable
          style={styles.storeItem}
          onPress={onSheinPress}
        
        >
          <View style={styles.storeIconWrap}>
            <Image source={require('../../assets/images/Shein.png')} style={styles.storeIcon} contentFit="contain" />
          </View>
          <Text style={styles.storeLabel}>Shein</Text>
        </Pressable>

        {/* Others (static for now) */}
        <View style={styles.storeItem}>
          <View style={styles.storeIconWrap}>
            <Image source={require('../../assets/images/Adidas.png')} style={styles.storeIcon} contentFit="contain" />
          </View>
          <Text style={styles.storeLabel}>Adidas</Text>
        </View>

        <View style={styles.storeItem}>
          <View style={styles.storeIconWrap}>
            <Image source={require('../../assets/images/Amazon.png')} style={styles.storeIcon} contentFit="contain" />
          </View>
          <Text style={styles.storeLabel}>Amazon</Text>
        </View>

        <View style={styles.storeItem}>
          <View style={styles.storeIconWrap}>
            <Image source={require('../../assets/images/Apple.png')} style={styles.storeIcon} contentFit="contain" />
          </View>
          <Text style={styles.storeLabel}>Apple</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, color: DARK, marginBottom: 12, fontWeight: '700', fontFamily: 'ClashGrotesk' },
  storeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  storeItem: { alignItems: 'center', width: '23%' },
  storeIconWrap: {
    width: 72, height: 72, borderRadius: 18, backgroundColor: '#F2F4F7',
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  storeIcon: { width: 36, height: 36 },
  storeLabel: { fontSize: 14, color: DARK, fontWeight: '700', fontFamily: 'ClashGrotesk' },
});
