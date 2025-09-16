import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DARK = '#0F172B';
const DESC = '#667085';

type Props = {
  title: string;
  description: string;
};

export default function PopUpHeadingSection({ title, description }: Props) {
  return (
    <View>
      <View style={styles.handleWrap}>
        <View style={styles.handle} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  handleWrap: { alignItems: 'center', marginBottom: 8 },
  handle: { width: 56, height: 6, borderRadius: 3, backgroundColor: '#E6E9EE' },
  title: {
    textAlign: 'center',
    fontFamily: 'ClashGrotesk',
    fontWeight: '700',
    fontSize: 22,
    color: DARK,
    marginTop: 8,
  },
  desc: {
    textAlign: 'center',
    fontFamily: 'ClashGrotesk',
    fontSize: 16,
    color: DESC,
    lineHeight: 22,
    marginTop: 10,
    marginHorizontal: 8,
  },
});
