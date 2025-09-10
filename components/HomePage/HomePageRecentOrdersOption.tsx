import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const DARK = '#0F172B';
const MUTED = '#94A3B8';
const SUCCESS = '#16A34A';

type Props = {
  brand: string;
  time?: string;
  amount?: string;
  status?: string;
};

export default function HomePageRecentOrdersOption({ brand, time, amount, status }: Props) {
  return (
    <View style={styles.orderItem}>
      <View style={styles.orderLeft}>
        <View style={styles.orderAvatar}>
          <Image source={require('../../assets/images/Shein.png')} style={styles.avatarIcon} contentFit="contain" />
        </View>
        <View>
          <Text style={styles.orderBrand}>{brand}</Text>
          {time ? <Text style={styles.orderTime}>{time}</Text> : null}
        </View>
      </View>

      <View style={styles.orderRight}>
        {amount ? <Text style={styles.orderAmount}>{amount}</Text> : null}
        {status ? <Text style={styles.orderStatus}>{status}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: 'row', alignItems: 'center', padding: 14,
    borderRadius: 16, backgroundColor: '#F7F8FB', marginTop: 12, justifyContent: 'space-between',
  },
  orderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  orderAvatar: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  avatarIcon: { width: 22, height: 22 },
  orderBrand: { color: DARK, fontSize: 16, fontFamily: 'ClashGrotesk' },
  orderTime: { color: MUTED, fontSize: 12, fontFamily: 'ClashGrotesk', marginTop: 2 },
  orderRight: { alignItems: 'flex-end' },
  orderAmount: { color: DARK, fontSize: 16, fontFamily: 'ClashGrotesk' },
  orderStatus: { color: SUCCESS, fontSize: 12, fontFamily: 'ClashGrotesk', marginTop: 2 },
});
