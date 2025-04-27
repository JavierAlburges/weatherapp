import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AutocompleteInput from "../componts/AutocompleteInput";
import WeatherInfo from "../componts/WeatherInfo";
import SearchHistory from "../componts/SearchHistory";
import { createAnonymousUser } from "../utils/supabase";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Index() {
  const [selectedCity, setSelectedCity] = useState("");
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const initializeUser = async () => {
      const id = await createAnonymousUser();
      setUserId(id);
    };
    initializeUser();
  }, []);

  useEffect(() => {
    const saveToHistory = async () => {
      if (selectedCity && userId) {
        const storedHistory = await AsyncStorage.getItem("searchHistory");
        const history = storedHistory ? JSON.parse(storedHistory) : [];
        if (!history.includes(selectedCity)) {
          history.push(selectedCity);
          await AsyncStorage.setItem("searchHistory", JSON.stringify(history));
          setTriggerUpdate((prev) => !prev); // Forzar actualización del historial
        }
      }
    };
    saveToHistory();
  }, [selectedCity, userId]);

  return (
    <View style={styles.container}>
      {!selectedCity && (
        <MaterialCommunityIcons
          name="weather-cloudy"
          size={100}
          color="gray"
          style={styles.weatherIcon}
        />
      )}
      <Text style={styles.title}>Selecciona una ciudad</Text>
      <AutocompleteInput
        onSelect={(city) => setSelectedCity(city)}
      />
      <SearchHistory onSelect={(city) => setSelectedCity(city)} triggerUpdate={triggerUpdate} />
      {selectedCity ? (
        <WeatherInfo city={selectedCity} />
      ) : (
        <Text style={styles.placeholder}>Por favor selecciona una ciudad para ver el clima.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  weatherIcon: {
    marginBottom: 20,
  },
});
