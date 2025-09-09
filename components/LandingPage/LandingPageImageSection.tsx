import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

export default function LandingPageImageSection() {
  return (
    <Image
      source={require('../../assets/images/Gift.png')}
      style={styles.gift}
      contentFit="contain"
    />
  );
}

const styles = StyleSheet.create({
  gift: { width: 260, height: 360 },
});
