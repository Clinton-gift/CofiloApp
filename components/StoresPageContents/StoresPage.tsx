import React from 'react';
import { View, StyleSheet } from 'react-native';

import StoresPageHeadingSection from './StoresPageHeadingSection';
import StoresPageAvailableSection from './StoresPageAvailableSection';
import StoresPageComingSoonSection from './StoresPageComingSoonSection';

const BG = '#F8FAFC';

type Props = { embedded?: boolean };

export default function StoresPage({ embedded = false }: Props) {
  return (
    <View>
      {/* Only render the header when NOT embedded */}
      {!embedded && <StoresPageHeadingSection />}

      {/* full-bleed #F8FAFC content area */}
      <View style={styles.content}>
        <StoresPageAvailableSection />
        <StoresPageComingSoonSection />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // bleed to the edges (parent ScrollView has 20px horizontal padding)
  content: {
    backgroundColor: BG,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },
});
