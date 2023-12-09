import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { StartScreen } from '../screens/Login/StartScreen'

export const DraweNavigator = () => {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="StartScreen" component={StartScreen} />
    </Drawer.Navigator>
  )
}
