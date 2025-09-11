import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import HomePageImageSection from '../components/HomePage/HomePageImageSection';
import HomePageStoreSection from '../components/HomePage/HomePageStoreSection';
import HomePageRecentOrdersSection from '../components/HomePage/HomePageRecentOrdersSection';
import HomePageTabsSection, { TabKey } from '../components/HomePage/HomePageTabsSection';

// Stores & More mains (unchanged)
import StoresPage from '../components/StoresPageContents/StoresPage';
import MorePage from '../components/MorePageContents/MorePage';

// ⬇️ Use Orders subcomponents directly to keep the header static
import OrdersPageHeadingSection from '../components/OrdersPageContents/OrdersPageHeadingSection';
import OrdersPageOrdersOptionsSection from '../components/OrdersPageContents/OrdersPageOrdersOptionsSection';

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

      {/* HOME: uses the outer ScrollView exactly like before */}
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

          {/* spacer ONLY for Home so content stays above the fixed tab bar */}
          <View style={{ height: contentBottomSpacer }} />
        </ScrollView>
      )}

      {/* STORES: render full-height content without the outer ScrollView */}
      {activeTab === 'stores' && (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <StoresPage />
            <View style={{ height: tabPaddingBottom + 8 }} />
          </ScrollView>
        </View>
      )}

      {/* ORDERS: STATIC header + its own scroll underneath */}
      {activeTab === 'orders' && (
        <View style={{ flex: 1 }}>
          {/* fixed header (keeps the exact bleed/spacing via 20px wrapper) */}
          <View style={styles.headerWrapper}>
            <OrdersPageHeadingSection />
          </View>

          {/* list scrolls under the static header */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <OrdersPageOrdersOptionsSection bottomSpacer={tabPaddingBottom + 4} />
          </ScrollView>
        </View>
      )}

      {/* MORE: similar to stores for now */}
      {activeTab === 'more' && (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <MorePage />
            <View style={{ height: tabPaddingBottom + 8 }} />
          </ScrollView>
        </View>
      )}

      {/* Bottom Tabs */}
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
  // keep 20px so headers that use marginHorizontal:-20 can bleed to edges
  scrollContent: { paddingHorizontal: 20, paddingBottom: 0 },
  // wrapper to preserve header bleed math when header is outside a ScrollView
  headerWrapper: { paddingHorizontal: 20 },
});
