import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrdersPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contents for Orders</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 40, alignItems: 'center' },
  text: { fontFamily: 'ClashGrotesk', fontSize: 18, color: '#0F172B' },
});
