import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { IMGPBird } from '../../utils/imports/imports';
import DetailItem from '../../components/DetailItem/DetailItem';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SpeciesDetails {
  commonName: string;
  scientificName: string;
  class: string;
  family: string;
  location: string;
  ownership: string;
  condition: string;
  status: string;
  lastSeen: string;
  imageUrl: string;
}

const speciesDetails: SpeciesDetails[] = [{
  commonName: 'Rayadito 3',
  scientificName: 'Curaeus curaeus 2',
  class: 'Aves',
  family: 'Icteridae',
  location: 'Cerro San Cristóbal',
  ownership: 'Nativa',
  condition: 'Silvestre',
  status: 'Preocupación menor (LC)',
  lastSeen: '09/11/2023',
  imageUrl: 'path-to-your-species-image.jpg', // Cambia esto por la ruta real de tu imagen
}]

const SpeciesDetail: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={IMGPBird} style={styles.image} />
      <View style={styles.detailsContainer}>
        {speciesDetails.map((species, index) => (
          <View key={index} style={styles.info}>
            <DetailItem label='Nombre Científico:' name={species.scientificName} />
            <DetailItem label='Clase:' name={species.class} />
            <DetailItem label='Fmailia:' name={species.family} />
            <DetailItem label='Localidad:' name={species.location} />
            <DetailItem label='Pertenencia:' name={species.ownership} />
            <DetailItem label='Condición:' name={species.condition} />
            <DetailItem label='Preocupación:' name={species.status} />
            <DetailItem label='Último avistamiento:' name={species.lastSeen} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: '100%',
    height: 300, // Ajustar según la imagen
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  commonName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  info: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 120, // Ajustar según el diseño
  },
  value: {
    flex: 1,
  },
  reportButton: {
    backgroundColor: '#4CAF50', // Ajustar el color según el diseño
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpeciesDetail;
