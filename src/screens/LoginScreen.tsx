import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseApp } from 'firebase/app'
import { firebaseConfig } from '../services/firebaseConfig'
import Button from '../components/Button/Button'


const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const handleGoToRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Account created')
        console.log(auth)
        navigation.navigate('SpeciesDetails')
      }).catch(error => {
        console.log('No es posible registrar su usuario. Error: ', error)
      })
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Account created')
        console.log(auth)
        navigation.navigate('SpeciesDetails')
      }).catch(error => {
        console.log('No es posible iniciar sesión. Error: ', error)
        alert(error.message)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>BIENVENIDO A</Text>
        <Text style={styles.subtitle}>Nature Guard</Text>
      </View>
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
    paddingTop: 60
  },
  title: {
    fontSize: 25,
    color: '#333',
    marginBottom: - 10
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
    width: '80%'
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
    width: '80%'
  },
  buttonLogin: {
    backgroundColor: 'transparent',
    borderColor: '#5d9398',
    borderWidth: 1,
    borderRadius: 20,
    color: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10, // Adjust the margin as necessary
    width: '100%'
  },
  buttonRegister: {
    backgroundColor: '#5d9398',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%'
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
  },
  textRegister: {
    color: '#FFFFFF',
  }
})

export default LoginScreen