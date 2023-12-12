import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface SightingInfoProps {
  name: string
  type: string
  condition: string
  date: string
}

export const SightingInfo: React.FC<SightingInfoProps> = ({
  name,
  type,
  condition,
  date,
}) => (
  <View style={styles.sightingInfo}>
    <Text style={styles.sightingName}>{name}</Text>
    <Text style={styles.sightingDetails}>{type}</Text>
    <Text style={styles.sightingDetails}>{condition}</Text>
    <Text style={styles.sightingDetails}>Último avistamiento el {date}</Text>
  </View>
)

const styles = StyleSheet.create({
  sightingInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  sightingName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  sightingDetails: {
    fontSize: 12,
    color: 'grey',
  },
})
