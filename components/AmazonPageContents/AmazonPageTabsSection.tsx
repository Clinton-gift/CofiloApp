import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';

const BG = '#FFFFFF';
const DARK = '#0F172B';
const MUTED = '#9AA3AE';
const DISABLED = '#CAD5E2';
const BADGE_RED = '#EF4444';

export type Tool = 'home' | 'back' | 'forward' | 'cart';

type Props = {
  active: Tool;
  cartCount: number;
  height: number;
  paddingBottom: number;
  onPress: (key: Tool) => void;
};

export default function AmazonPageTabsSection({
  active,
  cartCount,
  height,
  paddingBottom,
  onPress,
}: Props) {
  const { width: screenW } = useWindowDimensions();

  // Responsive sizes by screen width
  const sizes = useMemo(() => {
    // Tune these breakpoints as you like
    if (screenW < 340) {
      return { icon: 20, label: 12, gapMb: 4 };
    }
    if (screenW < 420) {
      return { icon: 24, label: 13, gapMb: 6 };
    }
    if (screenW < 600) {
      return { icon: 26, label: 14, gapMb: 6 };
    }
    return { icon: 28, label: 15, gapMb: 6 };
  }, [screenW]);

  // Badge scales with icon size
  const badge = useMemo(() => {
    const size = Math.max(14, Math.round(sizes.icon * 0.64)); // min 14px
    const right = -Math.round(sizes.icon * 0.35);
    const top = -Math.round(sizes.icon * 0.28);
    return { size, right, top, radius: Math.round(size / 2) };
  }, [sizes.icon]);

  return (
    <View style={[styles.toolsBar, { height, paddingBottom }]}>
      {(
        [
          { key: 'home', label: 'Store home', icon: require('../../assets/images/StoreHome.svg') },
          { key: 'back', label: 'Backward', icon: require('../../assets/images/Backward.svg') },
          { key: 'forward', label: 'Forward', icon: require('../../assets/images/Forward.svg') },
          { key: 'cart', label: 'Cart', icon: require('../../assets/images/Cart.svg') },
        ] as const
      ).map(item => {
        const disabled = item.key === 'forward';
        const isActive = !disabled && active === item.key;

        return (
          <Pressable
            key={item.key}
            style={styles.toolItem}
            onPress={() => onPress(item.key)}
            disabled={disabled}
            android_ripple={
              disabled ? undefined : { color: 'rgba(0,0,0,0.06)', borderless: true }
            }
            accessibilityRole="button"
            accessibilityState={{ disabled, selected: isActive }}
            hitSlop={{ top: 6, bottom: 6, left: 8, right: 8 }}
          >
            <View style={styles.iconWrap}>
              <Image
                source={item.icon}
                style={[
                  styles.toolIcon,
                  {
                    width: sizes.icon,
                    height: sizes.icon,
                    marginBottom: sizes.gapMb,
                    tintColor: disabled ? DISABLED : isActive ? DARK : DISABLED,
                  },
                ]}
                contentFit="contain"
              />
              {item.key === 'cart' && cartCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: badge.right,
                    top: badge.top,
                    minWidth: badge.size,
                    height: badge.size,
                    borderRadius: badge.radius,
                    backgroundColor: BADGE_RED,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: Math.round(badge.size * 0.2),
                  }}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      { lineHeight: badge.size - 2, fontSize: Math.max(9, Math.round(badge.size * 0.62)) },
                    ]}
                  >
                    {cartCount}
                  </Text>
                </View>
              )}
            </View>

            <Text
              style={[
                styles.toolLabel,
                {
                  fontSize: sizes.label,
                  color: disabled ? MUTED : isActive ? DARK : MUTED,
                },
              ]}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  toolsBar: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    backgroundColor: BG,
    borderTopColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  toolItem: { alignItems: 'center', justifyContent: 'center', flexShrink: 1 },
  iconWrap: { position: 'relative' },
  toolIcon: { marginBottom: 6 }, // width/height are responsive
  toolLabel: { fontFamily: 'ClashGrotesk', fontWeight: '600' },

  badgeText: {
    color: '#fff',
    fontFamily: 'ClashGrotesk',
    fontWeight: '700',
    textAlign: 'center',
    includeFontPadding: false,
  },
});
