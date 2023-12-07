import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageSourcePropType
} from 'react-native'
import { IMGPBird } from '../../utils/imports/imports'

interface ReportProps {
  id: string
  name: string
  category: string
  coordinates: string,
  date: string
  imageUrl: ImageSourcePropType
}

const reportsData: ReportProps[] = [
  {
    id: '1',
    name: 'Rayadito',
    category: 'Fauna/Aves',
    coordinates: '33.420938, -70.603813',
    date: 'Último avistamiento el 09/11/2023',
    imageUrl: IMGPBird,
  },
  {
    id: '2',
    name: 'Rayadito',
    category: 'Fauna/Aves',
    coordinates: '33.386930, -70.608393',
    date: 'Último avistamiento el 27/11/2022',
    imageUrl: IMGPBird,
  },
]

const MyReports = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MIS REPORTES</Text>
      <FlatList
        data={reportsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportItem}>
            <Image source={item.imageUrl} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>{item.category}</Text>
              <Text style={styles.details}>{item.coordinates}</Text>
              <Text style={styles.details}>{item.date}</Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Descargar reporte</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 22,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  reportItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  downloadButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default MyReports
