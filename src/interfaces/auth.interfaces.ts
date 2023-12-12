export interface User {
  email: string
  name?: string
  uid: string
}

export interface AuthContextType {
  currentUser: User | null
  login: (userData: User) => void
  logout: (userData: User) => void
}
