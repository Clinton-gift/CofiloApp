import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BG = '#FFFFFF';
const DARK = '#0F172B';

const DEFAULT_HEADER_H = 80; // default row height
const CLOSE_SIZE = 44;       // circle button size

type Props = {
  onClose?: () => void;
  /** Row height that holds title & close (default 56) */
  headerHeight?: number;
  /** Extra vertical offset for the title (px). Negative moves it up. Default 0 */
  titleTopOffset?: number;
  /** Extra vertical offset for the close button (px). Negative moves it up. Default 0 */
  buttonTopOffset?: number;
};

export default function AmazonPageHeadingSection({
  onClose,
  headerHeight = DEFAULT_HEADER_H,
  titleTopOffset = 0,
  buttonTopOffset = 0,
}: Props) {
  const insets = useSafeAreaInsets();

  const closeTop = (headerHeight - CLOSE_SIZE) / 2 + buttonTopOffset;

  return (
    <View style={[styles.headerBar, { paddingTop: insets.top }]}>
      <View style={[styles.headerInner, { height: headerHeight }]}>
        {/* centered title with adjustable top offset */}
        <Text style={[styles.headerTitle, { marginTop: titleTopOffset }]}>Amazon</Text>

        {/* perfectly centered close button on the left with adjustable top offset */}
        <Pressable
          onPress={onClose}
          style={[styles.closeBtn, { top: closeTop }]}
          android_ripple={{ color: 'rgba(0,0,0,0.06)', borderless: true }}
          accessibilityRole="button"
          accessibilityLabel="Close"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.closeX}>×</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: BG,
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
    fontSize: 22,
    color: DARK,
    fontWeight: '700',
  },
  closeBtn: {
    position: 'absolute',
    left: 16,
    width: CLOSE_SIZE,
    height: CLOSE_SIZE,
    borderRadius: CLOSE_SIZE / 2,
    backgroundColor: '#F2F4F7',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  closeX: { fontSize: 32, lineHeight: 22, color: DARK, marginTop: -2 },
});
