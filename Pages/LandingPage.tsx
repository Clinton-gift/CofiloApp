import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import LandingPageImageSection from '../components/LandingPage/LandingPageImageSection';
import LandingPageHeadingSection from '../components/LandingPage/LandingPageHeadingSection';
import LandingPageButtonSection from '../components/LandingPage/LandingPageButtonSection';

const BLUE = '#2B7FFF';

export default function LandingPage() {
  const router = useRouter();
  const goToSecond = () => router.push('/home' as const);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.center}>
        <LandingPageImageSection />
        <LandingPageHeadingSection />
      </View>

      <LandingPageButtonSection onPress={goToSecond} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLUE, paddingHorizontal: 20, paddingBottom: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 },
});
