// Pages/SignUpPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  useWindowDimensions,
  Keyboard,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import SignUpPageHeadingSection from "../components/SignUpPageContents/SignUpPageHeadingSection";
import SignUpPageInPutsSection from "../components/SignUpPageContents/SignUpPageInPutsSection";
import SignUpPageContinueSection from "../components/SignUpPageContents/SignUpPageContinueSection";

const BG = "#F8FAFC";
const WHITE = "#FFFFFF";
const TEXT_DARK = "#0F172B";
const BLUE = "#2B7FFF";
const PLACEHOLDER = "#A3AEC2";
const FIELD_BG = "#FFFFFF";
const FIELD_BORDER = "#EEF2F6";
const ERROR = "#EF4444";

const R = 16;
const GAP = 12;
const BACK_SIZE = 56;

export type PickerKind = "region" | "city" | "pickup" | null;

export default function SignUpPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const MAX_FORM_WIDTH = Math.min(560, width - 40);

  // form state
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // dropdowns
  const [region, setRegion] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [pickup, setPickup] = useState<string | null>(null);
  const [whichPicker, setWhichPicker] = useState<PickerKind>(null);

  // errors
  const [errors, setErrors] = useState<{ phone?: string; firstName?: string }>(
    {}
  );

  // keyboard tracking (for footer docking)
  const [kbVisible, setKbVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const showEvt =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const s = Keyboard.addListener(showEvt, (e) => {
      setKbVisible(true);
      setKeyboardHeight(e?.endCoordinates?.height ?? 0);
    });
    const h = Keyboard.addListener(hideEvt, () => {
      setKbVisible(false);
      setKeyboardHeight(0);
    });
    return () => {
      s.remove();
      h.remove();
    };
  }, []);

  // picker data
  const pickerData = useMemo(() => {
    switch (whichPicker) {
      case "region":
        return ["Centre", "Littoral", "Ouest", "Nord", "Sud"];
      case "city":
        return ["Yaounde", "Douala", "Bafoussam", "Limbe"];
      case "pickup":
        return [
          "Bureau de poste de Nlongkak",
          "Bureau de poste de Bastos",
          "Bureau de poste de Mfoundi",
          "Bureau de poste de Yaounde",
        ];
      default:
        return [];
    }
  }, [whichPicker]);

  // actions
  const handleContinue = () => {
    const e: { phone?: string; firstName?: string } = {};
    if (!phone.trim()) e.phone = "Enter your phone number";
    if (!firstName.trim()) e.firstName = "Enter your first name";
    setErrors(e);

    if (Object.keys(e).length === 0) {
      // next step (kept no-op)
      console.log({ phone, firstName, lastName, region, city, pickup });
      // inside handleContinue (after validation passes)
      router.push({ pathname: "/verificationPage", params: { phone } });

    }
  };

  // header measurement so the list can scroll under it
  const [headerH, setHeaderH] = useState(0);

  // dynamic spacing
  const contentBottomPad = kbVisible ? 16 : insets.bottom + 120; // room above footer if keyboard hidden
  const footerBottom = (kbVisible ? keyboardHeight : insets.bottom) + 12;

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Static header */}
      <SignUpPageHeadingSection
        topInset={insets.top}
        maxFormWidth={MAX_FORM_WIDTH}
        onBack={() => router.back()}
        onLayout={(h) => setHeaderH(h)}
      />

      {/* Scrollable inputs under header */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: headerH,
            paddingBottom: contentBottomPad,
            alignItems: "center",
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SignUpPageInPutsSection
          maxFormWidth={MAX_FORM_WIDTH}
          // values
          phone={phone}
          firstName={firstName}
          lastName={lastName}
          region={region}
          city={city}
          pickup={pickup}
          // setters
          setPhone={setPhone}
          setFirstName={setFirstName}
          setLastName={setLastName}
          // errors
          errors={errors}
          // open pickers
          openPicker={setWhichPicker}
        />
      </ScrollView>

      {/* Footer docked above keyboard */}
      <View
        pointerEvents="box-none"
        style={[styles.footerDock, { paddingBottom: footerBottom }]}
      >
        <SignUpPageContinueSection
          maxFormWidth={MAX_FORM_WIDTH}
          onContinue={handleContinue}
        />
      </View>

      {/* Bottom picker modal */}
      <Modal
        visible={!!whichPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setWhichPicker(null)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setWhichPicker(null)}
        />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          {pickerData.map((opt) => (
            <Pressable
              key={opt}
              style={styles.opt}
              onPress={() => {
                if (whichPicker === "region") setRegion(opt);
                if (whichPicker === "city") setCity(opt);
                if (whichPicker === "pickup") setPickup(opt);
                setWhichPicker(null);
              }}
            >
              <Text style={styles.optTxt}>{opt}</Text>
            </Pressable>
          ))}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { backgroundColor: BG, paddingHorizontal: 20 },

  // Footer container (same look as before)
  footerDock: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  // Modal styles (unchanged)
  backdrop: { flex: 1, backgroundColor: "rgba(15,23,43,0.45)" },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: WHITE,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  opt: {
    height: 56,
    borderRadius: 14,
    backgroundColor: "#F6F8FB",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  optTxt: {
    fontFamily: "ClashGrotesk",
    fontSize: 16,
    color: TEXT_DARK,
    fontWeight: "700",
  },
});
