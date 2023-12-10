import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { database } from '../../services/firebaseConfig'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { SightingItem } from '../../components/SightingItem/SightinItem'
import { ISighting } from '../../interfaces/sighting.interface'

export const MainScreen: React.FC = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [items, setItems] = useState<ISighting[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [markers, setMarkers] = useState([
    {
      latitude: -33.437,
      longitude: -70.634411,
    },
  ])

  useEffect(() => {
    const collectionRef = collection(database, 'florayfauna')
    const querySnapshot = query(collectionRef, orderBy('name', 'desc'))

    const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
      const data: ISighting[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as ISighting),
      }))
      setItems(data)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const pressMarker = (event: any) => {
    const localMarkers = markers
    setMarkers([...localMarkers, event.nativeEvent.coordinate])
  }

  const filteredSightings = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <MapView
        onPress={pressMarker}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        {markers.map(({ latitude, longitude }, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          ></Marker>
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('FormScreen')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.scrollViewContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar..."
            autoCapitalize="none"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#5d9398" />
        ) : (
          <ScrollView style={styles.scrollView}>
            {filteredSightings.map((sighting) => (
              <SightingItem
                key={sighting.id}
                sighting={sighting}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: '55%', // Adjust the position as needed
    backgroundColor: '#5d9398',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 50, // This should be the same as your button height to vertically align the text
  },
  map: {
    height: '50%',
  },
  markerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  sightingItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  scrollViewContainer: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    height: '50%',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  input: {
    flex: 0.5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#5d9398',
    padding: 10,
    fontSize: 16,
    marginTop: 10,
  },
  searchButton: {
    backgroundColor: '#5d9398',
    borderRadius: 20,
    padding: 10,
  },
  sightingImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sightingInfo: {
    flex: 1,
    paddingHorizontal: 5,
  },
  sightingName: {
    fontWeight: 'bold',
  },
  sightingDetails: {
    fontSize: 12,
  },
  reportButton: {
    backgroundColor: '#5d9398',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '30%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
  },
  textButton: {
    color: '#FFFFFF',
  },
})
