import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { db } from '../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const HomeScreen: React.FC = () => {
  const [species, setSpecies] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setMapRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  useEffect(() => {
    const fetchSpecies = async () => {
      const querySnapshot = await getDocs(collection(db, 'florayfauna'));
      const speciesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const { location, ...rest } = data;
        const [latitude, longitude] = location.split(',').map(Number); // Assuming the location is a string "lat,long"
        return { id: doc.id, location: { latitude, longitude }, ...rest };
      });
      setSpecies(speciesData);
    };

    fetchSpecies();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {mapRegion && (
        <MapView
          style={styles.map}
          region={mapRegion}
          onRegionChangeComplete={region => setMapRegion(region)}
        >
          {species.map((specie) => (
            <Marker
              key={specie.id}
              coordinate={specie.location}
                
              description={specie.scientificname}
            />
          ))}
        </MapView>
      )}
      <ScrollView style={styles.speciesList}>
        {species.map((specie) => (
          <View key={specie.id} style={styles.listItem}>
            {/* Use Image component with specie.image if you have image urls */}
            <Text>{specie.name}</Text>
            {/* ... Other details */}
            <TouchableOpacity style={styles.button} onPress={() => {/* Handle report action */}}>
              <Text>Reportar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
  },
  speciesList: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: '#ddd',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;