import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface DetailItemProps {
  label: string
  name: string
}

const DetailItem = ({ label, name }: DetailItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}> {label} </Text>
      <Text style={styles.value}> {name} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  label: {
    width: '45%',
    textAlign: 'right',
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  value: {
    width: '45%',
    textAlign: 'left',
    fontSize: 16,
    color: '#555',
  },
})

export default DetailItem
