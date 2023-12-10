import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { database, firebaseConfig } from '../../services/firebaseConfig'
import Button from '../../components/Button/Button'
import { useAuth } from '../../hooks/useAuth'
import { transformFirebaseUser } from '../../utils/functions/transformFirebaseUser'
import { addDoc, collection } from 'firebase/firestore'
import { Loading } from '../Loading/Loading'

export const LoginAndSignUp: React.FC = () => {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  const handleGoToRegister = async () => {
    setLoading(true) // Inicia el loading
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userData = transformFirebaseUser(userCredential.user)
        await addDoc(collection(database, 'users'), {
          ...userData,
          name,
        })
        login({ ...userData, name })
        navigation.navigate('MainScreen')
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          error.message || 'Ocurrió un error al intentar crear el usuario.'
        )
      })
      .finally(() => setLoading(false))
  }

  const handleLogin = () => {
    setLoading(true) // Inicia el loading
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userData = transformFirebaseUser(userCredential.user)
        login(userData)
        navigation.navigate('MainScreen')
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          error.message || 'Ocurrió un error al intentar iniciar sesión.'
        )
      })
      .finally(() => setLoading(false)) // Termina el loading
  }

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>BIENVENIDO A</Text>
        <Text style={styles.subtitle}>Nature Guard</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nombre y Apellido"
        value={name}
        onChangeText={setName}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          text="Inicia Sesión"
          buttonStyle={styles.buttonLogin}
          textStyle={{ color: '#000' }}
          onPress={handleLogin}
        />
        <Button
          text="Regístrate"
          buttonStyle={styles.buttonRegister}
          textStyle={styles.textRegister}
          onPress={handleGoToRegister}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft: 22,
    paddingTop: 60,
  },
  title: {
    fontSize: 25,
    color: '#333',
    marginBottom: -10,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5d9398',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    width: '80%',
  },
  button: {
    backgroundColor: '#00ACEE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    width: '80%',
  },
  buttonLogin: {
    backgroundColor: 'transparent',
    borderColor: '#5d9398',
    borderWidth: 1,
    borderRadius: 20,
    color: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
  },
  buttonRegister: {
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
  textRegister: {
    color: '#FFFFFF',
  },
})
