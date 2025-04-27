import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { WEATHER_API_URL, WEATHER_API_KEY, createAnonymousUser } from '../utils/supabase';
import { getFavorites, addFavorite, removeFavorite } from '../utils/supabase';

interface WeatherInfoProps {
  city: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${city}`);
        if (!response.ok) {
          throw new Error('Ciudad no encontrada');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  useEffect(() => {
    const initializeUserAndFavorites = async () => {
      const id = await createAnonymousUser();
      setUserId(id);
      const userFavorites = await getFavorites(id);
      setFavorites(userFavorites);
    };
    initializeUserAndFavorites();
  }, []);

  const handleAddFavorite = async () => {
    if (!userId) {
      Alert.alert("Error", "No se pudo obtener el ID del usuario");
      return;
    }
    const success = await addFavorite(userId, city);
    if (success) {
      setFavorites((prev) => [...prev, city]);
      Alert.alert("Éxito", "Ciudad agregada a favoritos");
    } else {
      Alert.alert("Error", "No se pudo agregar la ciudad a favoritos");
    }
  };

  const handleRemoveFavorite = async () => {
    if (!userId) {
      Alert.alert("Error", "No se pudo obtener el ID del usuario");
      return;
    }
    const success = await removeFavorite(userId, city);
    if (success) {
      setFavorites((prev) => prev.filter((fav) => fav !== city));
      Alert.alert("Éxito", "Ciudad eliminada de favoritos");
    } else {
      Alert.alert("Error", "No se pudo eliminar la ciudad de favoritos");
    }
  };

  const isFavorite = favorites.includes(city);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!weatherData) {
    return null;
  }

  const { temp_c, temp_f, condition, wind_kph, humidity } = weatherData.current;
  const { localtime } = weatherData.location;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima en {city}</Text>
      <Text style={styles.temperature}>{temp_c}°C / {temp_f}°F</Text>
      <View style={styles.conditionContainer}>
        <Image
          source={{ uri: `https:${condition.icon}` }}
          style={styles.icon}
        />
        <Text style={styles.condition}>{condition.text}</Text>
      </View>
      <Text style={styles.details}>Viento: {wind_kph} km/h</Text>
      <Text style={styles.details}>Humedad: {humidity}%</Text>
      <Text style={styles.details}>Hora local: {localtime}</Text>
      <View style={styles.actionRow}>
        {isFavorite ? (
          <FontAwesome
            name="trash"
            size={24}
            color="red"
            onPress={handleRemoveFavorite}
          />
        ) : (
          <FontAwesome
            name="star"
            size={24}
            color="gold"
            onPress={handleAddFavorite}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 18,
    marginBottom: 10,
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  condition: {
    fontSize: 16,
  },
  details: {
    fontSize: 14,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default WeatherInfo;