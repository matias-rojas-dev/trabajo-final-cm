import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native'
import { IMGPBird } from '../../utils/imports/imports'
import DetailItem from '../../components/DetailItem/DetailItem'
import Button from '../../components/Button/Button'

interface SpeciesDetails {
  commonName: string
  scientificName: string
  class: string
  family: string
  location: string
  ownership: string
  condition: string
  status: string
  lastSeen: string
  imageUrl: string
}

const speciesDetails: SpeciesDetails[] = [
  {
    commonName: 'Rayadito 3',
    scientificName: 'Curaeus curaeus 2',
    class: 'Aves',
    family: 'Icteridae',
    location: 'Cerro San Cristóbal',
    ownership: 'Nativa',
    condition: 'Silvestre',
    status: 'Preocupación menor (LC)',
    lastSeen: '09/11/2023',
    imageUrl: 'path-to-your-species-image.jpg', // Cambia esto por la ruta real de tu imagen
  },
]

export const SpeciesDetail: React.FC = () => {
  return (
    <View>
      <Image source={IMGPBird} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.commonName}>{speciesDetails[0].commonName || 'Rayadito 2'}</Text>
        <View style={styles.lineStyle}></View> {/* Add this line */}
        {speciesDetails.map((species, index) => (
          <View key={index} style={styles.info}>
            <DetailItem
              label="Nombre Científico:"
              name={species.scientificName}
            />
            <DetailItem label="Clase:" name={species.class} />
            <DetailItem label="Fmailia:" name={species.family} />
            <DetailItem label="Localidad:" name={species.location} />
            <DetailItem label="Pertenencia:" name={species.ownership} />
            <DetailItem label="Condición:" name={species.condition} />
            <DetailItem label="Preocupación:" name={species.status} />
            <DetailItem label="Último avistamiento:" name={species.lastSeen} />
            <View style={styles.buttonContainer}>
              <Button
                text="Reportar Avistamiento"
                buttonStyle={styles.buttonReport}
                textStyle={styles.textRegister}
                onPress={() => console.log(1)}
              />
            </View>
          </View>
        ))}
      </View>
    </View >
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
    marginVertical: 10,
    width: '80%',
    margin: 'auto',
  },
  commonName: {
    fontSize: 24,
    textAlign: 'right',
    marginRight: 20,
    marginVertical: 20,
    textTransform: 'uppercase'
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
    width: '100%'
  },
  buttonReport: {
    backgroundColor: '#5d9398',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '50%'
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
  },
  textRegister: {
    color: '#FFFFFF',
  }
})
