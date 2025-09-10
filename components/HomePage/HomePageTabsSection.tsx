import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';

const CARD = '#FFFFFF';
const BLUE = '#2B7FFF';

export type TabKey = 'home' | 'stores' | 'orders' | 'more';

type Props = {
  activeTab: TabKey;
  onChange: (t: TabKey) => void;
  height: number;
  paddingBottom: number;
};

export default function HomePageTabsSection({ activeTab, onChange, height, paddingBottom }: Props) {
  return (
    <View style={[styles.tabbar, { height, paddingBottom }]}>
      {([
        { key: 'home',   label: 'Home',   icon: require('../../assets/images/Home.svg') },
        { key: 'stores', label: 'Stores', icon: require('../../assets/images/stores.svg') },
        { key: 'orders', label: 'Orders', icon: require('../../assets/images/Orders.svg') },
        { key: 'more',   label: 'More',   icon: require('../../assets/images/More.svg') },
      ] as const).map(tab => {
        const active = activeTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onChange(tab.key)}
            hitSlop={10}
            android_ripple={{ color: 'rgba(0,0,0,0.06)', borderless: true }}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={tab.label}
          >
            <Image
              source={tab.icon}
              style={[styles.tabIcon, { tintColor: active ? BLUE : '#B0B8C4' }]}
              contentFit="contain"
            />
            <Text style={[styles.tabLabel, { color: active ? BLUE : '#64748B' }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: CARD,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    ...(Platform.OS === 'android'
      ? { elevation: 10 }
      : { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: -2 } }),
  },
  tabItem: { alignItems: 'center', justifyContent: 'center' },
  tabIcon: { width: 24, height: 24, marginBottom: 4 },
  tabLabel: { fontSize: 12, fontFamily: 'ClashGrotesk' },
});
