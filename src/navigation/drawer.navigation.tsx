import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Login from '../screens/Login/Login';
import Loading from '../screens/Loading/Loading';

export const DrawerNavigator = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Incio" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
