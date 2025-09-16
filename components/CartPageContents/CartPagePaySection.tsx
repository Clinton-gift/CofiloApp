import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import CartPopUpPage from './CartPopUpPage';

const WHITE = '#F8FAFC';
const DARK = '#0F172B';
const MUTED = '#ae9a9aff';
const BLUE = '#2B7FFF';

type Props = {
  bottomInset: number;
  serviceFeeLabel: string;
  subTotalLabel: string;
  totalLabel: string;
  onCheckout?: () => void;
};

const SPACING = 12;

export default function CartPagePaySection({
  bottomInset,
  serviceFeeLabel,
  subTotalLabel,
  totalLabel,
  onCheckout,
}: Props) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <View style={[styles.bottomWrap, { paddingBottom: bottomInset + 16 }]}>
      <View style={styles.summary}>
        <Row label="Service fee" value={serviceFeeLabel} muted />
        <Row label="Sub total" value={subTotalLabel} muted />
        <Row label="Total to pay" value={totalLabel} bold />
      </View>

      <Pressable
        style={styles.cta}
        android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
        onPress={() => setShowPopup(true)}
      >
        <Text style={styles.ctaTxt}>Proceed to checkout</Text>
      </Pressable>

      {/* Popup */}
      <CartPopUpPage
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        onProceed={() => {
          setShowPopup(false);
          onCheckout?.();
        }}
        onLogin={() => setShowPopup(false)}
      />
    </View>
  );
}

function Row({ label, value, muted, bold }: { label: string; value: string; muted?: boolean; bold?: boolean }) {
  return (
    <View style={styles.sumRow}>
      <Text style={[styles.sumLabel, muted && { color: '#C6CED8' }, bold && { color: DARK, fontWeight: '700' }]}>
        {label}
      </Text>
      <Text style={[styles.sumValue, muted && { color: '#314158' }, bold && { color: DARK, fontWeight: '700' }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: SPACING,
    backgroundColor: '#FFFFFF',
  },
  summary: {
    backgroundColor: WHITE,
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: SPACING,
  },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  sumLabel: { fontFamily: 'ClashGrotesk', fontSize: 16, color: MUTED },
  sumValue: { fontFamily: 'ClashGrotesk', fontSize: 16, color: MUTED },
  cta: { backgroundColor: BLUE, borderRadius: 22, height: 56, alignItems: 'center', justifyContent: 'center' },
  ctaTxt: { color: '#fff', fontFamily: 'ClashGrotesk', fontSize: 18, fontWeight: '700' },
});
