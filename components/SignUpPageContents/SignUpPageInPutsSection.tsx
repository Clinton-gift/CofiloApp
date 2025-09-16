import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import type { PickerKind } from "../../Pages/SignUpPage"; // adjust relative path if needed

const TEXT_DARK = "#0F172B";
const PLACEHOLDER = "#A3AEC2";
const FIELD_BG = "#FFFFFF";
const FIELD_BORDER = "#EEF2F6";
const ERROR = "#EF4444";
const R = 16;
const GAP = 12;

type Props = {
  maxFormWidth: number;

  phone: string;
  firstName: string;
  lastName: string;
  region: string | null;
  city: string | null;
  pickup: string | null;

  setPhone: (v: string) => void;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;

  errors: { phone?: string; firstName?: string };

  openPicker: (p: PickerKind) => void;
};

export default function SignUpPageInPutsSection({
  maxFormWidth,
  phone,
  firstName,
  lastName,
  region,
  city,
  pickup,
  setPhone,
  setFirstName,
  setLastName,
  errors,
  openPicker,
}: Props) {
  return (
    <View style={{ width: "100%", maxWidth: maxFormWidth }}>
      {/* Phone row */}
      <View>
        <View style={styles.phoneRow}>
          <View style={styles.codeBox}>
            <Image
              source={require("../../assets/images/CM.png")}
              style={{ width: 24, height: 24, borderRadius: 12, marginRight: 8 }}
              contentFit="cover"
            />
            <Text style={styles.phoneCode}>+237</Text>
          </View>

          <TextInput
            style={[styles.phoneInput, errors.phone ? styles.errorBorder : null]}
            placeholder="Phone number"
            placeholderTextColor={PLACEHOLDER}
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
            returnKeyType="next"
          />
        </View>
        {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
      </View>

      {/* First name */}
      <View>
        <View style={[styles.inputWrapper, errors.firstName && styles.errorBorder]}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor={PLACEHOLDER}
            value={firstName}
            onChangeText={setFirstName}
            returnKeyType="next"
          />
        </View>
        {errors.firstName ? (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        ) : null}
      </View>

      {/* Last name */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor={PLACEHOLDER}
          value={lastName}
          onChangeText={setLastName}
          returnKeyType="next"
        />
      </View>

      {/* Region */}
      <TouchableOpacity style={styles.dropdown} onPress={() => openPicker("region")} activeOpacity={0.7}>
        <Text style={[styles.dropdownText, region ? styles.dropdownValue : null]}>
          {region ?? "Select a region"}
        </Text>
        <Ionicons name="chevron-down" size={20} color={TEXT_DARK} />
      </TouchableOpacity>

      {/* City */}
      <TouchableOpacity style={styles.dropdown} onPress={() => openPicker("city")} activeOpacity={0.7}>
        <Text style={[styles.dropdownText, city ? styles.dropdownValue : null]}>
          {city ?? "Select a city"}
        </Text>
        <Ionicons name="chevron-down" size={20} color={TEXT_DARK} />
      </TouchableOpacity>

      {/* Pickup */}
      <TouchableOpacity style={styles.dropdown} onPress={() => openPicker("pickup")} activeOpacity={0.7}>
        <Text style={[styles.dropdownText, pickup ? styles.dropdownValue : null]}>
          {pickup ?? "Select a pickup point"}
        </Text>
        <Ionicons name="chevron-down" size={20} color={TEXT_DARK} />
      </TouchableOpacity>

      {/* small spacer so it's not glued to the footer when KB hidden */}
      <View style={{ height: 8 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  // phone
  phoneRow: { flexDirection: "row", alignItems: "center" },
  codeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FIELD_BG,
    borderRadius: R,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    paddingHorizontal: 12,
    height: 52,
    minWidth: 100,
  },
  phoneCode: {
    marginLeft: 6,
    fontSize: 16,
    color: TEXT_DARK,
    fontWeight: "700",
    fontFamily: "ClashGrotesk",
  },
  phoneInput: {
    flex: 1,
    backgroundColor: FIELD_BG,
    borderRadius: R,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    marginLeft: 10,
    paddingHorizontal: 15,
    height: 52,
    fontSize: 16,
    color: TEXT_DARK,
    fontFamily: "ClashGrotesk",
  },

  // common inputs
  inputWrapper: {
    backgroundColor: FIELD_BG,
    borderRadius: R,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    marginTop: GAP,
    paddingHorizontal: 15,
    height: 52,
    justifyContent: "center",
  },
  input: { fontSize: 16, color: TEXT_DARK, fontFamily: "ClashGrotesk" },

  // error
  errorBorder: { borderColor: ERROR },
  errorText: {
    color: ERROR,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
    marginLeft: 5,
    fontFamily: "ClashGrotesk",
    fontWeight: "700",
  },

  // dropdowns
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: FIELD_BG,
    borderRadius: R,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    marginTop: GAP,
    paddingHorizontal: 15,
    height: 54,
  },
  dropdownText: { fontSize: 16, color: PLACEHOLDER, fontFamily: "ClashGrotesk" },
  dropdownValue: { color: TEXT_DARK, fontWeight: "700" },
});
