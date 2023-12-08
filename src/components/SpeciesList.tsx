import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: 400,
  }
});

const SpeciesList = ({ species }) => {
  return (
    <FlatList
      data={species}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text>{item.commonName} - {item.scientificName}</Text>
      )}
    />
  );
};

export default SpeciesList;