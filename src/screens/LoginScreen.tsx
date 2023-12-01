// src > screens > LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { FirebaseApp } from 'firebase/app';
import { firebaseConfig } from '../services/firebaseConfig';


const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleGoToRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log('Account created');
      navigation.navigate('Home');
    }).catch (error => {
      console.log('No es posible registrar su usuario. Error: ', error);
    })
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log('Account created');
      navigation.navigate('Home');
    }).catch (error => {
      console.log('No es posible iniciar sesión. Error: ', error);
      alert(error.message);
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BIENVENIDO A</Text>
      <Text style={styles.subtitle}>Nature Guard</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Inicia Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoToRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 48,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00ACEE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;