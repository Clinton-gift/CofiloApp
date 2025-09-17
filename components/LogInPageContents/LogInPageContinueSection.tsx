import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

const BG = "#F8FAFC";
const DARK = "#0F172B";
const BLUE = "#2B7FFF";

type Props = {
  insets: EdgeInsets;
  kbHeight: number;
  MAX_FORM_WIDTH: number;
  onContinue: () => void;
};

export default function LogInPageContinueSection({
  insets,
  kbHeight,
  MAX_FORM_WIDTH,
  onContinue,
}: Props) {
  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.footerDock,
        { paddingBottom: (kbHeight || insets.bottom) + 12 },
      ]}
    >
      <View style={{ width: "100%", maxWidth: MAX_FORM_WIDTH, alignSelf: "center" }}>
        <TouchableOpacity style={styles.cta} onPress={onContinue} activeOpacity={0.85}>
          <Text style={styles.ctaTxt}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.legal}>
          By continuing, you accept our <Text style={styles.link}>Terms of Services</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerDock: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  cta: {
    height: 48,
    borderRadius: 16,
    backgroundColor: BLUE,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  ctaTxt: {
    color: "#fff",
    fontFamily: "ClashGrotesk",
    fontWeight: "700",
    fontSize: 18,
  },
  legal: {
    marginTop: 12,
    textAlign: "center" as const,
    color: DARK,
    fontFamily: "ClashGrotesk",
    fontSize: 14,
    lineHeight: 18,
  },
  link: { color: BLUE, fontWeight: "700" },
});
