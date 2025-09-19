import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from "react";
import { Keyboard, Platform, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LogInPageContinueSection from "../components/LogInPageContents/LogInPageContinueSection";
import LogInPageTopSection from "../components/LogInPageContents/LogInPageTopSection";

const BG = "#F8FAFC";

export default function LoginPage() {
  // const router = useRouter();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const MAX_FORM_WIDTH = Math.min(560, width - 40);

  const [headerH, setHeaderH] = useState<number>(0);

  // phone + show error only after "Continue"
  const [phone, setPhone] = useState<string>("");
  const [triedContinue, setTriedContinue] = useState<boolean>(false);
  const isPhoneEmpty = useMemo(() => phone.trim() === "", [phone]);
  const showPhoneError = useMemo(
    () => triedContinue && isPhoneEmpty,
    [triedContinue, isPhoneEmpty]
  );

  // keyboard docking for footer
  const [kbHeight, setKbHeight] = useState<number>(0);
  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const s = Keyboard.addListener(showEvt, (e) => setKbHeight(e?.endCoordinates?.height ?? 0));
    const h = Keyboard.addListener(hideEvt, () => setKbHeight(0));
    return () => {
      s.remove();
      h.remove();
    };
  }, []);

  const onContinue = () => {
    setTriedContinue(true);
    if (isPhoneEmpty) return;
    navigation.navigate({ pathname: "/verificationPage", params: { phone } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <LogInPageTopSection
        insets={insets}
        headerH={headerH}
        setHeaderH={setHeaderH}
        MAX_FORM_WIDTH={MAX_FORM_WIDTH}
        kbHeight={kbHeight}
        phone={phone}
        setPhone={setPhone}
        showPhoneError={showPhoneError}
        onBack={() => navigation.goBack()}
      />

      <LogInPageContinueSection
        insets={insets}
        kbHeight={kbHeight}
        MAX_FORM_WIDTH={MAX_FORM_WIDTH}
        onContinue={onContinue}
      />
    </View>
  );
}
