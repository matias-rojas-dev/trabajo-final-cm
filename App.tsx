import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { DrawerNavigator } from './src/navigation/drawer.navigation'

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}