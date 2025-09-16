// components/CartPageContents/CartPageHeadingSection.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';

const WHITE = '#FFFFFF';
const DARK = '#0F172B';

// Match Amazon header defaults
const DEFAULT_HEADER_H = 80;
const BACK_SIZE = 44;

type Props = {
  topInset: number;
  onBack?: () => void;
  /** Optional overrides to fine-tune like Amazon header */
  headerHeight?: number;
  titleTopOffset?: number;
  buttonTopOffset?: number;
};

export default function CartPageHeadingSection({
  topInset,
  onBack,
  headerHeight = DEFAULT_HEADER_H,
  titleTopOffset = 0,
  buttonTopOffset = 0,
}: Props) {
  const backTop = (headerHeight - BACK_SIZE) / 2 + buttonTopOffset;

  return (
    <View style={[styles.headerBar, { paddingTop: topInset }]}>
      <View style={[styles.headerInner, { height: headerHeight }]}>
        <Pressable
          onPress={onBack}
          style={[styles.backBtn, { top: backTop }]}
          android_ripple={{ color: 'rgba(0,0,0,0.06)', borderless: true }}
        >
          <Image
            source={require('../../assets/images/backarrow.png')}
            style={{ width: 22, height: 22, tintColor: DARK }}
            contentFit="contain"
          />
        </Pressable>

        <Text style={[styles.headerTitle, { marginTop: titleTopOffset }]}>Cart</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: WHITE,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 10,
    ...(Platform.OS === 'android'
      ? { elevation: 2 }
      : { shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }),
  },
  headerInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'ClashGrotesk',
    fontSize: 22,            // same as Amazon
    color: DARK,
    fontWeight: '700',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    width: BACK_SIZE,        // 44 like Amazon close button
    height: BACK_SIZE,
    borderRadius: BACK_SIZE / 2,
    backgroundColor: '#F2F4F7',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
