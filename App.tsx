import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerNavigator } from './src/navigation/drawer.navigation'
import { AuthProvider } from './src/context/AuthContext'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </AuthProvider>
  )
}
