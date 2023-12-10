import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, ActivityIndicator } from 'react-native'
import { IMGPBird } from '../../utils/imports/imports'
import DetailItem from '../../components/DetailItem/DetailItem'
import Button from '../../components/Button/Button'
import { ISighting } from '../../interfaces/sighting.interface'
import { RouteProp } from '@react-navigation/native'

type SpeciesDetailRouteProp = RouteProp<
  { SpeciesDetail: { sighting: ISighting } },
  'SpeciesDetail'
>

interface SpeciesDetailProps {
  route: SpeciesDetailRouteProp
}
export const SpeciesDetail: React.FC<SpeciesDetailProps> = ({ route }) => {
  const { sighting } = route.params

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sighting) {
      setIsLoading(false)
    }
  }, [sighting])

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <View>
      <Image source={{ uri: sighting.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.commonName}>{sighting.name}</Text>
        <View style={styles.lineStyle}></View>
        <View style={styles.info}>
          <DetailItem
            label="Nombre Científico:"
            name={sighting.scientificname}
          />
          <DetailItem label="Clase:" name={sighting.class} />
          <DetailItem label="Familia:" name={sighting.family} />
          <DetailItem label="Localidad:" name={sighting.region} />
          <DetailItem label="Condición:" name={sighting.condition} />
          <DetailItem label="Tipo:" name={sighting.type} />
          <DetailItem
            label="Último avistamiento:"
            name={new Date(
              sighting.lastsighting.seconds * 1000
            ).toLocaleDateString()}
          />
          {/* Add other details you want to display */}
          <View style={styles.buttonContainer}>
            <Button
              text="Reportar Avistamiento"
              buttonStyle={styles.buttonReport}
              textStyle={styles.textRegister}
              onPress={() => console.log('Reportar Avistamiento')}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  lineStyle: {
    borderBottomColor: '#5d9398',
    borderBottomWidth: 2,
    alignSelf: 'stretch',
  },
  commonName: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 20,
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  info: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 120,
  },
  value: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
  buttonReport: {
    backgroundColor: '#5d9398',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '50%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
  },
  textRegister: {
    color: '#FFFFFF',
  },
})
