import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import PopUpPage from './PopUpPage/PopUpPage';

const BG = '#F8FAFC';
const CARD = '#FFFFFF';
const DARK = '#0F172B';
const RED = '#EF4444';

type Props = { bottomSpacer?: number };

export default function MorePageOptionsSection({ bottomSpacer = 12 }: Props) {
  const router = useRouter();
  const [showLang, setShowLang] = useState(false);
  const [lang, setLang] = useState<'fr' | 'en'>('en');

  return (
    <View style={styles.container}>
      <Row
        leftIcon={require('../../assets/images/Profile.svg')}
        label="Profile"
        onPress={() => router.push('/profile' as const)}
      />

      <Row
        leftIcon={require('../../assets/images/Profile.svg')}
        label="Transactions"
        onPress={() => router.push('/transactions' as const)}
      />

      <Row
        leftIcon={require('../../assets/images/Settings.svg')}
        label="Change language"
        onPress={() => setShowLang(true)}
      />

      <Row
        leftIcon={require('../../assets/images/Settings.svg')}
        label="Settings"
        onPress={() => router.push('/settings' as const)}
      />

      {/* Log out – red icon, label and chevron; no action */}
      <Row
        leftIcon={require('../../assets/images/Settings.svg')}
        label="Log out"
        labelColor={RED}
        chevronTint={RED}
        leftTint={RED}
        onPress={() => {}}
      />

      <View style={{ height: bottomSpacer }} />

      {/* Language popup */}
      <PopUpPage
        visible={showLang}
        onClose={() => setShowLang(false)}
        lang={lang}
        onChangeLang={setLang}
      />
    </View>
  );
}

/* ---------- Row ---------- */

function Row({
  leftIcon,
  label,
  onPress,
  labelColor = DARK,
  chevronTint = '#9AA3AE',
  leftTint = DARK,
}: {
  leftIcon: any;
  label: string;
  onPress?: () => void;
  labelColor?: string;
  chevronTint?: string;
  leftTint?: string;
}) {
  return (
    <Pressable style={styles.row} onPress={onPress} android_ripple={{ color: 'rgba(0,0,0,0.05)' }}>
      <View style={styles.rowLeft}>
        <Image
          source={leftIcon}
          style={[styles.leftIcon, { tintColor: leftTint }]}
          contentFit="contain"
        />
        <Text style={[styles.rowLabel, { color: labelColor }]}>{label}</Text>
      </View>
      <Image
        source={require('../../assets/images/LeftChevron.svg')}
        style={[styles.chevron, { tintColor: chevronTint }]}
        contentFit="contain"
      />
    </Pressable>
  );
}

/* ---------- Styles ---------- */

const R = 22;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },
  row: {
    backgroundColor: CARD,
    borderRadius: R,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...(Platform.OS === 'android'
      ? { elevation: 1 }
      : {
          shadowColor: '#000',
          shadowOpacity: 0.03,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
        }),
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  leftIcon: { width: 22, height: 22 }, // <-- no hardcoded tint here
  rowLabel: { fontFamily: 'ClashGrotesk', fontSize: 16, fontWeight: '700' },
  chevron: { width: 16, height: 16 },
});
