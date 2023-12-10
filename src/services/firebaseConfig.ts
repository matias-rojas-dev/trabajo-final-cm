import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
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

initializeApp(firebaseConfig)

const storage = getStorage(initializeApp(firebaseConfig))

export async function uploadFile(fileUri: string): Promise<string> {
  const response = await fetch(fileUri)
  const blob = await response.blob()

  const storageRef = ref(storage, uuid.v4())

  const snapshot = await uploadBytes(storageRef, blob)
  const uriFile = await getDownloadURL(snapshot.ref)

  return uriFile
}

export const database = getFirestore()
