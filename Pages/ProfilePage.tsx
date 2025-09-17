import React, { useEffect, useMemo, useState } from "react";
import { View, Keyboard, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";

import ProfilePageHeadingSection from "../components/ProfilePageContents/ProfilePageHeadingSection";
import ProfilePageDetailsSection from "../components/ProfilePageContents/ProfilePageDetailsSection";
import ProfilePageSaveButton from "../components/ProfilePageContents/ProfilePageSaveButton";

const BG = "#F8FAFC";

export default function ProfilePage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const MAX_FORM_WIDTH = Math.min(560, width - 40);

  // form state
  const [firstName, setFirstName] = useState("William");
  const [lastName, setLastName] = useState("Onobiono");
  const [region, setRegion] = useState<string>("Centre");
  const [city, setCity] = useState<string>("Yaounde");
  const [pickup, setPickup] = useState<string>("Bureau de poste de Nlongkak");

  const allFilled = useMemo(
    () => !!(firstName.trim() && lastName.trim() && region && city && pickup),
    [firstName, lastName, region, city, pickup]
  );

  // keyboard docking for footer
  const [kbHeight, setKbHeight] = useState(0);
  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const s = Keyboard.addListener(showEvt, (e) => setKbHeight(e?.endCoordinates?.height ?? 0));
    const h = Keyboard.addListener(hideEvt, () => setKbHeight(0));
    return () => { s.remove(); h.remove(); };
  }, []);

  const onSave = () => {
    if (!allFilled) return;
    // TODO: hook API if needed
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <ProfilePageHeadingSection title="Profile" onBack={() => router.back()} />

      <ProfilePageDetailsSection
        MAX_FORM_WIDTH={MAX_FORM_WIDTH}
        firstName={firstName}
        lastName={lastName}
        region={region}
        city={city}
        pickup={pickup}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setRegion={setRegion}
        setCity={setCity}
        setPickup={setPickup}
      />

      <ProfilePageSaveButton
        insets={insets}
        kbHeight={kbHeight}
        MAX_FORM_WIDTH={MAX_FORM_WIDTH}
        disabled={!allFilled}
        onSave={onSave}
      />
    </View>
  );
}
