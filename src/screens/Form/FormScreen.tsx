// FormScreen.tsx
import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button } from 'react-native'

export const FormScreen: React.FC = () => {
  const [fieldOne, setFieldOne] = useState('')
  const [fieldTwo, setFieldTwo] = useState('')
  const [fieldThree, setFieldThree] = useState('')

  const handleSubmit = () => {
    console.log(fieldOne, fieldTwo, fieldThree)
    // Handle the submission logic here
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={fieldOne}
        onChangeText={setFieldOne}
        placeholder="Field One"
      />
      <TextInput
        style={styles.input}
        value={fieldTwo}
        onChangeText={setFieldTwo}
        placeholder="Field Two"
      />
      <TextInput
        style={styles.input}
        value={fieldThree}
        onChangeText={setFieldThree}
        placeholder="Field Three"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
})
