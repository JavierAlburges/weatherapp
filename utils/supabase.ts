import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import * as Crypto from 'expo-crypto';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })

export const WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json";
export const WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY || "";

// Función para obtener las ciudades favoritas de un usuario
export const getFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('city_name')
    .eq('user_id', userId);

  if (error) {
    console.error('Error al obtener favoritos:', error);
    return [];
  }

  return data?.map((item) => item.city_name) || [];
};

// Función para agregar una ciudad a favoritos
export const addFavorite = async (userId: string, cityName: string) => {
  const { error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, city_name: cityName }]);

  if (error) {
    console.error('Error al agregar favorito:', error);
    return false;
  }

  return true;
};

// Función para eliminar una ciudad de favoritos
export const removeFavorite = async (userId: string, cityName: string) => {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('city_name', cityName);

  if (error) {
    console.error('Error al eliminar favorito:', error);
    return false;
  }

  return true;
};

// Actualizamos la función para usar una fuente de números aleatorios más robusta
const generateUUID = async () => {
  const randomBytes = await Crypto.getRandomBytesAsync(16);

  // Ajustamos los bits para cumplir con la especificación UUID v4
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Versión 4
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Variante

  return [...randomBytes]
    .map((b, i) => (i === 4 || i === 6 || i === 8 || i === 10 ? '-' : '') + b.toString(16).padStart(2, '0'))
    .join('');
};

// Función para crear un usuario anónimo al iniciar la app
export const createAnonymousUser = async () => {
  const userId = await AsyncStorage.getItem('anonymous_user_id');
  if (!userId) {
    const newUserId = await generateUUID();
    await AsyncStorage.setItem('anonymous_user_id', newUserId);
    return newUserId;
  }
  return userId;
};