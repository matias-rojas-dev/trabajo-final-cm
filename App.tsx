import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { DrawerNavigator } from './src/navigation/drawer.navigation'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StartScreen from './src/screens/StartScreen'
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoadingScreen from './src/screens/LoadingScreen';

const Stack = createNativeStackNavigator();

function MyStack () {
  return(
    <Stack.Navigator initialRouteName='Inicio'>
      <Stack.Screen name="Inicio" component={StartScreen}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Loading" component={LoadingScreen}/>
      <Stack.Screen name="Home" component={HomeScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}

