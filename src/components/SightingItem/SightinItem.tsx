import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { ISighting } from '../../interfaces/sighting.interface'
import { SightingImage } from '../SightingImage/SightingImage'
import { SightingInfo } from '../SightingInfo/SightingInfo'
import Button from '../Button/Button'

interface SightingItemProps {
  sighting: ISighting
  navigation: any
}

export const SightingItem: React.FC<SightingItemProps> = ({
  sighting,
  navigation,
}) => {
  const date = new Date(
    sighting.lastsighting.seconds * 1000
  ).toLocaleDateString()
  const navigateToDetail = () =>
    navigation.navigate('SpeciesDetail', { sighting })

  return (
    <View style={styles.sightingItemContainer}>
      <TouchableOpacity onPress={navigateToDetail}>
        <View style={styles.sightingItem}>
          <SightingImage imageUrl={sighting.image} />
          <SightingInfo
            name={sighting.name || 'No se menciona'}
            type={sighting.type || 'No se menciona'}
            condition={sighting.condition || 'No se menciona'}
            date={date}
          />
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
