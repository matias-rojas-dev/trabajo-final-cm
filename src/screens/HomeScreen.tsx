import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Species } from '../interfaces/SpeciesInteface';
import { firestore } from '../services/firebaseConfig';
import { collection, query, getDocs } from 'firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import SpeciesList from '../components/SpeciesList';

const HomeScreen = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [species, setSpecies] = useState<Species[]>([]);

  useEffect(() => {
    const fetchLocationAndSpecies = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de localización denegado');
        return;
      }
  
      let locationResult = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
  
      const q = query(collection(firestore, 'florayfauna'));
      const querySnapshot = await getDocs(q);
      const speciesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          location: {
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          },
          name: data.name,
          scientificname: data.scientificname,
          lastsighting: new Date(data.lastsighting.seconds * 1000),
        };
      });
      setSpecies(speciesData as Species[]);
    };
  
    fetchLocationAndSpecies();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={location}
        >
          {species.map((s) => (
            <Marker
              key={s.id}
              coordinate={{ latitude: s.location.latitude, longitude: s.location.longitude }}
              title={s.name}
              description={s.scientificname}
            />
          ))}
        </MapView>
      )}
      <SpeciesList species={species} />
    </View>
  );
};

export default HomeScreen;