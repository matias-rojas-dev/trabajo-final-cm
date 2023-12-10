import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button as RNButton,
  Alert,
  Image,
} from 'react-native'
import { ISighting } from '../../interfaces/sighting.interface'
import { Input } from '../../components/Input/Input'
import { getLabel } from '../../utils/data/getLabel'
import Button from '../../components/Button/Button'
import { addDoc, collection } from 'firebase/firestore'
import { database, uploadFile } from '../../services/firebaseConfig'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import useLocation from '../../hooks/useLocation'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const FormScreen: React.FC = () => {
  const navigation = useNavigation()
  const { location, error: locationError, getLocationRegion } = useLocation()
  const [imageUri, setImageUri] = useState<string>('')
  const [sighting, setSighting] = useState<ISighting>({
    worry: 'sdfh',
    belonging: 'dfh',
    class: 'sdfh',
    condition: 'shdfh',
    family: 'sdfh',
    name: 'qwet',
    region: 'qwet',
    scientificname: 'qwet',
    type: 'qwet',
    lastsighting: {
      seconds: 0,
      nanoseconds: 0,
    },
    location: {
      latitude: 0,
      longitude: 0,
    },
    image: '',
  })

  const handleChange = (name: keyof ISighting) => (value: string) => {
    setSighting((prevSighting) => ({ ...prevSighting, [name]: value }))
  }

  const handlePhotoCaptured = (uri: string) => {
    setImageUri(uri)
  }

  const handleSubmit = async () => {
    try {
      const uriFile = await uploadFile(imageUri)
      setSighting((prevSighting) => ({ ...prevSighting, image: uriFile }))

      const docRef = await addDoc(collection(database, 'florayfauna'), {
        ...sighting,
        image: uriFile,
      })

      Alert.alert('Éxito', 'Avistamiento registrado con éxito.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch (error) {
      console.error('Error al enviar datos:', error)
      Alert.alert('Error', 'Ocurrió un error al enviar los datos.')
    }
  }

  useEffect(() => {
    if (location) {
      const fetchRegion = async () => {
        const regionName = await getLocationRegion(
          location.coords.latitude,
          location.coords.longitude
        )
        setSighting((prevSighting) => ({
          ...prevSighting,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          region: regionName || '',
        }))
      }

      fetchRegion()
    }
  }, [location, getLocationRegion])
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Reportar Avistamiento</Text>
      {imageUri ? (
        <View style={styles.containerPreviewImage}>
          <Image source={{ uri: imageUri }} style={styles.capturedImage} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() =>
            navigation.navigate('CameraContainer', {
              onPhotoCaptured: handlePhotoCaptured,
            })
          }
        >
          <Text style={styles.cameraButtonText}>Open Camera</Text>
        </TouchableOpacity>
      )}
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {Object.keys(sighting).map((key, index) => {
            if (typeof sighting[key as keyof ISighting] === 'string') {
              return (
                <Input
                  key={index}
                  label={getLabel(key)}
                  value={sighting[key as keyof ISighting] as string}
                  onChangeText={handleChange(key as keyof ISighting)}
                />
              )
            }
            return null
          })}
          <Button
            text="Registrar"
            buttonStyle={styles.reportButton}
            textStyle={styles.buttonText}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  containerPreviewImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 13,
  },
  capturedImage: {
    width: '80%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  cameraButton: {
    backgroundColor: '#5d9398',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  cameraButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  title: {
    color: '#000',
    fontSize: 24,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  reportButton: {
    backgroundColor: '#5d9398',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
  },
  textButton: {
    color: '#FFFFFF',
  },
  locationInfo: {
    padding: 20,
  },
})
