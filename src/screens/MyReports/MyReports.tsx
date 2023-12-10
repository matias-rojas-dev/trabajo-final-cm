import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native'
import { IMGPBird } from '../../utils/imports/imports'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { database } from '../../services/firebaseConfig'
import { useAuth } from '../../hooks/useAuth'
import { ISighting } from '../../interfaces/sighting.interface'
import { ScrollView } from 'react-native-gesture-handler'
import { SightingItemSkeleton } from '../../components/SightingItem/SightinItemSkeleton'
import { SightingItem } from '../../components/SightingItem/SightinItem'
import Button from '../../components/Button/Button'

export const MyReports = ({ navigation }) => {
  const { currentUser } = useAuth()
  const [items, setItems] = useState<ISighting[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isEmpty, setIsEmpty] = useState(false) // Nuevo estado para controlar si la lista está vacía

  useEffect(() => {
    if (currentUser) {
      const collectionRef = collection(database, 'florayfauna')
      const querySnapshot = query(
        collectionRef,
        orderBy('name', 'desc'),
        where('userId', '==', currentUser.uid)
      )

      const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
        const data: ISighting[] = snapshot.docs.map((doc) => ({
          ...(doc.data() as ISighting),
          id: doc.id,
        }))
        console.log(data)
        setItems(data)
        setIsEmpty(data.length === 0) // Establece isEmpty basado en si hay datos
        setLoading(false)
      })

      return () => {
        unsubscribe()
      }
    }
  }, [currentUser])

  return (
    <View style={styles.container}>
      {loading ? (
        [0, 1, 2].map((index) => <SightingItemSkeleton key={index} />)
      ) : isEmpty ? ( // Verifica si la lista está vacía
        <View style={styles.containerInfo}>
          <Text style={styles.defaultText}>
            Aún no has reportado avistamiento de algún ave
          </Text>
          <Button
            text="Reportar Avistamiento"
            buttonStyle={styles.buttonReport}
            textStyle={{ color: '#000' }}
            onPress={() => navigation.navigate('FormScreen')}
          />
        </View>
      ) : (
        <ScrollView>
          {items.map((sighting) => (
            <SightingItem
              key={sighting.id}
              sighting={sighting}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 22,
  },
  defaultText: {
    fontSize: 16,
    textAlign: 'center',
  },
  containerInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonReport: {
    backgroundColor: '#5d9398',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 50,
  },
})
