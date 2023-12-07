import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { LOGOIMG } from '../../imports/images.imports'

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={LOGOIMG} style={styles.logo} />
      <Text style={styles.greeting}>👋 ¡HOLA, SERGIO!</Text>
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
    width: 150, // Ajusta esto según el tamaño de tu imagen
    height: 150, // Ajusta esto según el tamaño de tu imagen
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
    height: 200, // Ajusta la altura como sea necesario
    width: '100%', // Ajusta el ancho como sea necesario
  },
  // Agrega estilos adicionales para cada slide del Swiper aquí si es necesario
})

export default WelcomeScreen
