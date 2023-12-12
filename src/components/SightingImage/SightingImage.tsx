import React from 'react'
import { DEFAULTIMG } from '../../imports/images/images.imports'
import { Image, StyleSheet } from 'react-native'

interface SightingImageProps {
  imageUrl?: string
}

export const SightingImage: React.FC<SightingImageProps> = ({ imageUrl }) => (
  <Image
    source={{ uri: imageUrl || DEFAULTIMG }}
    style={styles.sightingImage}
  />
)

const styles = StyleSheet.create({
  sightingImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
})
