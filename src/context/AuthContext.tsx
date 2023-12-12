import React, { createContext, useState, ReactNode, useEffect } from 'react'
import { User, AuthContextType } from '../interfaces/auth.interfaces'
import { auth } from '../services/firebaseConfig'
import { transformFirebaseUser } from '../utils/functions/transformFirebaseUser'

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => {},
  logout: () => {},
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const transformedUser = transformFirebaseUser(user)
        setCurrentUser(transformedUser)
      } else {
        setCurrentUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const login = (userData: User) => {
    setCurrentUser(userData)
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
