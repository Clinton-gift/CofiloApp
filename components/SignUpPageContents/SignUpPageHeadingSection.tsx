import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Platform } from "react-native";
import { Image } from "expo-image";

const BG = "#F8FAFC";
const TEXT_DARK = "#0F172B";
const FIELD_BORDER = "#EEF2F6";
const WHITE = "#FFFFFF";
const BACK_SIZE = 56;

type Props = {
  topInset: number;
  maxFormWidth: number;
  onBack?: () => void;
  onLayout?: (measuredHeight: number) => void;
};

export default function SignUpPageHeadingSection({
  topInset,
  maxFormWidth,
  onBack,
  onLayout,
}: Props) {
  return (
    <View
      style={[
        styles.staticHeader,
        { paddingTop: topInset + 16, paddingBottom: 12 },
      ]}
      onLayout={(e) => onLayout?.(e.nativeEvent.layout.height)}
    >
      <View
        style={{
          width: "100%",
          maxWidth: maxFormWidth,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Image
            source={require("../../assets/images/backarrow.png")}
            style={{ width: 22, height: 22, tintColor: TEXT_DARK }}
            contentFit="contain"
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Create your Mova account</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  staticHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: BG,
    zIndex: 10,
    paddingHorizontal: 20,
    borderBottomColor: "transparant",
   
  },
  backBtn: {
    marginBottom: 16,
    width: BACK_SIZE,
    height: BACK_SIZE,
    borderRadius: BACK_SIZE / 2,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 20,
    fontFamily: "ClashGrotesk",
  },
});
