// components/MorePageContents/MorePage.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import MorePageHeadingSection from './MorePageHeadingSection';
import MorePageOptionsSection from './MorePageOptionsSection';

type Props = {
  /** Extra bottom space so the list doesn't hide behind the fixed tab bar */
  bottomSpacer: number;
};

export default function MorePage({ bottomSpacer }: Props) {
  return (
    <View style={{ flex: 1 }}>
      {/* Keep the header static and full-bleed (the section handles the bleed) */}
      <View style={styles.headerWrapper}>
        <MorePageHeadingSection />
      </View>

      {/* List scrolls underneath the static header */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <MorePageOptionsSection bottomSpacer={bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Matches the HomePage padding so headings that bleed with marginHorizontal:-20 look correct
  headerWrapper: { paddingHorizontal: 20 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 0 },
});
