import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';

const DARK = '#0F172B';
const DOT_SELECTED = '#0F172B';
const DOT_UNSELECTED = '#CAD5E2';
const MUTED = '#94A3B8';

type Props = {
  lang: 'fr' | 'en';
  onChangeLang: (v: 'fr' | 'en') => void;
};

export default function PopUpPageLanguageOptionsSection({ lang, onChangeLang }: Props) {
  return (
    <View>
      {/* French */}
      <Pressable
        style={styles.langRow}
        onPress={() => onChangeLang('fr')}
        android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
      >
        <Image source={require('../../../assets/images/FR.png')} style={styles.flag} contentFit="contain" />
        <Text style={styles.langLabel}>Francais</Text>
        <Radio selected={lang === 'fr'} />
      </Pressable>

      {/* English */}
      <Pressable
        style={styles.langRow}
        onPress={() => onChangeLang('en')}
        android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
      >
        <Image source={require('../../../assets/images/EN.png')} style={styles.flag} contentFit="contain" />
        <Text style={styles.langLabel}>English</Text>
        <Radio selected={lang === 'en'} />
      </Pressable>
    </View>
  );
}

function Radio({ selected }: { selected: boolean }) {
  return (
    <View style={styles.radioOuter}>
      <View
        style={[
          styles.radioInner,
          { backgroundColor: selected ? DOT_SELECTED : DOT_UNSELECTED },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  flag: { width: 26, height: 26, marginRight: 12 },
  langLabel: {
    flex: 1,
    fontFamily: 'ClashGrotesk',
    fontSize: 16,
    color: DARK,
    fontWeight: '700',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: MUTED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 18,
    height: 18,
    borderRadius: 50,
    
    
  },
});
