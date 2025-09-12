import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const DARK = '#0F172B';
const BLUE = '#2B7FFF';

type Props = {
  onCancel: () => void;
  onSave: () => void;
};

export default function LanguageValidateSection({ onCancel, onSave }: Props) {
  return (
    <View style={styles.sheetButtons}>
      <Pressable style={[styles.btn, styles.btnGhost]} onPress={onCancel}>
        <Text style={[styles.btnText, { color: DARK }]}>Cancel</Text>
      </Pressable>

      <Pressable style={[styles.btn, styles.btnPrimary]} onPress={onSave}>
        <Text style={[styles.btnText, { color: '#fff' }]}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  sheetButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  btn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhost: { backgroundColor: '#EEF2F7' },
  btnPrimary: { backgroundColor: BLUE },
  btnText: {
    fontFamily: 'ClashGrotesk',
    fontSize: 16,
    fontWeight: '700',
  },
});
