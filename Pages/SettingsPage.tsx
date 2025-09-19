import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Keyboard, Platform, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SettingsOptionsSection from "../components/SettingsPageContents/SettingsOptionsSection";
import SettingsPageHeadingSection from "../components/SettingsPageContents/SettingsPageHeadingSection";

const BG = "#F8FAFC";

export default function SettingsPage() {
  // const router = useRouter();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const MAX_FORM_WIDTH = Math.min(560, width - 40);

  const [kbHeight, setKbHeight] = useState(0);
  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const s = Keyboard.addListener(showEvt, (e) => setKbHeight(e?.endCoordinates?.height ?? 0));
    const h = Keyboard.addListener(hideEvt, () => setKbHeight(0));
    return () => { s.remove(); h.remove(); };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <SettingsPageHeadingSection title="Settings" onBack={() => navigation.goBack()} />

      <SettingsOptionsSection
        MAX_FORM_WIDTH={MAX_FORM_WIDTH}
        insets={insets}
        kbHeight={kbHeight}
      />
    </View>
  );
}
