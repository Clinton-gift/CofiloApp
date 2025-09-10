import React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';

const CARD = '#FFFFFF';
const DARK = '#0F172B';
const TOP_PAD = 26; // your value

type Props = { onSupportPress?: () => void };

export default function HomePageHeadingSection({ onSupportPress }: Props) {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../assets/images/cofilologo.png')}
        style={styles.brandLogo}
        contentFit="contain"
      />

      <Pressable
        style={styles.supportBtn}
        onPress={onSupportPress}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Open support"
      >
        <Image
          source={require('../../assets/images/support.png')}
          style={styles.supportIcon}
          contentFit="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: TOP_PAD,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // shifted left a bit
  brandLogo: { width: 96, height: 26, marginLeft: -19 },

  // shifted right a bit
  supportBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -19,
    ...(Platform.OS === 'android'
      ? { elevation: 0.5 }
      : { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } }),
  },
  supportIcon: { width: 22, height: 22, tintColor: DARK },
});
