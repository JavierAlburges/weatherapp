import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { createAnonymousUser } from '../utils/supabase';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    createAnonymousUser();
  }, []);

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ 
        headerTitle: 'Clima App', 
        headerStyle: { backgroundColor: '#87CEEB' }, 
        headerTitleAlign: 'center' // Centrar el título
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
