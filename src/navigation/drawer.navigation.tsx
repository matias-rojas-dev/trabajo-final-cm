import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { MainScreen } from '../screens/Main/MainScreen'
import { MyReports } from '../screens/MyReports/MyReports'
import { SpeciesDetail } from '../screens/SpeciesDetail/SpeciesDetail'
import { FormScreen } from '../screens/Form/FormScreen'
import { CameraContainer } from '../components/Camera/CameraContainer'
import { LoginAndSignUp } from '../screens/LoginAndSignUp/LoginAndSignUp'
import { LogoutComponent } from '../components/Logout/Logout'

export const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="LoginAndSignUp"
        component={LoginAndSignUp}
        options={{
          drawerItemStyle: { height: 0 },
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          drawerLabel: 'Reportes Globales',
          title: 'Reportes Globales',
        }}
      />
      {/* <Drawer.Screen
        name="Logout"
        component={LogoutComponent}
        options={{
          drawerLabel: 'Cerrar Sesión',
        }}
      /> */}
      <Drawer.Screen
        name="MyReports"
        component={MyReports}
        options={{ drawerLabel: 'Mis reportes', title: 'Mis reportes' }}
      />
      <Drawer.Screen
        name="FormScreen"
        component={FormScreen}
        options={{
          drawerLabel: 'Reportar Avistamiento',
          title: 'Reportar Avistamiento',
        }}
      />
      <Drawer.Screen
        name="SpeciesDetail"
        component={SpeciesDetail}
        options={{
          drawerItemStyle: { height: 0 },
          title: 'Detalle',
        }}
      />
      <Drawer.Screen
        name="CameraContainer"
        component={CameraContainer}
        options={{
          drawerItemStyle: { height: 0 },
          title: 'Fotografía',
        }}
      />
    </Drawer.Navigator>
  )
}
