import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Platform,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import VerificationPageHeadingSection from "../components/VerificationPageContents/VerificationPageHeadingSection";
import VerificationPageCodeSection from "../components/VerificationPageContents/VerificationPageCodeSection";
import VerificationPageVerifySection from "../components/VerificationPageContents/VerificationPageVerifySection ";

const BG = "#F8FAFC";
const WHITE = "#FFFFFF";
const DARK = "#0F172B";
const BLUE = "#2B7FFF";
const PLACEHOLDER = "#A3AEC2";
const BORDER = "#E5E7EB";
const RED = "#EF4444";

const CELL_SIDE = 56;
const CELL_R = 16;
const START_SECONDS = 30;

export default function VerificationPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { phone: phoneParam } = useLocalSearchParams<{ phone?: string }>();

  // Phone display
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

  // OTP
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const [showError, setShowError] = useState(false);

  // Countdown
  const [seconds, setSeconds] = useState(START_SECONDS);

  // Keyboard docking for footer
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

  // OTP helpers (same behavior)
  const setDigit = (idx: number, val: string) => {
    const only = val.replace(/\D/g, "");
    setCode((prev) => {
      const next = [...prev];
      if (only.length <= 1) {
        next[idx] = only;
      } else {
        const chars = only.split("");
        for (let i = 0; i < chars.length && idx + i < 6; i++) {
          next[idx + i] = chars[i];
        }
      }
      return next;
    });
    if (only.length > 0) {
      const nextIndex = Math.min(5, idx + (only.length > 1 ? only.length : 1));
      inputsRef.current[nextIndex]?.focus();
    }
  };

  const onKeyPress = (idx: number, key: string) => {
    if (key === "Backspace") {
      setCode((prev) => {
        const next = [...prev];
        if (next[idx]) { next[idx] = ""; return next; }
        const prevIndex = Math.max(0, idx - 1);
        inputsRef.current[prevIndex]?.focus();
        next[prevIndex] = "";
        return next;
      });
    }
  };

  const codeStr = code.join("");
  const verifyDisabled = codeStr.length !== 6;

  const onVerify = () => {
    if (verifyDisabled) { setShowError(true); return; }
    router.back(); // stub
  };

  const resend = () => {
    if (!canResend) return;
    setSeconds(START_SECONDS);
    setCode(["", "", "", "", "", ""]);
    setShowError(false);
    inputsRef.current[0]?.focus();
  };

  // layout helpers (unchanged)
  const [headerH, setHeaderH] = useState(0);
  const contentBottomPad = kbHeight ? 16 : insets.bottom + 120;
  const footerBottom = (kbHeight || insets.bottom) + 12;

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* 1) Heading section (fixed back btn) */}
      <VerificationPageHeadingSection
        topInset={insets.top}
        onBack={() => router.back()}
        onMeasure={setHeaderH}
      />

      {/* Title stays in scroll like before (no visual changes) */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: headerH + 6,
          paddingBottom: contentBottomPad,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          We’ve sent a 6-digit code to{"\n"}
          <Text style={styles.titlePhone}>{phoneDisplay}</Text>
        </Text>

        {/* 2) Code section (cells + countdown) */}
        <VerificationPageCodeSection
          code={code}
          showError={showError}
          seconds={seconds}
          inputsRef={inputsRef}
          onChangeDigit={setDigit}
          onKeyBackspace={onKeyPress}
        />
      </ScrollView>

      {/* 3) Verify section (footer docked above keyboard) */}
      <VerificationPageVerifySection
        bottomPad={footerBottom}
        canResend={canResend}
        onResend={resend}
        onVerify={onVerify}
        verifyDisabled={verifyDisabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    fontFamily: "ClashGrotesk",
    fontSize: 28,
    fontWeight: "800",
    color: DARK,
    lineHeight: 34,
  },
  titlePhone: {
    fontFamily: "ClashGrotesk",
    fontWeight: "800",
    color: DARK,
  },
});
