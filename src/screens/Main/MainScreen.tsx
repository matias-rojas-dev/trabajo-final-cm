import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { database } from '../../services/firebaseConfig'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { SightingItem } from '../../components/SightingItem/SightinItem'
import { ISighting } from '../../interfaces/sighting.interface'
import { SightingItemSkeleton } from '../../components/SightingItem/SightinItemSkeleton'
import { useNavigation } from '@react-navigation/native'
import { DEFAULTIMG } from '../../imports/images/images.imports'
import { useAuth } from '../../hooks/useAuth'

export const MainScreen: React.FC = () => {
  const { currentUser } = useAuth()
  console.log(currentUser)
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [items, setItems] = useState<ISighting[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const collectionRef = collection(database, 'florayfauna')
    const querySnapshot = query(collectionRef, orderBy('name', 'desc'))

    const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
      const data: ISighting[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as ISighting),
        id: doc.id,
      }))
      setItems(data)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const filteredSightings = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  )

  const onImageLoadEnd = (id: string) => {
    setLoadedImages((prevState) => ({ ...prevState, [id]: true }))
  }

  return (
    <View style={styles.container}>
      <MapView onPress={() => {}} style={styles.map} provider={PROVIDER_GOOGLE}>
        {filteredSightings.map((sighting) => (
          <Marker
            key={sighting.id}
            coordinate={{
              latitude: sighting.location.latitude,
              longitude: sighting.location.longitude,
            }}
            onPress={() => navigation.navigate('SpeciesDetail', { sighting })}
          >
            <View style={styles.markerContainer}>
              <Image
                // source={{ uri: sighting.image }}
                source={DEFAULTIMG}
                style={styles.markerImage}
                onLoadEnd={() => onImageLoadEnd(sighting.id)}
              />
            </View>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('FormScreen')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.contentArea}>
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
          [0, 1, 2].map((index) => <SightingItemSkeleton key={index} />)
        ) : (
          <ScrollView style={styles.scrollContainer}>
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
  map: {
    height: '50%',
  },
  contentArea: {
    flex: 1,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
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
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: '55%',
    backgroundColor: '#5d9398',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 50,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  scrollContainer: {
    backgroundColor: '#F7F7F7',
  },
})
