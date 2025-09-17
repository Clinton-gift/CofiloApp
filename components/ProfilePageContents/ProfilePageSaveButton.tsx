import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

const BG = "#F8FAFC";
const BLUE = "#2B7FFF";
const DARK = "#0F172B";

type Props = {
  insets: EdgeInsets;
  kbHeight: number;
  MAX_FORM_WIDTH: number;
  disabled: boolean;
  onSave: () => void;
};

export default function ProfilePageSaveButton({
  insets, kbHeight, MAX_FORM_WIDTH, disabled, onSave,
}: Props) {
  return (
    <View
      pointerEvents="box-none"
      style={[styles.footerDock, { paddingBottom: (kbHeight || insets.bottom) + 12 }]}
    >
      <View style={{ width: "100%", maxWidth: MAX_FORM_WIDTH, alignSelf: "center" }}>
        <TouchableOpacity
          style={[styles.cta, disabled && { opacity: 0.5 }]}
          onPress={onSave}
          disabled={disabled}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaTxt}>Save</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 12,
  },
  cta: {
    height: 54,
    borderRadius: 20,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaTxt: {
    color: "#fff",
    fontFamily: "ClashGrotesk",
    fontWeight: "700",
    fontSize: 18,
  },
});
