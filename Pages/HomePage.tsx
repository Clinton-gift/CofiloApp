import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { Image } from 'expo-image';

const BLUE = '#2B7FFF';
const BG = '#F5F7FA';
const CARD = '#FFFFFF';
const MUTED = '#94A3B8';
const DARK = '#0F172B';
const SUCCESS = '#16A34A';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'home' | 'stores' | 'orders' | 'more'>('home');

  // safe-area for bottom bar
  const insets = useSafeAreaInsets();
  const TAB_BASE = 64;
  const tabPaddingBottom = Math.max(insets.bottom, Platform.OS === 'android' ? 8 : 10);
  const tabHeight = TAB_BASE + tabPaddingBottom;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        {/* logo replaces text */}
        <Image
          source={require('../assets/images/cofilologo.png')}
          style={styles.brandLogo}
          contentFit="contain"
        />

        <Pressable style={styles.supportBtn} onPress={() => {}}>
          <Image
            source={require('../assets/images/support.png')}
            style={styles.supportIcon}
            contentFit="contain"
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Promo Banner */}
        <Image
          source={require('../assets/images/SummerSale.png')}
          style={styles.banner}
          contentFit="cover"
        />

        {/* Stores card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Stores</Text>

          <View style={styles.storeRow}>
            <View style={styles.storeItem}>
              <View style={styles.storeIconWrap}>
                <Image source={require('../assets/images/Shein.png')} style={styles.storeIcon} contentFit="contain" />
              </View>
              <Text style={styles.storeLabel}>Shein</Text>
            </View>

            <View style={styles.storeItem}>
              <View style={styles.storeIconWrap}>
                <Image source={require('../assets/images/Adidas.png')} style={styles.storeIcon} contentFit="contain" />
              </View>
              <Text style={styles.storeLabel}>Adidas</Text>
            </View>

            <View style={styles.storeItem}>
              <View style={styles.storeIconWrap}>
                <Image source={require('../assets/images/Amazon.png')} style={styles.storeIcon} contentFit="contain" />
              </View>
              <Text style={styles.storeLabel}>Amazon</Text>
            </View>

            <View style={styles.storeItem}>
              <View style={styles.storeIconWrap}>
                <Image source={require('../assets/images/Apple.png')} style={styles.storeIcon} contentFit="contain" />
              </View>
              <Text style={styles.storeLabel}>Apple</Text>
            </View>
          </View>

          <Pressable style={styles.allStoresBtn} android_ripple={{ color: 'rgba(255,255,255,0.2)' }} onPress={() => {}}>
            <Text style={styles.allStoresText}>All Stores</Text>
          </Pressable>
        </View>

        {/* Recent orders */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Recent orders</Text>
            <Pressable style={styles.seeAll} onPress={() => {}}>
              <Text style={styles.seeAllText}>See all</Text>
              <Image source={require('../assets/images/ArrowRight.png')} style={styles.seeAllIcon} contentFit="contain" />
            </Pressable>
          </View>

          {[
            { brand: 'Shein', time: '12.09.25 12:34', amount: '50,000 FCFA', status: 'Successful' },
            { brand: 'Shein', time: '12.09.25 12:34', amount: '12 000 FCFA', status: 'Successful' },
          ].map((o, idx) => (
            <View key={idx} style={styles.orderItem}>
              <View style={styles.orderLeft}>
                {/* avatar now light like tiles */}
                <View style={styles.orderAvatar}>
                  <Image source={require('../assets/images/Shein.png')} style={styles.avatarIcon} contentFit="contain" />
                </View>
                <View>
                  <Text style={styles.orderBrand}>{o.brand}</Text>
                  <Text style={styles.orderTime}>{o.time}</Text>
                </View>
              </View>

              <View style={styles.orderRight}>
                <Text style={styles.orderAmount}>{o.amount}</Text>
                <Text style={styles.orderStatus}>{o.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* bottom spacer so content doesn't hide behind the tab bar */}
        <View style={{ height: tabHeight + 12 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={[styles.tabbar, { height: tabHeight, paddingBottom: tabPaddingBottom }]}>
        {([
          { key: 'home', label: 'Home', icon: require('../assets/images/Home.svg') },
          { key: 'stores', label: 'Stores', icon: require('../assets/images/stores.svg') },
          { key: 'orders', label: 'Orders', icon: require('../assets/images/Orders.svg') },
          { key: 'more', label: 'More', icon: require('../assets/images/More.svg') },
        ] as const).map(tab => {
          const active = activeTab === tab.key;
          return (
            <Pressable key={tab.key} style={styles.tabItem} onPress={() => setActiveTab(tab.key)}>
              <Image source={tab.icon} style={[styles.tabIcon, { tintColor: active ? BLUE : '#B0B8C4' }]} contentFit="contain" />
              <Text style={[styles.tabLabel, { color: active ? BLUE : '#64748B' }]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const r = 24;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandLogo: { width: 96, height: 26 },

  supportBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'android'
      ? { elevation: 2 }
      : { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } }),
  },
  supportIcon: { width: 22, height: 22, tintColor: DARK },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 0 },
  banner: { width: '100%', height: 170, borderRadius: 18, overflow: 'hidden', marginBottom: 16 },

  card: {
    backgroundColor: CARD,
    borderRadius: r,
    padding: 16,
    marginBottom: 16,
    ...(Platform.OS === 'android'
      ? { elevation: 1 }
      : { shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }),
  },

  /* TEXT: Clash Grotesk regular everywhere, no bold */
  sectionTitle: { fontSize: 18, color: DARK, marginBottom: 12, fontFamily: 'ClashGrotesk' },
  storeLabel: { fontSize: 14, color: DARK, fontFamily: 'ClashGrotesk' },
  allStoresText: { color: '#fff', fontSize: 18, fontFamily: 'ClashGrotesk' },
  seeAllText: { color: '#fff', fontSize: 14, fontFamily: 'ClashGrotesk' },
  orderBrand: { color: DARK, fontSize: 16, fontFamily: 'ClashGrotesk' },
  orderTime: { color: MUTED, fontSize: 12, fontFamily: 'ClashGrotesk' },
  orderAmount: { color: DARK, fontSize: 16, fontFamily: 'ClashGrotesk' },
  orderStatus: { color: SUCCESS, fontSize: 12, fontFamily: 'ClashGrotesk' },
  tabLabel: { fontSize: 12, fontFamily: 'ClashGrotesk' },

  storeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  storeItem: { alignItems: 'center', width: '23%' },
  storeIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: '#F2F4F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  storeIcon: { width: 36, height: 36 },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: {
    backgroundColor: '#0F172B',
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  seeAllIcon: { width: 14, height: 14, tintColor: '#fff' },

  allStoresBtn: {
  backgroundColor: BLUE,
  borderRadius: 16,
  height: 56,
  alignItems: 'center',
  justifyContent: 'center',
},


  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#F7F8FB',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  orderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },

  // avatar now matches light tile container
  orderAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: { width: 22, height: 22 },

  orderRight: { alignItems: 'flex-end' },

  tabbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: CARD,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    ...(Platform.OS === 'android'
      ? { elevation: 10 }
      : { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: -2 } }),
  },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  tabIcon: { width: 24, height: 24, marginBottom: 4 },
});
