import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StartScreen } from '../screens/Login/StartScreen'
import { LoginAndSignUp } from '../screens/LoginAndSignUp/LoginAndSignUp'
import { SpeciesDetail } from '../screens/SpeciesDetail/SpeciesDetail'
import { MainScreen } from '../screens/Main/MainScreen'
import { FormScreen } from '../screens/Form/FormScreen'

const Stack = createNativeStackNavigator()

export const StackNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginAndSignUp"
        component={LoginAndSignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormScreen"
        component={FormScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
