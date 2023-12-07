import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Login from '../screens/Login/Login';
import Loading from '../screens/Loading/Loading';
import MyReports from '../screens/MyReports/MyReports';
import SpeciesDetail from '../screens/SpeciesDetail/SpeciesDetail';
import LoginAndSignUp from '../screens/LoginAndSignUp/LoginAndSignUp';

export const DrawerNavigator = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Incio" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="LoginAndSignUp" component={LoginAndSignUp} options={{ headerShown: false }} />

      <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
      <Stack.Screen name="SpeciesDetail" component={SpeciesDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
