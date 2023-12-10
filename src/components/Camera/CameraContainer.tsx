import { useState } from 'react'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CameraPreview } from '../CameraPreview/CameraPreview'
import { useNavigation } from '@react-navigation/native'
let camera: Camera | null

export const CameraContainer = ({ route }) => {
  const navigation = useNavigation()
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [fileUri, setFileUri] = useState('')

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
    } else {
      console.log('No ')
    }
  }

  if (!permission) {
    return (
      <View>
        <Text>No tienes los permisos</Text>
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    )
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  const takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setFileUri(photo.uri)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    startCamera()
  }

  const savePhoto = async () => {
    await MediaLibrary.saveToLibraryAsync(fileUri)
    if (route.params?.onPhotoCaptured) {
      route.params.onPhotoCaptured(fileUri)
    }
    navigation.navigate('FormScreen')
  }

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <CameraPreview
          photo={capturedImage}
          savePhoto={savePhoto}
          retakePicture={retakePicture}
        />
      ) : (
        <Camera
          style={{ flex: 1 }}
          ref={(r) => {
            camera = r
          }}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                padding: 20,
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: '#fff',
                  }}
                />
              </View>
            </View>
          </View>
        </Camera>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})
