import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

import { database, firebaseConfig } from '../../services/firebaseConfig'
import { useAuth } from '../../hooks/useAuth'
import { transformFirebaseUser } from '../../utils/functions/transformFirebaseUser'
import { IMGLogo } from '../../utils/imports/imports'
import Button from '../Button/Button'
import { Hero } from '../Hero/Hero'

interface CreateAccountProps {
  setLoading: (loading: boolean) => void
}

export const CreateAccount: React.FC<CreateAccountProps> = ({ setLoading }) => {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const { login } = useAuth()
  const navigation = useNavigation()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleGoToRegister = async () => {
    setLoading(true)
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

  return (
    <View style={styles.container}>
      <Hero />
      <Image source={IMGLogo} />
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
  switchText: {
    marginTop: 20,
    color: '#5d9398',
    fontWeight: 'bold',
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
  buttonContainer: {
    alignItems: 'center',
  },
  buttonRegister: {
    backgroundColor: '#5d9398',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  textRegister: {
    color: '#FFFFFF',
  },
})
