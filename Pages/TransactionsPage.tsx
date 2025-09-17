import React, { useEffect, useState } from "react";
import { View, Keyboard, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

import TransactionsPageHeadingSection from "../components/TransactionsPageContents/TransactionsPageHeadingSection";
import TransactionOptionsSection from "../components/TransactionsPageContents/TransactionOptionsSection";

const BG = "#F8FAFC";

export default function TransactionsPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const MAX_WIDTH = Math.min(560, width - 24); // wider

  const [kbHeight, setKbHeight] = useState(0);
  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const s = Keyboard.addListener(showEvt, (e) => setKbHeight(e?.endCoordinates?.height ?? 0));
    const h = Keyboard.addListener(hideEvt, () => setKbHeight(0));
    return () => { s.remove(); h.remove(); };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <TransactionsPageHeadingSection title="Transactions" onBack={() => router.back()} />
      <TransactionOptionsSection MAX_WIDTH={MAX_WIDTH} insets={insets} kbHeight={kbHeight} />
    </View>
  );
}
