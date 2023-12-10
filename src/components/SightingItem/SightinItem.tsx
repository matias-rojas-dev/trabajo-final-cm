import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import Button from '../Button/Button'
import { ISighting } from '../../interfaces/sighting.interface'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DEFAULTIMG } from '../../imports/images/images.imports'

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
    <View style={styles.sightingItemContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SpeciesDetail', { sighting: sighting })
        }
      >
        <View style={styles.sightingItem}>
          <Image source={DEFAULTIMG} style={styles.sightingImage} />
          <View style={styles.sightingInfo}>
            <Text style={styles.sightingName}>{sighting.name}</Text>
            <Text style={styles.sightingDetails}>{sighting.type}</Text>
            <Text style={styles.sightingDetails}>{sighting.condition}</Text>
            <Text style={styles.sightingDetails}>
              Último avistamiento el {date.toLocaleDateString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Button
        text="Reportar"
        buttonStyle={styles.reportButton}
        textStyle={styles.textButton}
        onPress={() => navigation.navigate('FormScreen')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sightingItemContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal: 10,
  },
  sightingItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  sightingImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
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
  reportButton: {
    backgroundColor: '#5d9398',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: -3,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
