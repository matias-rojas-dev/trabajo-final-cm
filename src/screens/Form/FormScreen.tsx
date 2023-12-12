import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { addDoc, collection } from 'firebase/firestore'
import { database, uploadFile } from '../../services/firebaseConfig'

import { Input } from '../../components/Input/Input'
import useLocation from '../../hooks/useLocation'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/Button/Button'

import { resetForm } from '../../utils/functions/resetForm'
import { defaultSighting } from '../../utils/data/defaultSighting'
import { ISighting } from '../../interfaces/sighting.interface'
import { getLabel } from '../../utils/data/getLabel'
import { getCurrentTimestamp } from '../../utils/functions/getCurrentTime'

export const FormScreen: React.FC = () => {
  const navigation = useNavigation()
  const { currentUser } = useAuth()

  const { location, error: locationError, getLocationRegion } = useLocation()
  const [imageUri, setImageUri] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [sighting, setSighting] = useState<ISighting>(defaultSighting)

  const handleChange = (name: keyof ISighting) => (value: string) => {
    setSighting((prevSighting) => ({ ...prevSighting, [name]: value }))
  }

  const handlePhotoCaptured = (uri: string) => {
    setImageUri(uri)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const uriFile = await uploadFile(imageUri)
      await addDoc(collection(database, 'florayfauna'), {
        ...sighting,
        image: uriFile,
        userId: currentUser?.uid,
        lastsighting: getCurrentTimestamp(),
        region: 'Región Metropolitana',
      })

      Alert.alert('Éxito', 'Avistamiento registrado con éxito.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('MainScreen')
            resetForm(setSighting, setImageUri)
          },
        },
      ])
    } catch (error) {
      console.error('Error al enviar datos:', error)
      Alert.alert('Error', 'Ocurrió un error al enviar los datos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (location) {
      const fetchRegion = async () => {
        const regionName = await getLocationRegion(
          location.coords.latitude || 0,
          location.coords.longitude || 0
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          {imageUri ? (
            <View style={styles.containerPreviewImage}>
              <Image source={{ uri: imageUri }} style={styles.capturedImage} />
            </View>
          ) : (
            <View style={styles.cameraContainer}>
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
            </View>
          )}
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
              {Object.keys(sighting)
                .filter(
                  (key) =>
                    key !== 'id' &&
                    key !== 'image' &&
                    key !== 'userId' &&
                    key !== 'region'
                )
                .map((key, index) => {
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
        </>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  cameraContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
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
    width: '50%',
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
