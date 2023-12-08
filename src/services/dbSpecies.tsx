import { firestore } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Species } from '../interfaces/SpeciesInteface';

const addFloraFauna = async (species: Species) => {
  try {
    const docRef = await addDoc(collection(firestore, 'florayfauna'), {
      ...species,
      lastsighting: species.lastsighting, // Firestore maneja las fechas como Timestamp, así que asegúrate de convertirlas si es necesario
    });
    console.log('Documento añadido con ID: ', docRef.id);
  } catch (e) {
    console.error('Error al agregar documento: ', e);
  }
};

export { addFloraFauna };