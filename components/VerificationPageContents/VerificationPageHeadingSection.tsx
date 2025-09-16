import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Image } from "expo-image";

const BG = "#F8FAFC";
const WHITE = "#FFFFFF";
const DARK = "#0F172B";
const BORDER = "#E5E7EB";
const BACK_SIZE = 56;

type Props = {
  topInset: number;
  onBack: () => void;
  onMeasure: (h: number) => void; // report height so content can pad under it
};

export default function VerificationPageHeadingSection({ topInset, onBack, onMeasure }: Props) {
  return (
    <View
      style={[styles.header, { paddingTop: topInset + 16, paddingBottom: 8 }]}
      onLayout={(e) => onMeasure(e.nativeEvent.layout.height)}
    >
      <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
        <Image
          source={require("../../assets/images/backarrow.png")}
          style={{ width: 22, height: 22, tintColor: DARK }}
          contentFit="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    backgroundColor: BG,
    paddingHorizontal: 20,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...(Platform.OS === "android"
      ? { elevation: 2 }
      : { shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }),
    zIndex: 10,
  },
  backBtn: {
    width: BACK_SIZE,
    height: BACK_SIZE,
    borderRadius: BACK_SIZE / 2,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
});
