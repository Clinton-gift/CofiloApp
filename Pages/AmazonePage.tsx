import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import AmazonPageHeadingSection from '../components/AmazonPageContents/AmazonPageHeadingSection';
import AmazonPageProductsSection from '../components/AmazonPageContents/AmazonPageProductsSection';
import AmazonPageTabsSection, { Tool } from '../components/AmazonPageContents/AmazonPageTabsSection';

const BG = '#FFFFFF';

export default function AmazonePage() {
  // const router = useRouter();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [active, setActive] = useState<Tool>('home');
  const [view, setView] = useState<'listing' | 'added'>('listing');
  const [cartCount, setCartCount] = useState<number>(0);

  const TAB_BASE = 72;
  const tabPaddingBottom = Math.max(insets.bottom, 10);
  const tabHeight = TAB_BASE + tabPaddingBottom;

  const resetToInitial = () => {
    setView('listing');
    setCartCount(0);
    setActive('home');
  };

  const onPressImage = () => {
    if (view === 'listing') {
      setView('added');
      setCartCount(1);
      setActive('back');
    }
  };

  const onPressTool = (key: Tool) => {
    if (key === 'forward') return;               // forward always disabled

    if (view === 'added' && (key === 'home' || key === 'back')) {
      resetToInitial();
      return;
    }

    if (key === 'cart') {
      if (cartCount > 0) {
        setActive('cart');
        navigation.navigate('cart' as const);
      }
      return;
    }

    setActive(key);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AmazonPageHeadingSection onClose={() => navigation.goBack()} />

      <AmazonPageProductsSection
        view={view}
        onPressImage={onPressImage}
        bottomOffset={tabHeight}
      />

      <AmazonPageTabsSection
        active={active}
        cartCount={cartCount}
        height={tabHeight}
        paddingBottom={tabPaddingBottom}
        onPress={onPressTool}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
});
