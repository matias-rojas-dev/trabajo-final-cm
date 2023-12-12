import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

export const firebaseConfig = {
  apiKey: 'AIzaSyD5bxH5KX_y93uxXzYE7JRfPIEKR3sxqDo',
  authDomain: 'natureguard-d77f5.firebaseapp.com',
  projectId: 'natureguard-d77f5',
  storageBucket: 'natureguard-d77f5.appspot.com',
  messagingSenderId: '1014905614315',
  appId: '1:1014905614315:web:dee91416adc9ced53e33ae',
  measurementId: 'G-QP79ET8WD3',
}
const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

const storage = getStorage(app)
const database = getFirestore(app)

export { auth, database, storage }

export async function uploadFile(fileUri: string): Promise<string> {
  const response = await fetch(fileUri)
  const blob = await response.blob()

  const storageRef = ref(storage, uuid.v4())

  const snapshot = await uploadBytes(storageRef, blob)
  const uriFile = await getDownloadURL(snapshot.ref)

  return uriFile
}
