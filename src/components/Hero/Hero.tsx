import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const Hero = () => {
  return (
    <View style={styles.titlesContainer}>
      <Text style={styles.title}>BIENVENIDO A</Text>
      <Text style={styles.subtitle}>Nature Guard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
})
