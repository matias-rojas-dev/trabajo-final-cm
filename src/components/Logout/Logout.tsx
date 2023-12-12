import React, { useEffect, useContext } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../context/AuthContext'

export const LogoutComponent: React.FC = () => {
  const navigation = useNavigation()
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        logout({ email: '', uid: '', name: '' })
        navigation.navigate('LoginAndSignUp')
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error)
      })
  }, [logout, navigation])

  return null
}
