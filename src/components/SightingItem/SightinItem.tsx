import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import { BIRDIMG } from '../../imports/images/images.imports'
import Button from '../Button/Button'
import { ISighting } from '../../interfaces/sighting.interface'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface SightingItemProps {
  sighting: ISighting
  navigation: any
}

export const SightingItem: React.FC<SightingItemProps> = ({
  sighting,
  navigation,
}) => {
  const date = new Date(sighting.lastsighting.seconds * 1000)

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SpeciesDetail', { sighting: sighting })
      }
    >
      <View style={styles.sightingItem}>
        <Image source={BIRDIMG} style={styles.sightingImage} />
        <View style={styles.sightingInfo}>
          <Text style={styles.sightingName}>{sighting.name}</Text>
          <Text style={styles.sightingDetails}>{sighting.type}</Text>
          <Text style={styles.sightingDetails}>{sighting.condition}</Text>
          <Text style={styles.sightingDetails}>
            Último avistamiento el {date.toLocaleDateString()}
          </Text>
        </View>
        <Button
          text="Reportar"
          buttonStyle={styles.reportButton}
          textStyle={styles.textButton}
          onPress={() => console.log(1)}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  sightingItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  scrollViewContainer: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    height: '50%',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  input: {
    flex: 0.5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#5d9398',
    padding: 10,
    fontSize: 16,
    marginTop: 10,
  },
  searchButton: {
    backgroundColor: '#5d9398',
    borderRadius: 20,
    padding: 10,
  },
  sightingImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sightingInfo: {
    flex: 1,
    paddingHorizontal: 5,
  },
  sightingName: {
    fontWeight: 'bold',
  },
  sightingDetails: {
    fontSize: 12,
  },
  reportButton: {
    backgroundColor: '#5d9398',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '30%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
  },
  textButton: {
    color: '#FFFFFF',
  },
})
