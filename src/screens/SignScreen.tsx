import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firestore } from '../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'

const SignScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation()

  const auth = getAuth();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addDoc(collection(firestore, 'users'), {
        name: name,
        email: email
      });
      console.log('Account created')
      navigation.navigate('WelcomeScreen')
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tus campos de TextInput y el botón de registro */}
      <TextInput value={name} onChangeText={setName} placeholder="Nombre" />
      <TextInput value={email} onChangeText={setEmail} placeholder="Correo electrónico" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Contraseña" secureTextEntry />
      <Button title="Registrarse" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  }
});

export default SignScreen;