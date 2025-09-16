import React from "react";
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

type Props = {
  kbHeight: number;
  insets: EdgeInsets;
  canResend: boolean;
  resend: () => void;
  verifyDisabled: boolean;
  onVerify: () => void;
};

const BG = "#F8FAFC";
const BLUE = "#2B7FFF";
const PLACEHOLDER = "#A3AEC2";

export default function VerificationPageVerifySection({ kbHeight, insets, canResend, resend, verifyDisabled, onVerify }: Props) {
  return (
    <View
      pointerEvents="box-none"
      style={[styles.footerDock, { paddingBottom: (kbHeight || insets.bottom) + 52 }]}
    >
      <Pressable hitSlop={6} onPress={canResend ? resend : undefined}>
        <Text style={[styles.resendBottom, canResend ? styles.link : styles.resendDisabled]}>
          Resend the code
        </Text>
      </Pressable>

      <TouchableOpacity
        style={[styles.verifyBtn, verifyDisabled && { opacity: 1 }]}
        onPress={onVerify}
        activeOpacity={0.85}
      >
        <Text style={styles.verifyTxt}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerDock: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  resendBottom: { textAlign: "center", fontFamily: "ClashGrotesk", fontSize: 16, marginBottom: 12 },
  resendDisabled: { color: PLACEHOLDER },
  link: { color: BLUE, fontWeight: "700" },
  verifyBtn: {
    height: 56,
    borderRadius: 22,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyTxt: { color: "#fff", fontFamily: "ClashGrotesk", fontWeight: "700", fontSize: 18 },
});
