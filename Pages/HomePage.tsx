// Pages/HomePage.tsx
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import HomePageImageSection from '../components/HomePage/HomePageImageSection';
import HomePageStoreSection from '../components/HomePage/HomePageStoreSection';
import HomePageRecentOrdersSection from '../components/HomePage/HomePageRecentOrdersSection';
import HomePageTabsSection, { TabKey } from '../components/HomePage/HomePageTabsSection';

import StoresPage from '../components/StoresPageContents/StoresPage';
import OrdersPageHeadingSection from '../components/OrdersPageContents/OrdersPageHeadingSection';
import OrdersPageOrdersOptionsSection from '../components/OrdersPageContents/OrdersPageOrdersOptionsSection';

// ✅ NEW: use the wrapper instead of importing More sections here
import MorePage from '../components/MorePageContents/MorePage';

const BG = '#F8FAFC';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const router = useRouter();

  const insets = useSafeAreaInsets();
  const TAB_BASE = 64;
  const tabPaddingBottom = Math.max(insets.bottom, Platform.OS === 'android' ? 8 : 10);
  const tabHeight = TAB_BASE + tabPaddingBottom;
  const contentBottomSpacer = tabPaddingBottom + 8;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* HOME */}
      {activeTab === 'home' && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <HomePageImageSection
            onSupportPress={() => router.push('/support' as const)}
            onBannerPress={() => router.push('/amazon' as const)}
          />
          <HomePageStoreSection
            onAllStores={() => setActiveTab('stores')}
            onSheinPress={() => router.push('/amazon' as const)}
          />
          <HomePageRecentOrdersSection />
          <View style={{ height: contentBottomSpacer }} />
        </ScrollView>
      )}

      {/* STORES */}
      {activeTab === 'stores' && (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <StoresPage />
            <View style={{ height: tabPaddingBottom + 8 }} />
          </ScrollView>
        </View>
      )}

      {/* ORDERS: static header + scrolling list */}
      {activeTab === 'orders' && (
        <View style={{ flex: 1 }}>
          <View style={styles.headerWrapper}>
            <OrdersPageHeadingSection />
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <OrdersPageOrdersOptionsSection bottomSpacer={tabPaddingBottom + 4} />
          </ScrollView>
        </View>
      )}

      {/* MORE: static header + scrolling list via wrapper */}
      {activeTab === 'more' && (
        <MorePage bottomSpacer={tabPaddingBottom + 4} />
      )}

      <HomePageTabsSection
        activeTab={activeTab}
        onChange={setActiveTab}
        height={tabHeight}
        paddingBottom={tabPaddingBottom}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 0 },
  headerWrapper: { paddingHorizontal: 20 },
});
