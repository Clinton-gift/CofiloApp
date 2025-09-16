import React from "react";
import { View, Text, TextInput, StyleSheet, TextInput as RNTextInput } from "react-native";

type Props = {
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
  showError: boolean;
  inputsRef: React.MutableRefObject<(RNTextInput | null)[]>;
  formatted: string;
};

const BLUE = "#2B7FFF";
const PLACEHOLDER = "#A3AEC2";
const BORDER = "#FFFFFF";
const WHITE = "#FFFFFF";
const DARK = "#0F172B";
const RED = "#EF4444";

const CELL_SIDE = 56;
const CELL_R = 16;

export default function VerificationPageCodeSection({
  code,
  setCode,
  showError,
  inputsRef,
  formatted,
}: Props) {
  const setDigit = (idx: number, val: string) => {
    const only = val.replace(/\D/g, "");
    setCode((prev: string[]) => {
      const next = [...prev];
      if (only.length <= 1) {
        next[idx] = only;
      } else {
        only.split("").forEach((ch, i) => {
          if (idx + i < 6) next[idx + i] = ch;
        });
      }
      return next;
    });
    if (only.length > 0) {
      const nextIndex = Math.min(5, idx + (only.length > 1 ? only.length : 1));
      inputsRef.current[nextIndex]?.focus();
    }
  };

  const onKeyPress = (idx: number, key: string) => {
    if (key === "Backspace") {
      setCode((prev: string[]) => {
        const next = [...prev];
        if (next[idx]) {
          next[idx] = "";
          return next;
        }
        const prevIndex = Math.max(0, idx - 1);
        inputsRef.current[prevIndex]?.focus();
        next[prevIndex] = "";
        return next;
      });
    }
  };

  return (
    <>
      <View style={styles.cellsRow}>
        {code.map((v: string, i: number) => {
          const hasError = showError && !v;
          return (
            <TextInput
              key={i}
              ref={(r) => {
                inputsRef.current[i] = r;
              }}
              value={v}
              onChangeText={(t) => setDigit(i, t)}
              onKeyPress={({ nativeEvent }) => onKeyPress(i, nativeEvent.key)}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              maxLength={1}
              placeholder="0"
              placeholderTextColor={PLACEHOLDER}
              style={[styles.cell, hasError && { borderColor: RED }]}
              selectionColor={BLUE}
              returnKeyType="next"
            />
          );
        })}
      </View>

      <Text style={styles.resendTop}>
        Resend the code in <Text style={styles.resendTopBold}>{formatted}</Text>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  cellsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 28 },
  cell: {
    width: CELL_SIDE,
    height: CELL_SIDE,
    borderRadius: CELL_R,
    borderWidth: 2,
    borderColor: BORDER,
    backgroundColor: WHITE,
    textAlign: "center",
    fontFamily: "ClashGrotesk",
    fontSize: 22,
    color: DARK,
  },
  resendTop: { marginTop: 18, textAlign: "center", fontFamily: "ClashGrotesk", fontSize: 16, color: BLUE },
  resendTopBold: { fontFamily: "ClashGrotesk", fontWeight: "700", color: BLUE },
});
