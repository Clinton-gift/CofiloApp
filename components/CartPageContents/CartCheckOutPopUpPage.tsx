// components/CartPageContents/CartCheckOutPopUpPage.tsx
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const SHEET_BG = "#FFFFFF";
const BG = "rgba(15,23,43,0.45)";
const DARK = "#0F172B";
const BLUE = "#2B7FFF";
const PLACEHOLDER = "#A3AEC2";
const FIELD_BG = "#FFFFFF";
const FIELD_BORDER = "#EEF2F6";
const ERROR = "#EF4444";

const R = 22;

type Props = {
  visible: boolean;
  onClose: () => void;
  /** e.g. "13,200 FCFA" (used in the CTA) */
  totalLabel: string;
  /** called when Pay is pressed and phone passes simple validation */
  onPay?: (data: { operator: string | null; phone: string }) => void;
  /** dropdown options; defaults to MTN/Orange */
  operators?: string[];
};

export default function CartCheckOutPopUpPage({
  visible,
  onClose,
  totalLabel,
  onPay,
  operators = ["MTN MoMo", "Orange Money"],
}: Props) {
  const insets = useSafeAreaInsets();

  const [operator, setOperator] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [showOpList, setShowOpList] = useState(false);
  const [phoneErr, setPhoneErr] = useState<string | null>(null);

  // keyboard-aware bottom padding so the sheet content never hides the CTA
  const [kbHeight, setKbHeight] = useState(0);
  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const s = Keyboard.addListener(showEvt, (e) => setKbHeight(e?.endCoordinates?.height ?? 0));
    const h = Keyboard.addListener(hideEvt, () => setKbHeight(0));
    return () => { s.remove(); h.remove(); };
  }, []);

  useEffect(() => {
    if (!visible) {
      // reset when closing
      setPhoneErr(null);
      setShowOpList(false);
      setKbHeight(0);
    }
  }, [visible]);

  // **Dynamic pay label using totalLabel directly**
  const payLabel = `Pay ${totalLabel}`;

  const validatePhone = (n: string) => {
    const digits = n.replace(/\D/g, "");
    return digits.length >= 9;
  };

  const handlePay = () => {
    if (!validatePhone(phone)) {
      setPhoneErr("Enter a valid phone number");
      return;
    }
    setPhoneErr(null);
    onPay?.({ operator, phone });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* Dim backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Bottom sheet */}
      <View
        style={[
          styles.sheet,
          { paddingBottom: (kbHeight || insets.bottom) + 14 },
        ]}
      >
        <View style={styles.handleWrap}>
          <View style={styles.handle} />
        </View>

        <Text style={styles.title}>Checkout</Text>

        {/* Operator select */}
        <Pressable style={styles.select} onPress={() => setShowOpList((s) => !s)}>
          <Text style={[styles.selectTxt, operator ? styles.selectValue : null]}>
            {operator ?? "Select operator"}
          </Text>
          <Ionicons name="chevron-down" size={20} color={DARK} />
        </Pressable>

        {showOpList && (
          <View style={styles.dropdown}>
            {operators.map((op) => (
              <Pressable
                key={op}
                style={styles.opt}
                onPress={() => {
                  setOperator(op);
                  setShowOpList(false);
                }}
              >
                <Text style={styles.optTxt}>{op}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Phone input */}
        <View style={[styles.inputWrap, phoneErr && styles.errorBorder]}>
          <TextInput
            value={phone}
            onChangeText={(t) => {
              setPhone(t);
              if (phoneErr) setPhoneErr(null);
            }}
            placeholder="Enter your phone number"
            placeholderTextColor={PLACEHOLDER}
            keyboardType="number-pad"
            style={styles.input}
            returnKeyType="done"
          />
        </View>
        {phoneErr ? <Text style={styles.errorTxt}>{phoneErr}</Text> : null}

        {/* CTA */}
        <TouchableOpacity style={styles.cta} activeOpacity={0.85} onPress={handlePay}>
          <Text style={styles.ctaTxt}>{payLabel}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: BG },

  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: SHEET_BG,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    ...(Platform.OS === "android"
      ? { elevation: 12 }
      : {
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        }),
  },

  handleWrap: { alignItems: "center", marginBottom: 8 },
  handle: { width: 56, height: 6, borderRadius: 3, backgroundColor: "#E6E9EE" },

  title: {
    textAlign: "center",
    fontFamily: "ClashGrotesk",
    fontWeight: "800",
    fontSize: 24,
    color: DARK,
    marginTop: 6,
    marginBottom: 14,
  },

  // Select
  select: {
    height: 60,
    borderRadius: R,
    backgroundColor: FIELD_BG,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectTxt: { color: PLACEHOLDER, fontSize: 16, fontFamily: "ClashGrotesk" },
  selectValue: { color: DARK, fontWeight: "700" },

  dropdown: {
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: "#F6F8FB",
    padding: 8,
  },
  opt: {
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginVertical: 4,
  },
  optTxt: { fontFamily: "ClashGrotesk", fontSize: 16, color: DARK, fontWeight: "700" },

  // Phone
  inputWrap: {
    height: 60,
    borderRadius: R,
    backgroundColor: FIELD_BG,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    marginTop: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  input: {
    fontFamily: "ClashGrotesk",
    fontSize: 16,
    color: DARK,
  },
  errorBorder: { borderColor: ERROR },
  errorTxt: {
    color: ERROR,
    fontFamily: "ClashGrotesk",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
    marginLeft: 6,
  },

  // CTA
  cta: {
    marginTop: 14,
    height: 56,
    borderRadius: 22,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaTxt: { color: "#fff", fontFamily: "ClashGrotesk", fontSize: 18, fontWeight: "700" },
});
