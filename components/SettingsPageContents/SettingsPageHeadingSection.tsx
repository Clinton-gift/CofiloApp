import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

const WHITE = "#FFFFFF";
const DARK = "#0F172B";
const HEADER_H = 80;
const BACK_SIZE = 44;

type Props = {
  title?: string;
  onBack?: () => void;
};

export default function SettingsPageHeadingSection({ title = "Settings", onBack }: Props) {
  const insets = useSafeAreaInsets();
  const backTop = (HEADER_H - BACK_SIZE) / 2;

  return (
    <View style={[styles.headerBar, { paddingTop: insets.top }]}>
      <View style={[styles.headerInner, { height: HEADER_H }]}>
        <Text style={styles.headerTitle}>{title}</Text>

        <Pressable
          onPress={onBack}
          style={[styles.backBtn, { top: backTop }]}
          android_ripple={{ color: "rgba(0,0,0,0.06)", borderless: true }}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Image
            source={require("../../assets/images/backarrow.png")}
            style={{ width: 22, height: 22, tintColor: DARK }}
            contentFit="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: WHITE,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 10,
    ...(Platform.OS === "android"
      ? { elevation: 2 }
      : { shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }),
  },
  headerInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "ClashGrotesk",
    fontSize: 22,
    color: DARK,
    fontWeight: "800",
  },
  backBtn: {
    position: "absolute",
    left: 16,
    width: BACK_SIZE,
    height: BACK_SIZE,
    borderRadius: BACK_SIZE / 2,
    backgroundColor: "#F2F4F7",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

