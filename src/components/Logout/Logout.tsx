import React, { useEffect, useContext } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../context/AuthContext'

export const LogoutComponent = () => {
  const navigation = useNavigation()
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        logout()
        navigation.navigate('LoginAndSignUp')
      })
      .catch((error) => {})
  }, [logout, navigation])

  return null
}
