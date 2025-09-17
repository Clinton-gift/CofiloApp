import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  Share,
  Linking,
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";
import { Image } from "expo-image";

// === Theme (same feel as ProfilePage) ===
const BG = "#F8FAFC";
const WHITE = "#FFFFFF";
const DARK = "#0F172B";
const FIELD_BG = "#FFFFFF";
const FIELD_BORDER = "#EEF2F6";
const MUTED = "#667085";

// Header
const HEADER_H = 80;
const BACK_SIZE = 44;
const R = 20;

export default function SettingsPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const MAX_FORM_WIDTH = Math.min(560, width - 40);

  // keyboard parity
  const [kbHeight, setKbHeight] = useState(0);
  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const s = Keyboard.addListener(showEvt, (e) => setKbHeight(e?.endCoordinates?.height ?? 0));
    const h = Keyboard.addListener(hideEvt, () => setKbHeight(0));
    return () => { s.remove(); h.remove(); };
  }, []);

  // Actions (swap to your real routes/links)
  const onShare = async () => {
    try { await Share.share({ message: "Check out this app: https://example.com/app" }); } catch {}
  };
  const open = (url: string) => Linking.openURL(url).catch(() => {});
  const onPrivacy = () => open("https://example.com/privacy");
  const onTerms = () => open("https://example.com/terms");
  const onDisclaimer = () => open("https://example.com/disclaimer");
  const onRate = () => open("https://example.com/store");

  const backTop = (HEADER_H - BACK_SIZE) / 2;

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* ===== Header (aligned like ProfilePage) ===== */}
      <View style={[styles.headerBar, { paddingTop: insets.top }]}>
        <View style={[styles.headerInner, { height: HEADER_H }]}>
          <Text style={styles.headerTitle}>Settings</Text>

          <Pressable
            onPress={() => router.back()}
            style={[styles.backBtn, { top: backTop }]}
            android_ripple={{ color: "rgba(0,0,0,0.06)", borderless: true }}
            accessibilityRole="button"
            accessibilityLabel="Back"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Image
              source={require("../assets/images/backarrow.png")}
              style={{ width: 22, height: 22, tintColor: DARK }}
              contentFit="contain"
            />
          </Pressable>
        </View>
      </View>

      {/* ===== Content (ProfilePage-style cards) ===== */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          alignItems: "center",
          paddingBottom: (kbHeight || insets.bottom) + 24,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%", maxWidth: MAX_FORM_WIDTH }}>
          <SettingsRow
            label="Share the app"
            leftIcon={require("../assets/images/Share.svg")}
            onPress={onShare}
          />
          <SettingsRow
            label="Privacy policy"
            leftIcon={require("../assets/images/Lock.svg")}
            onPress={onPrivacy}
          />
          <SettingsRow
            label="Terms of conditions"
            leftIcon={require("../assets/images/Lock.svg")}
            onPress={onTerms}
          />
          <SettingsRow
            label="Disclaimer"
            leftIcon={require("../assets/images/Lock.svg")}
            onPress={onDisclaimer}
          />
          <SettingsRow
            label="Rate the app"
            leftIcon={require("../assets/images/Rate.svg")}
            onPress={onRate}
          />

          {/* "Delete account" removed as requested */}
        </View>
      </ScrollView>
    </View>
  );
}

function SettingsRow({
  label,
  leftIcon,
  onPress,
  style,
}: {
  label: string;
  leftIcon: any; // using require(...) pattern
  onPress?: () => void;
  style?: any;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.fieldWrap, style]}
    >
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
        source={require("../assets/images/Vectordown.png")}
        style={[styles.chevImg, { tintColor: MUTED, transform: [{ rotate: "-90deg" }] }]}
        contentFit="contain"
      />
    </TouchableOpacity>
  );
}

// ===== Styles (same card recipe as ProfilePage inputs) =====
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
