import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { Image } from "expo-image";

const BG = "#F8FAFC";
const WHITE = "#FFFFFF";
const DARK = "#0F172B";
const FIELD_BG = "#FFFFFF";
const FIELD_BORDER = "#EEF2F6";
const PLACEHOLDER = "#A3AEC2";
const R = 20;

type Props = {
  MAX_FORM_WIDTH: number;
  // values
  firstName: string;
  lastName: string;
  region: string;
  city: string;
  pickup: string;
  // setters
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setRegion: (v: string) => void;
  setCity: (v: string) => void;
  setPickup: (v: string) => void;
};

const REGIONS = [
  "Adamaoua","Centre","East","Far North","Littoral","North","North-West","South","South-West","West",
] as const;

const CITIES_BY_REGION: Record<string, string[]> = {
  Centre: ["Yaounde","Obala","Mbalmayo"],
  Littoral: ["Douala","Manjo","Nkongsamba"],
  West: ["Bafoussam","Dschang","Foumban"],
  "North-West": ["Bamenda","Ndop","Kumbo"],
  "South-West": ["Buea","Limbe","Kumba"],
  North: ["Garoua","Guider","Figuil"],
  "Far North": ["Maroua","Kousseri","Mora"],
  South: ["Ebolowa","Kribi","Sangmelima"],
  East: ["Bertoua","Batouri","Yokadouma"],
  Adamaoua: ["Ngaoundere","Tignere","Meiganga"],
};

const PICKUPS_BY_CITY: Record<string, string[]> = {
  Yaounde: [
    "Bureau de poste de Nlongkak","Poste Centrale","Carrefour Warda","Carrefour Etoudi",
  ],
  Douala: ["Bonapriso Post Office","Akwa Central","Bepanda Market"],
  Bafoussam: ["Marché A","Poste Centrale Bafoussam"],
  Bamenda: ["Commercial Avenue","City Chemist"],
  Buea: ["Molyko Junction","Buea Town Post"],
};

export default function ProfilePageDetailsSection({
  MAX_FORM_WIDTH,
  firstName, lastName, region, city, pickup,
  setFirstName, setLastName, setRegion, setCity, setPickup,
}: Props) {
  // pickers
  const [showRegion, setShowRegion] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showPickup, setShowPickup] = useState(false);

  const regionCities = useMemo(() => CITIES_BY_REGION[region] ?? [], [region]);
  const cityPickups = useMemo(() => PICKUPS_BY_CITY[city] ?? [], [city]);

  // keep dependencies consistent (same behavior as original page)
  useEffect(() => {
    if (!regionCities.includes(city)) {
      const next = regionCities[0] ?? ""; setCity(next);
      const nextPickups = PICKUPS_BY_CITY[next] ?? []; setPickup(nextPickups[0] ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  useEffect(() => {
    if (!cityPickups.includes(pickup)) setPickup(cityPickups[0] ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 16, alignItems: "center", backgroundColor: BG }}>
      <View style={{ width: "100%", maxWidth: MAX_FORM_WIDTH }}>
        {/* First name */}
        <View style={styles.fieldWrap}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor={PLACEHOLDER}
            value={firstName}
            onChangeText={setFirstName}
            returnKeyType="next"
          />
        </View>

        {/* Last name */}
        <View style={styles.fieldWrap}>
          <TextInput
            style={styles.input}
            placeholder="Last name"
            placeholderTextColor={PLACEHOLDER}
            value={lastName}
            onChangeText={setLastName}
            returnKeyType="done"
          />
        </View>

        {/* Region */}
        <TouchableOpacity style={styles.fieldWrap} activeOpacity={0.8} onPress={() => setShowRegion(true)}>
          <Text style={styles.valueText}>{region || "Region"}</Text>
          <Image
            source={require("../../assets/images/Vectordown.png")}
            style={styles.chevImg}
            contentFit="contain"
          />
        </TouchableOpacity>

        {/* City */}
        <TouchableOpacity style={styles.fieldWrap} activeOpacity={0.8} onPress={() => setShowCity(true)} disabled={!region}>
          <Text style={styles.valueText}>{city || "City"}</Text>
          <Image
            source={require("../../assets/images/Vectordown.png")}
            style={styles.chevImg}
            contentFit="contain"
          />
        </TouchableOpacity>

        {/* Pick-up */}
        <TouchableOpacity style={styles.fieldWrap} activeOpacity={0.8} onPress={() => setShowPickup(true)} disabled={!city}>
          <Text style={styles.valueText}>{pickup || "Pick-up point"}</Text>
          <Image
            source={require("../../assets/images/Vectordown.png")}
            style={styles.chevImg}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Pickers */}
      <PickerModal
        visible={showRegion}
        title="Select region"
        options={REGIONS as unknown as string[]}
        onSelect={setRegion}
        onClose={() => setShowRegion(false)}
      />
      <PickerModal
        visible={showCity}
        title="Select city"
        options={regionCities}
        onSelect={setCity}
        onClose={() => setShowCity(false)}
      />
      <PickerModal
        visible={showPickup}
        title="Select pick-up point"
        options={cityPickups}
        onSelect={setPickup}
        onClose={() => setShowPickup(false)}
      />
    </View>
  );
}

function PickerModal({
  visible, title, options, onSelect, onClose,
}: {
  visible: boolean; title: string; options: string[];
  onSelect: (v: string) => void; onClose: () => void;
}) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={pickerStyles.overlay} onPress={onClose}>
        <Pressable style={pickerStyles.sheet}>
          <Text style={pickerStyles.sheetTitle}>{title}</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={pickerStyles.option} onPress={() => { onSelect(item); onClose(); }}>
                <Text style={pickerStyles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={pickerStyles.sep} />}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  input: {
    flex: 1,
    fontFamily: "ClashGrotesk",
    fontSize: 18,
    color: DARK,
  },
  valueText: {
    flex: 1,
    paddingRight: 8,
    fontFamily: "ClashGrotesk",
    fontSize: 18,
    color: DARK,
  },
  chevImg: { width: 18, height: 18, marginLeft: 8, tintColor: DARK },
});

// Picker styles
const pickerStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: WHITE,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "60%",
  },
  sheetTitle: {
    fontFamily: "ClashGrotesk",
    fontWeight: "800",
    fontSize: 16,
    color: DARK,
    textAlign: "center",
    marginBottom: 8,
  },
  option: { paddingVertical: 14, paddingHorizontal: 6 },
  optionText: { fontFamily: "ClashGrotesk", fontSize: 16, color: DARK },
  sep: { height: 1, backgroundColor: FIELD_BORDER },
});
