import React from 'react' // Make sure to import React
import { NavigationContainer } from '@react-navigation/native'
import { DrawerNavigator } from './src/navigation/drawer.navigation'

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}

