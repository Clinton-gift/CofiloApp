import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { Router } from "expo-router";
import { EdgeInsets } from "react-native-safe-area-context";

type Props = {
  insets: EdgeInsets;
  router: Router;
  phoneDisplay: string;
};

const BG = "#F8FAFC";
const WHITE = "#FFFFFF";
const DARK = "#0F172B";
const BORDER = "#FFFFFF";
const BACK_SIZE = 56;

export default function VerificationPageHeadingSection({ insets, router, phoneDisplay }: Props) {
  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top + 16, paddingBottom: 8 }]}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={() => router.back()}>
          <Image source={require("../../assets/images/backarrow.png")} style={{ width: 22, height: 22, tintColor: DARK }} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>
        We’ve sent a 6-digit code to{"\n"}
        <Text style={styles.titlePhone}>{phoneDisplay}</Text>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, backgroundColor: BG },
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
  title: {
    marginTop: 8,
    fontFamily: "ClashGrotesk",
    fontSize: 28,
    fontWeight: "800",
    color: DARK,
    lineHeight: 34,
    paddingHorizontal: 20,
  },
  titlePhone: { fontFamily: "ClashGrotesk", fontWeight: "700", color: DARK },
});
