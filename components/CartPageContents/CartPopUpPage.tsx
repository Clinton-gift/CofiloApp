import React from 'react';
import { Modal, View, StyleSheet, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PopUpHeadingSection from './PopUpHeadingSection';
import CartUpPageAccountOptionsSection from './CartUpPageAccountOptionsSection';

const SHEET_BG = '#FFFFFF';
const BACKDROP = 'rgba(15,23,43,0.45)';

type Props = {
  visible: boolean;
  onClose: () => void;
  onProceed?: () => void;
  onLogin?: () => void;
};

export default function CartPopUpPage({
  visible,
  onClose,
  onProceed,
  onLogin,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* PopUpPageTransparentSection (backdrop) */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Bottom sheet */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        {/* PopUpHeadingSection */}
        <PopUpHeadingSection
          title="Sign in to pay"
          description="Log in or create your account to complete your order and get delivery updates."
        />

        {/* CartUpPageAccountOptionsSection */}
        <CartUpPageAccountOptionsSection
          onCreateAccount={onProceed}
          onLogin={onProceed}
        />
      </View>
    </Modal>
  );
}

const R = 28;

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: BACKDROP },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: SHEET_BG,
    borderTopLeftRadius: R,
    borderTopRightRadius: R,
    paddingHorizontal: 18,
    paddingTop: 10,
    ...(Platform.OS === 'android'
      ? { elevation: 12 }
      : {
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        }),
  },
});
