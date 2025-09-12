import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LanguageHeadingSection from './LanguageHeadingSection';
import PopUpPageLanguageOptionsSection from './PopUpPageLanguageOptionsSection';
import LanguageValidateSection from './LanguageValidateSection';

const CARD = '#FFFFFF';

type Props = {
  visible: boolean;
  onClose: () => void;
  lang: 'fr' | 'en';
  onChangeLang: (v: 'fr' | 'en') => void;
};

export default function PopUpPage({ visible, onClose, lang, onChangeLang }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <LanguageHeadingSection />
          <PopUpPageLanguageOptionsSection lang={lang} onChangeLang={onChangeLang} />
          <LanguageValidateSection onCancel={onClose} onSave={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,43,0.35)', // unchanged
    justifyContent: 'flex-end',
  },
  sheet: {
  backgroundColor: CARD,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  paddingHorizontal: 18,
  paddingTop: 10,
  height: 280, // adjust to your needs
},

});
