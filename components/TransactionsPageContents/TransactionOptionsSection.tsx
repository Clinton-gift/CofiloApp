import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";

const BG = "#F8FAFC";
const WHITE = "#FFFFFF";
const DARK = "#0F172B";
const MUTED = "#94A3B8";

type TxStatus = "Pending" | "Processing" | "Successful" | "Failed" | "Collected";
const STATUS_COLOR: Record<TxStatus, string> = {
  Pending: "#F59E0B",
  Processing: "#1D4ED8",
  Successful: "#16A34A",
  Failed: "#EF4444",
  Collected: "#0F172B",
};

type TxItem = {
  key: string;
  title: string;
  ref: string;
  amount?: string;
  status: TxStatus;
  icon: any;
  note?: string;
};

type Props = {
  MAX_WIDTH: number;
  insets: EdgeInsets;
  kbHeight: number;
};

export default function TransactionOptionsSection({ MAX_WIDTH, insets, kbHeight }: Props) {
  const data: TxItem[] = [
    { key: "1", title: "Amazon", ref: "TXN2025090212WW", amount: "120,000 FCFA", status: "Pending", icon: require("../../assets/images/AmazonC.png") },
    { key: "2", title: "Shipping fee", ref: "TXN20250902124E", amount: "50,000 FCFA", status: "Processing", icon: require("../../assets/images/Sheeping.png") },
    { key: "3", title: "Shipping fee", ref: "TXN20250902122W", amount: "30,000 FCFA", status: "Successful", icon: require("../../assets/images/Sheeping.png") },
    { key: "4", title: "Shipping fee", ref: "TXN202509021209", amount: "60,000 FCFA", status: "Failed", icon: require("../../assets/images/Sheeping.png") },
    { key: "5", title: "Shipping fee", ref: "TXN2025090212PP", amount: "10,000 FCFA", status: "Successful", icon: require("../../assets/images/Sheeping.png") },
    { key: "6", title: "Asos", ref: "TXN2025090212QQ", amount: "60,000 FCFA", status: "Successful", icon: require("../../assets/images/AsosC.png") },
    { key: "7", title: "AutoDoc", ref: "TXN202509021222", amount: "340,000 FCFA", status: "Successful", icon: require("../../assets/images/AutoDocC.png") },
    { key: "8", title: "BackMarket", ref: "PKG202506251100", status: "Collected", icon: require("../../assets/images/BackMarket.png"), note: "09.09.25 12:34" },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingTop: 16,
        alignItems: "center",
        paddingBottom: (kbHeight || insets.bottom) + 24,
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[{ width: "100%", maxWidth: MAX_WIDTH }, styles.content]}>
        {data.map((tx) => (
          <View key={tx.key} style={styles.item}>
            {/* Left */}
            <View style={styles.left}>
              <View style={styles.avatar}>
                <Image source={tx.icon} style={{ width: 32, height: 32 }} contentFit="contain" />
              </View>
              <View>
                <Text style={styles.brand} numberOfLines={1}>{tx.title}</Text>
                <Text style={styles.code} numberOfLines={1}>{tx.ref}</Text>
                {!!tx.note && (
                  <Text style={[styles.code, { marginTop: 2 }]} numberOfLines={1}>
                    {tx.note}
                  </Text>
                )}
              </View>
            </View>

            {/* Right */}
            <View style={styles.right}>
              {!!tx.amount && <Text style={styles.amount} numberOfLines={1}>{tx.amount}</Text>}
              <Text style={[styles.status, { color: STATUS_COLOR[tx.status] }]} numberOfLines={1}>
                {tx.status}
              </Text>
            </View>
          </View>
        ))}
        <View style={{ height: 8 }} />
      </View>
    </ScrollView>
  );
}

const R = 18;

const styles = StyleSheet.create({
  content: {
    backgroundColor: BG,
    marginHorizontal: -12, // wider cards
    paddingHorizontal: 6,
    paddingTop: 10,
    paddingBottom: 8,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: R,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: BG, alignItems: "center", justifyContent: "center",
  },
  brand:  { fontFamily: "ClashGrotesk", fontWeight: "700", fontSize: 14, color: DARK },
  code:   { fontFamily: "ClashGrotesk", fontSize: 12, fontWeight: "700", color: MUTED, marginTop: 2 },
  right:  { alignItems: "flex-end" },
  amount: { fontFamily: "ClashGrotesk", fontWeight: "700", fontSize: 14, color: DARK },
  status: { fontFamily: "ClashGrotesk", fontSize: 12, fontWeight: "700", marginTop: 2 },
});
