import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const BLUE = "#2B7FFF";
const TEXT_DARK = "#0F172B";

type Props = {
  maxFormWidth: number;
  onContinue?: () => void;
};

export default function SignUpPageContinueSection({
  maxFormWidth,
  onContinue,
}: Props) {
  return (
    <View style={{ width: "100%", maxWidth: maxFormWidth, alignSelf: "center" }}>
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={onContinue}
        activeOpacity={0.85}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        By continuing, you accept our <Text style={styles.link}>Terms of Services</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  continueBtn: {
    backgroundColor: BLUE,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
    height: 48,
  },
  continueText: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: -5,
    color: "#fff",
    fontFamily: "ClashGrotesk",
  },
  footer: {
    fontSize: 13,
    color: TEXT_DARK,
    textAlign: "center",
    marginTop: 15,
    lineHeight: 18,
    paddingHorizontal: 10,
    fontFamily: "ClashGrotesk",
  },
  link: { color: "#2B7FFF", fontWeight: "700" },
});
