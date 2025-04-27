import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AutocompleteInputProps {
  onSelect: (value: string) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Delay de 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      onSelect(debouncedQuery);
    }
  }, [debouncedQuery, onSelect]);

  const handleInputChange = (text: string) => {
    setQuery(text);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleInputChange}
        placeholder="Escribe el nombre de la ciudad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default AutocompleteInput;