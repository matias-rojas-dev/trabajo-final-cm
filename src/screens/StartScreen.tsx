// src > screens > StartScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const StartScreen = () => {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadCustomFont() {
    try {
      await Font.loadAsync({
        'julius-sans-one': require('../../assets/Fonts/JuliusSansOne.ttf'),
        'commissioner-800': require('../../assets/Fonts/Commissioner.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts', error);
    }
  }

  useEffect(() => {
    loadCustomFont();
  }, []);

  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  }
  //if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.welcomeText}>Bienvenido a</Text>
          <Text style={styles.SubText}>Nature Guard</Text>
          <Image
            source={require('../../assets/Images/log-p.png')}
            style={styles.logo}
          />
        </View>
  
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>¡Comenzar!</Text>
        </TouchableOpacity>
      </View>
    );
  //}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    color: '#000000',
    fontFamily: 'julius-sans-one'
  },
  SubText: {
    fontFamily: 'commissioner-800',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#5D9398',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#00ACEE',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  logo: {
    width: 400,
    height: 400,
  }
});

export default StartScreen;
