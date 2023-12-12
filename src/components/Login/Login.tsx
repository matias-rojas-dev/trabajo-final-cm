import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Auth, signInWithEmailAndPassword } from 'firebase/auth'

import Button from '../Button/Button'
import { useAuth } from '../../hooks/useAuth'
import { transformFirebaseUser } from '../../utils/functions/transformFirebaseUser'
import { IMGLogo } from '../../utils/imports/imports'
import { Hero } from '../Hero/Hero'

interface LoginProps {
  auth: Auth
  setLoading: (loading: boolean) => void
}

export const Login: React.FC<LoginProps> = ({ auth, setLoading }) => {
  const navigation = useNavigation()
  const { login } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userData = transformFirebaseUser(userCredential.user)
        login(userData)
        navigation.navigate('MainScreen')
      })
      .catch((error) => {
        Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión.')
      })
      .finally(() => setLoading(false))
  }

  return (
    <View style={styles.container}>
      <Hero />

      <Image source={IMGLogo} />

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
})
