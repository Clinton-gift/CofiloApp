import { Pressable, Text, StyleSheet } from 'react-native';

type Props = { onPress?: () => void };

export default function LandingPageButtonSection({ onPress }: Props) {
  return (
    <Pressable style={styles.cta} onPress={onPress}>
      <Text style={styles.ctaText}>Start browsing</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cta: {
    backgroundColor: '#fff',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#0F172B',
  },
});
