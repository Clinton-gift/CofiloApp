import { Stack } from 'expo-router';
import { Platform, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// Filter noisy RN Web dev warnings only on web
if (Platform.OS === 'web') {
  const origWarn = console.warn.bind(console);
  console.warn = (...args: any[]) => {
    const msg = String(args[0] ?? '');
    if (
      msg.includes('"shadow*" style props are deprecated') ||
      msg.includes('Image: style.resizeMode is deprecated')
    ) {
      return;
    }
    origWarn(...args);
  };
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ClashGrotesk: require('../assets/fonts/ClashGrotesk-Regular.ttf'),
    ClashGroteskBold: require('../assets/fonts/ClashGrotesk-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      // Set global default font for all <Text/>
      // (works on RN 0.79; ensures regular everywhere unless overridden)
      // NOTE: Keep this inside the effect so it only runs after fonts load.
      // @ts-ignore – defaultProps exists on native Text
      Text.defaultProps = Text.defaultProps || {};
      // Merge with any existing default style
      // @ts-ignore
      Text.defaultProps.style = [Text.defaultProps.style, { fontFamily: 'ClashGrotesk' }];

      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
