import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const BG = '#F8FAFC';
const CARD = '#FFFFFF';
const DARK = '#0F172B';
const MUTED = '#94A3B8';
const BLUE = '#2B7FFF';
const SUCCESS = '#16A34A';
const ORANGE = '#F97316';
const PINK = '#E11D48';
const PURPLE = '#7C3AED';

type Row = {
  brand: string;
  code: string;
  amount: string;
  status: string;
  statusColor: string;
  icon: any;
};

const DATA: Row[] = [
  { brand: 'Amazon',     code: 'PKG2025090212WW', amount: '120,000 FCFA', status: 'Order Placed',   statusColor: ORANGE, icon: require('../../assets/images/AmazonC.png') },
  { brand: 'Adidas',     code: 'PKG20250902124E', amount: '50,000 FCFA',  status: 'At Warehouse',  statusColor: BLUE,   icon: require('../../assets/images/AdidasC.png') },
  { brand: 'Ali Express',code: 'PKG20250902122W', amount: '30,000 FCFA',  status: 'In Transit',    statusColor: MUTED,  icon: require('../../assets/images/AliExpressC.png') },
  { brand: 'Amazon',     code: 'PKG202509021029', amount: '60,000 FCFA',  status: 'Tap to Pay Fee',statusColor: PINK,   icon: require('../../assets/images/AmazonC.png') },
  { brand: 'Apple',      code: 'PKG2025090212PP', amount: '10,000 FCFA',  status: 'Fee Paid',      statusColor: SUCCESS,icon: require('../../assets/images/AppleC.png') },
  { brand: 'Asos',       code: 'PKG2025090212QQ', amount: '60,000 FCFA',  status: 'At Pickup',     statusColor: PURPLE, icon: require('../../assets/images/AsosC.png') },
  { brand: 'AutoDoc',    code: 'PKG202509021222', amount: '340,000 FCFA', status: 'Collected',     statusColor: MUTED,  icon: require('../../assets/images/AutoDocC.png') },
];

type Props = { bottomSpacer?: number };

export default function OrdersPageOrdersOptionsSection({ bottomSpacer = 8 }: Props) {
  // const router = useRouter();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.content}>
      {DATA.map((row, idx) => (
        <Pressable
          key={`${row.brand}-${idx}`}
          style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
          onPress={() => navigation.navigate('orderdetails' as const)}
          android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
          accessibilityRole="button"
          accessibilityLabel={`${row.brand} ${row.code}`}
        >
          {/* Left: icon + texts */}
          <View style={styles.left}>
            <View style={styles.avatar}>
              <Image source={row.icon} style={{ width: 32, height: 32 }} contentFit="contain" />
            </View>
            <View>
              <Text style={styles.brand}>{row.brand}</Text>
              <Text style={styles.code}>{row.code}</Text>
            </View>
          </View>

          {/* Right: amount + status */}
          <View style={styles.right}>
            <Text style={styles.amount}>{row.amount}</Text>
            <Text style={[styles.status, { color: row.statusColor }]}>{row.status}</Text>
          </View>
        </Pressable>
      ))}

      {/* keep last card clear of the tab bar */}
      <View style={{ height: bottomSpacer }} />
    </View>
  );
}

const R = 18;

const styles = StyleSheet.create({
  content: {
    backgroundColor: BG,
    marginHorizontal: -20,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: R,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  itemPressed: { opacity: 0.96 },

  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center',
  },

  brand:  { fontFamily: 'ClashGrotesk', fontWeight: '700', fontSize: 14, color: DARK },
  code:   { fontFamily: 'ClashGrotesk', fontSize: 12, fontWeight: '700', color: MUTED, marginTop: 2 },

  right:  { alignItems: 'flex-end' },
  amount: { fontFamily: 'ClashGrotesk', fontWeight: '700', fontSize: 14, color: DARK },
  status: { fontFamily: 'ClashGrotesk', fontSize: 12, fontWeight: '700', marginTop: 2 },
});
