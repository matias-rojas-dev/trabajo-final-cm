import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'

interface Props {
  text: string
  buttonStyle: object
  textStyle: object
  onPress: () => void
}

const Button: React.FC<Props> = ({ text, buttonStyle, textStyle, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
})

export default Button
