import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

export default function LandingPageHeadingSection() {
  return (
    <View style={styles.wrapper}>
      {/* If your file isn't .png, change the extension below to match */}
      <Image
        source={require('../../assets/images/cofilologo.png')}
        style={styles.brandLogo}
        contentFit="contain"
      />

      <Text style={styles.paragraph}>
        Shop on Shein, Amazon, AliExpress and more. Pay with mobile money,
        your orders are delivered anywhere in Africa safe and easy.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', gap: 14 },
  // Keep same spot, ensure visibility. Tint helps if the asset is single-color.
  brandLogo: { width: 160, height: 40, tintColor: '#fff' },
  paragraph: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    marginTop: 4,
    paddingHorizontal: 6,
  },
});
