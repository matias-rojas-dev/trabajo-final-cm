import React, { createContext, useState, ReactNode } from 'react'
import { User, AuthContextType } from '../interfaces/auth.interfaces'

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

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
