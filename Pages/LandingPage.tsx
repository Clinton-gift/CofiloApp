import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

import LandingPageImageSection from '../components/LandingPage/LandingPageImageSection';
import LandingPageHeadingSection from '../components/LandingPage/LandingPageHeadingSection';
import LandingPageButtonSection from '../components/LandingPage/LandingPageButtonSection';

const BLUE = '#2B7FFF';

export default function LandingPage() {
  // const router = useRouter();
  const navigation = useNavigation<any>();
  const goToSecond = () => navigation.navigate("home");

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
