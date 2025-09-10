import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import HomePageImageSection from '../components/HomePage/HomePageImageSection';
import HomePageStoreSection from '../components/HomePage/HomePageStoreSection';
import HomePageRecentOrdersSection from '../components/HomePage/HomePageRecentOrdersSection';
import HomePageTabsSection, { TabKey } from '../components/HomePage/HomePageTabsSection';

// NEW mains used for tabs
import StoresPage from '../components/StoresPageContents/StoresPage';
import OrdersPage from '../components/OrdersPageContents/OrdersPage';
import MorePage from '../components/MorePageContents/MorePage';

const BG = '#F8FAFC';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const router = useRouter();

  const insets = useSafeAreaInsets();
  const TAB_BASE = 64;
  const tabPaddingBottom = Math.max(insets.bottom, Platform.OS === 'android' ? 8 : 10);
  const tabHeight = TAB_BASE + tabPaddingBottom;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'home' ? (
          <>
            <HomePageImageSection
              onSupportPress={() => router.push('/support' as const)}
              onBannerPress={() => router.push('/amazon' as const)}
            />
            <HomePageStoreSection
              onAllStores={() => setActiveTab('stores')}
              onSheinPress={() => router.push('/amazon' as const)}
            />
            <HomePageRecentOrdersSection />
          </>
        ) : activeTab === 'stores' ? (
          <StoresPage />
        ) : activeTab === 'orders' ? (
          <OrdersPage />
        ) : (
          <MorePage />
        )}

        {/* keep content above the tab bar */}
        <View style={{ height: tabHeight + 12 }} />
      </ScrollView>

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
});
