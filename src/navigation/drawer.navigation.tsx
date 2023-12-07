import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StartScreen } from '../screens/StartScreen'
import LoginScreen from '../screens/LoginScreen'
import { SpeciesDetails } from '../screens/SpeciesDetails/SpeciesDetails'

const Stack = createNativeStackNavigator()

export const DrawerNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SpeciesDetails"
        component={SpeciesDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
