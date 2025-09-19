import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

const BG = "#F8FAFC";
const DARK = "#0F172B";
const FIELD_BG = "#FFFFFF";
const FIELD_BORDER = "#EEF2F6";
const MUTED = "#667085";
const R = 20;

type Props = {
  MAX_FORM_WIDTH: number;
  insets: EdgeInsets;
  kbHeight: number;
};

export default function SettingsOptionsSection({ MAX_FORM_WIDTH, insets, kbHeight }: Props) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 16,
        alignItems: "center",
        paddingBottom: (kbHeight || insets.bottom) + 24,
        backgroundColor: BG,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={{ width: "100%", maxWidth: MAX_FORM_WIDTH }}>
        <SettingsRow label="Share the app"   leftIcon={require("../../assets/images/Share.svg")} />
        <SettingsRow label="Privacy policy"  leftIcon={require("../../assets/images/Lock.svg")} />
        <SettingsRow label="Terms of conditions" leftIcon={require("../../assets/images/Lock.svg")} />
        <SettingsRow label="Disclaimer"      leftIcon={require("../../assets/images/Lock.svg")} />
        <SettingsRow label="Rate the app"    leftIcon={require("../../assets/images/Rate.svg")} />
        {/* No actions; tapping rows does nothing */}
      </View>
    </ScrollView>
  );
}

function SettingsRow({
  label,
  leftIcon,
  style,
}: {
  label: string;
  leftIcon: any; // require(...) pattern
  style?: any;
}) {
  // Non-pressable row (no navigation/actions)
  return (
    <View style={[styles.fieldWrap, style]}>
      <View style={styles.leftWrap}>
        <Image
          source={leftIcon}
          style={{ width: 24, height: 24, marginRight: 12, tintColor: "#0F172B" }}
          contentFit="contain"
        />
        <Text style={styles.valueText} numberOfLines={1}>
          {label}
        </Text>
      </View>

      {/* Right chevron: Vectordown.png rotated to point right */}
      <Image
        source={require("../../assets/images/Vectordown.png")}
        style={[styles.chevImg, { tintColor: MUTED, transform: [{ rotate: "-90deg" }] }]}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldWrap: {
    height: 54,
    borderRadius: R,
    backgroundColor: FIELD_BG,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftWrap: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  valueText: {
    flexShrink: 1,
    fontFamily: "ClashGrotesk",
    fontSize: 18,
    color: DARK,
  },
  chevImg: {
    width: 14,
    height: 14,
    marginLeft: 8,
  },
});
