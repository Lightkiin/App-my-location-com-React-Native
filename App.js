import { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  List,
  PaperProvider,
  Switch,
  Text,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import openDB from "./db";

import myColors from "./assets/colors.json";
import myColorsDark from "./assets/colorsDark.json";

export default function App() {
  const db = openDB();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  const [theme, setTheme] = useState({
    ...DefaultTheme,
    colors: myColors.colors,
  });

  // =========================
  // ASYNC STORAGE (DARK MODE)
  // =========================

  async function loadDarkMode() {
    try {
      const value = await AsyncStorage.getItem("@darkMode");
      if (value !== null) {
        setIsSwitchOn(JSON.parse(value));
      }
    } catch (e) {
      console.log("Erro ao carregar dark mode");
    }
  }

  async function onToggleSwitch() {
    const newValue = !isSwitchOn;
    setIsSwitchOn(newValue);

    try {
      await AsyncStorage.setItem("@darkMode", JSON.stringify(newValue));
    } catch (e) {
      console.log("Erro ao salvar dark mode");
    }
  }

  // =========================
  // LOCATION + PERMISSION
  // =========================

  async function getLocation() {
    setIsLoading(true);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Permissão negada!");
        setIsLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = location.coords;

      // salva no banco
      await db.runAsync(
        "INSERT INTO locations (latitude, longitude) VALUES (?, ?);",
        [coords.latitude, coords.longitude]
      );

      // recarrega lista
      loadLocations();
    } catch (e) {
      console.log("Erro ao obter localização", e);
    }

    setIsLoading(false);
  }

  // =========================
  // SQLITE
  // =========================

  async function loadLocations() {
    setIsLoading(true);

    try {
      const rows = await db.getAllAsync("SELECT * FROM locations");

      setLocations(rows);
    } catch (e) {
      console.log("Erro ao carregar locations", e);
    }

    setIsLoading(false);
  }

  // =========================
  // EFFECTS
  // =========================

  useEffect(() => {
    loadDarkMode();
    loadLocations();
  }, []);

  useEffect(() => {
    if (isSwitchOn) {
      setTheme({ ...theme, colors: myColorsDark.colors });
    } else {
      setTheme({ ...theme, colors: myColors.colors });
    }
  }, [isSwitchOn]);

  // =========================
  // UI
  // =========================

  return (
    <PaperProvider theme={theme}>
      <Appbar.Header>
        <Appbar.Content title="My Location" />
      </Appbar.Header>

      <View style={{ backgroundColor: theme.colors.background }}>
        <View style={styles.containerDarkMode}>
          <Text>Dark Mode</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>

        <Button
          style={styles.containerButton}
          icon="map"
          mode="contained"
          loading={isLoading}
          onPress={getLocation}
        >
          Capturar localização
        </Button>

        <FlatList
          style={styles.containerList}
          data={locations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={`Localização ${item.id}`}
              description={`Lat: ${item.latitude} | Long: ${item.longitude}`}
            />
          )}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  containerDarkMode: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerButton: {
    margin: 10,
  },
  containerList: {
    margin: 10,
  },
});