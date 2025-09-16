import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";

const BG = "#F8FAFC";
const BLUE = "#2B7FFF";
const DARK = "#0F172B";
const PLACEHOLDER = "#A3AEC2";

type Props = {
  bottomPad: number;           // computed bottom padding (keyboard or safe-area)
  canResend: boolean;
  verifyDisabled: boolean;
  onResend: () => void;
  onVerify: () => void;
};

export default function VerificationPageVerifySection({
  bottomPad,
  canResend,
  verifyDisabled,
  onResend,
  onVerify,
}: Props) {
  return (
    <View pointerEvents="box-none" style={[styles.footerDock, { paddingBottom: bottomPad }]}>
      <Pressable
        hitSlop={6}
        onPress={canResend ? onResend : undefined}
        android_ripple={{ color: "rgba(0,0,0,0.06)", borderless: true }}
      >
        <Text style={[styles.resend, canResend ? styles.link : styles.disabled]}>Resend the code</Text>
      </Pressable>

      <TouchableOpacity
        style={[styles.verifyBtn, verifyDisabled && { opacity: 0.6 }]}
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
    left: 0, right: 0, bottom: 0,
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  resend: {
    textAlign: "center",
    fontFamily: "ClashGrotesk",
    fontSize: 16,
    marginBottom: 12,
  },
  disabled: { color: PLACEHOLDER },
  link: { color: BLUE, fontWeight: "700" },
  verifyBtn: {
    height: 56,
    borderRadius: 22,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyTxt: {
    color: "#fff",
    fontFamily: "ClashGrotesk",
    fontWeight: "700",
    fontSize: 18,
  },
});
