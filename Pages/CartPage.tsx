import React, { useMemo, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';


import CartPageHeadingSection from '../components/CartPageContents/CartPageHeadingSection';
import CartPageProductDetailsSection from '../components/CartPageContents/CartPageProductDetailsSection';
import CartPagePaySection from '../components/CartPageContents/CartPagePaySection';

const BG = '#F8FAFC';
const WHITE = '#FFFFFF';
const DARK = '#0F172B';

export default function CartPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // quantity & pricing (unchanged behavior)
  const [qty, setQty] = useState(1);
  const UNIT_PRICE = 12000;
  const SERVICE_FEE = 1200;

  const subTotal = useMemo(() => UNIT_PRICE * qty, [qty]);
  const total = useMemo(() => subTotal + SERVICE_FEE, [subTotal]);
  const fcfa = (n: number) => `${n.toLocaleString('fr-FR')} FCFA`;

  const inc = () => setQty(q => q + 1);
  const dec = () => setQty(q => Math.max(1, q - 1));

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <CartPageHeadingSection
        topInset={insets.top}
        onBack={() => router.back()}
      />

      {/* Scrollable content (leave space for bottom panel) */}
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

      {/* Bottom summary + CTA (fixed) */}
      <CartPagePaySection
        bottomInset={insets.bottom}
        serviceFeeLabel={fcfa(SERVICE_FEE)}
        subTotalLabel={fcfa(subTotal)}
        totalLabel={fcfa(total)}
        onCheckout={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
});
