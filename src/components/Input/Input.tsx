import React from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'

interface SightingInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
}

export const Input: React.FC<SightingInputProps> = ({
  label,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#5d9398',
    padding: 10,
  },
})
