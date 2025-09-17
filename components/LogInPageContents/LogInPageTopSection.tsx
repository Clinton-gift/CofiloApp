import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  LayoutChangeEvent,
} from "react-native";
import { Image } from "expo-image";
import type { EdgeInsets } from "react-native-safe-area-context";

const BG = "#F8FAFC";
const WHITE = "#FFFFFF";
const DARK = "#0F172B";
const PLACEHOLDER = "#A3AEC2";
const FIELD_BG = "#FFFFFF";
const FIELD_BORDER = "#EEF2F6";
const ERROR = "#EF4444";
const BACK_SIZE = 56;
const R = 16;

type Props = {
  insets: EdgeInsets;
  headerH: number;
  setHeaderH: React.Dispatch<React.SetStateAction<number>>;
  MAX_FORM_WIDTH: number;
  kbHeight: number;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  showPhoneError: boolean;
  onBack: () => void;
};

export default function LogInPageTopSection({
  insets,
  headerH,
  setHeaderH,
  MAX_FORM_WIDTH,
  kbHeight,
  phone,
  setPhone,
  showPhoneError,
  onBack,
}: Props) {
  const onHeaderLayout = (e: NativeSyntheticEvent<LayoutChangeEvent["nativeEvent"]>) => {
    setHeaderH(e.nativeEvent.layout.height);
  };

  return (
    <>
      {/* STATIC HEADER */}
      <View
        style={[styles.header, { paddingTop: insets.top + 16, paddingBottom: 12 }]}
        onLayout={onHeaderLayout}
      >
        <View style={{ width: "100%", maxWidth: MAX_FORM_WIDTH, alignSelf: "center" }}>
          <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
            <Image
              source={require("../../assets/images/backarrow.png")}
              style={{ width: 22, height: 22, tintColor: DARK }}
              contentFit="contain"
            />
          </TouchableOpacity>

          <Text style={styles.title}>Log in to your account</Text>
        </View>
      </View>

      {/* CONTENT (UNDER HEADER) */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: headerH,
          paddingHorizontal: 20,
          alignItems: "center",
          paddingBottom: kbHeight ? 12 : insets.bottom + 140,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%", maxWidth: MAX_FORM_WIDTH }}>
          {/* Phone row */}
          <View>
            <View style={styles.row}>
              <View style={styles.codeBox}>
                <Image
                  source={require("../../assets/images/CM.png")}
                  style={{ width: 24, height: 24, borderRadius: 12, marginRight: 8 }}
                  contentFit="cover"
                />
                <Text style={styles.codeTxt}>+237</Text>
              </View>

              <TextInput
                style={[styles.input, showPhoneError && styles.errorBorder]}
                placeholder="Phone number"
                placeholderTextColor={PLACEHOLDER}
                keyboardType="number-pad"
                value={phone}
                onChangeText={setPhone}
                returnKeyType="done"
              />
            </View>

            {showPhoneError ? <Text style={styles.errorTxt}>Enter your phone number</Text> : null}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: BG,
    zIndex: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#E5E7EB",
  },
  backBtn: {
    width: BACK_SIZE,
    height: BACK_SIZE,
    borderRadius: BACK_SIZE / 2,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 16,
  },
  title: {
    fontFamily: "ClashGrotesk",
    fontSize: 28,
    fontWeight: "800",
    color: DARK,
  },

  row: { flexDirection: "row" as const, alignItems: "center" as const },
  codeBox: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: FIELD_BG,
    borderRadius: R,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    paddingHorizontal: 12,
    height: 56,
    minWidth: 120,
  },
  codeTxt: { fontFamily: "ClashGrotesk", color: DARK, fontWeight: "700", fontSize: 16 },

  input: {
    flex: 1,
    height: 56,
    borderRadius: R,
    paddingHorizontal: 16,
    backgroundColor: FIELD_BG,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    fontFamily: "ClashGrotesk",
    fontSize: 16,
    color: DARK,
    marginLeft: 10,
  },

  errorBorder: { borderColor: ERROR },
  errorTxt: {
    color: ERROR,
    fontFamily: "ClashGrotesk",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
  },
});
