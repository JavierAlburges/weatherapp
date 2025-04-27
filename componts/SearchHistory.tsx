import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SearchHistoryProps {
  onSelect: (city: string) => void;
  triggerUpdate: boolean; // Nueva prop para forzar la actualización del historial
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelect, triggerUpdate }) => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const storedHistory = await AsyncStorage.getItem('searchHistory');
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        setHistory(parsedHistory.slice(-5)); // Mostrar solo las últimas 5 búsquedas
      }
    };
    loadHistory();
  }, [triggerUpdate]); // Actualizar el historial cuando cambie triggerUpdate

  const handleSelect = (city: string) => {
    onSelect(city);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Búsquedas</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Text style={styles.item}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default SearchHistory;