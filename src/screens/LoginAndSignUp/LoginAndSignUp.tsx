
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import { firebaseConfig } from '../../services/firebaseConfig'
import { CreateAccount } from '../../components/CreateAccount/CreateAccount'
import { Loading } from '../Loading/Loading'
import { Login } from '../../components/Login/Login'

export const LoginAndSignUp: React.FC = () => {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      {isLogin ? (
        <Login auth={auth} setLoading={setLoading} />
      ) : (
        <CreateAccount setLoading={setLoading} />
      )}
      <View>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchText}>
            {' '}
            {isLogin ? 'Crea una nueva cuenta' : 'Ya tengo una cuenta'}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: 100,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  switchText: {
    backgroundColor: 'white',
    color: '#5d9398',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft: 22,
    paddingTop: 60,
  },
  title: {
    fontSize: 25,
    color: '#333',
    marginBottom: -10,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5d9398',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    width: '80%',
  },
  button: {
    backgroundColor: '#00ACEE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    width: '80%',
  },
  buttonLogin: {
    backgroundColor: 'transparent',
    borderColor: '#5d9398',
    borderWidth: 1,
    borderRadius: 20,
    color: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
  },
  buttonRegister: {
    backgroundColor: '#5d9398',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
  },
  textRegister: {
    color: '#FFFFFF',
  },
})
