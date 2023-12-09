import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { LOGOIMG } from '../../imports/images/images.imports'
import Button from '../../components/Button/Button'

export const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>BIENVENIDO A</Text>
        <Text style={styles.subtitle}>Nature Guard</Text>
      </View>
      <View style={styles.logoContainer}>
        <Image source={LOGOIMG} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="¡Bienvenid@!"
          buttonStyle={styles.buttonRegister}
          textStyle={styles.textRegister}
          onPress={() => navigation.navigate('LoginAndSignUp')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    width: '100%',
  },
  titlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft: 22,
    paddingTop: 60
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '80%'
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
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


