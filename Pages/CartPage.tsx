import React, { useMemo, useState, useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import CartPageHeadingSection from '../components/CartPageContents/CartPageHeadingSection';
import CartPageProductDetailsSection from '../components/CartPageContents/CartPageProductDetailsSection';
import CartPagePaySection from '../components/CartPageContents/CartPagePaySection';
import CartCheckOutPopUpPage from '../components/CartPageContents/CartCheckOutPopUpPage';
import { useNavigation } from '@react-navigation/native';

const BG = '#F8FAFC';

export default function CartPage() {
  // const router = useRouter();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { showPopup } = useLocalSearchParams<{ showPopup?: string }>();

  const [qty, setQty] = useState(1);
  const UNIT_PRICE = 12000;
  const SERVICE_FEE = 1200;

  const subTotal = useMemo(() => UNIT_PRICE * qty, [qty]);
  const total = useMemo(() => subTotal + SERVICE_FEE, [subTotal]);
  const fcfa = (n: number) => `${n.toLocaleString('fr-FR')} FCFA`;

  const inc = () => setQty(q => q + 1);
  const dec = () => setQty(q => Math.max(1, q - 1));

  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    if (showPopup === 'true') {
      setPopupVisible(true);
    }
  }, [showPopup]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <CartPageHeadingSection topInset={insets.top} />


      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: insets.bottom + 220 }}
        showsVerticalScrollIndicator={false}
      >
        <CartPageProductDetailsSection
          title="Herdio 4 Pouces 200 Watts 2…"
          chipColor="Grey"
          chipSize="L"
          qty={qty}
          onInc={inc}
          onDec={dec}
          priceLabel={fcfa(UNIT_PRICE * qty)}
        />
      </ScrollView>

      {/* Bottom summary + CTA */}
      <CartPagePaySection
        bottomInset={insets.bottom}
        serviceFeeLabel={fcfa(SERVICE_FEE)}
        subTotalLabel={fcfa(subTotal)}
        totalLabel={fcfa(total)}
        onCheckout={() => {}}
      />

      {/* Checkout popup */}
      <CartCheckOutPopUpPage
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        totalLabel={fcfa(total)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
});
