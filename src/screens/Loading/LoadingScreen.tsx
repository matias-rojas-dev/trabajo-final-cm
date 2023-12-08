import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { LOGOIMG } from '../../imports/images.imports'
import { getAuth } from 'firebase/auth'

const WelcomeScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <View style={styles.container}>
      <Image source={LOGOIMG} style={styles.logo} />
      <Text style={styles.greeting}>👋 HOLA, {user?.displayName?.toUpperCase() || 'USUARIO'}!</Text>
      <Text style={styles.question}>¿QUÉ DESCUBRIREMOS HOY?</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150, 
    resizeMode: 'contain',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  swiper: {
    height: 200, 
    width: '100%', 
  },
})

export default WelcomeScreen
