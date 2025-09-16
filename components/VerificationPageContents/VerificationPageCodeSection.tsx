import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const WHITE = "#FFFFFF";
const DARK = "#0F172B";
const BLUE = "#2B7FFF";
const BORDER = "#E5E7EB";
const RED = "#EF4444";

const CELL_SIDE = 56;
const CELL_R = 16;

type Props = {
  code: string[];
  showError: boolean;
  seconds: number;
  inputsRef: React.MutableRefObject<Array<TextInput | null>>;
  onChangeDigit: (index: number, value: string) => void;
  onKeyBackspace: (index: number, key: string) => void;
};

export default function VerificationPageCodeSection({
  code,
  showError,
  seconds,
  inputsRef,
  onChangeDigit,
  onKeyBackspace,
}: Props) {
  const formatted = `00:${String(Math.max(0, seconds)).padStart(2, "0")}`;

  return (
    <View>
      <View style={styles.cellsRow}>
        {code.map((v, i) => {
          const hasError = showError && !v;
          return (
            <TextInput
              key={i}
              ref={(r) => { inputsRef.current[i] = r; }}
              value={v}
              onChangeText={(t) => onChangeDigit(i, t)}
              onKeyPress={({ nativeEvent }) => onKeyBackspace(i, nativeEvent.key)}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              maxLength={1}
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
    </View>
  );
}

const styles = StyleSheet.create({
  cellsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
  },
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
  resendTop: {
    marginTop: 18,
    textAlign: "center",
    fontFamily: "ClashGrotesk",
    fontSize: 16,
    color: BLUE,
  },
  resendTopBold: {
    fontFamily: "ClashGrotesk",
    fontWeight: "800",
    color: BLUE,
  },
});
