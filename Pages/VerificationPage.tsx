import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Platform, Keyboard, ScrollView, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import VerificationPageHeadingSection from "../components/VerificationPage/VerificationPageHeadingSection";
import VerificationPageCodeSection from "../components/VerificationPage/VerificationPageCodeSection";
import VerificationPageVerifySection from "../components/VerificationPage/VerificationPageVerifySection ";

const BG = "#F8FAFC";
const START_SECONDS = 30;

export default function VerificationPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { phone: phoneParam } = useLocalSearchParams<{ phone?: string }>();

  const phoneDisplay = useMemo(() => {
    const digits = (phoneParam ?? "690909090").replace(/\D/g, "");
    const parts: string[] = [];
    if (digits.length > 0) parts.push(digits.slice(0, 1));
    if (digits.length > 1) parts.push(digits.slice(1, 3));
    if (digits.length > 3) parts.push(digits.slice(3, 5));
    if (digits.length > 5) parts.push(digits.slice(5, 7));
    if (digits.length > 7) parts.push(digits.slice(7, 9));
    return `+237 ${parts.join(" ")}`;
  }, [phoneParam]);

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [showError, setShowError] = useState(false);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const [seconds, setSeconds] = useState(START_SECONDS);
  const [kbHeight, setKbHeight] = useState(0);

  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const s = Keyboard.addListener(showEvt, (e) => setKbHeight(e?.endCoordinates?.height ?? 0));
    const h = Keyboard.addListener(hideEvt, () => setKbHeight(0));
    return () => { s.remove(); h.remove(); };
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const canResend = seconds <= 0;
  const formatted = `00:${String(Math.max(0, seconds)).padStart(2, "0")}`;

  const codeStr = code.join("");
  const verifyDisabled = codeStr.length !== 6;

  const onVerify = () => {
    if (verifyDisabled) {
      setShowError(true);
      return;
    }

    // Navigate to CartPage and trigger popup
    router.push({
  pathname: "/cart",
  params: { showPopup: "true" },
});

  };

  const resend = () => {
    if (!canResend) return;
    setSeconds(START_SECONDS);
    setCode(["", "", "", "", "", ""]);
    setShowError(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <VerificationPageHeadingSection
        insets={insets}
        router={router}
        phoneDisplay={phoneDisplay}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 6, paddingBottom: 160 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <VerificationPageCodeSection
          code={code}
          setCode={setCode}
          showError={showError}
          inputsRef={inputsRef}
          formatted={formatted}
        />
      </ScrollView>

      <VerificationPageVerifySection
        kbHeight={kbHeight}
        insets={insets}
        canResend={canResend}
        resend={resend}
        verifyDisabled={verifyDisabled}
        onVerify={onVerify}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
