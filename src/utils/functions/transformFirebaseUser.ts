import { User as FirebaseUser } from 'firebase/auth'
import { User } from '../../interfaces/auth.interfaces'

export const transformFirebaseUser = (firebaseUser: FirebaseUser): User => {
  return {
    email: firebaseUser.email || '',
    uid: firebaseUser.uid,
  }
}
