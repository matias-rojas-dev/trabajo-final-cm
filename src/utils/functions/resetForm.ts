import { ISighting } from '../../interfaces/sighting.interface'
import { defaultSighting } from '../data/defaultSighting'

export const resetForm = (
  setSighting: (sighting: ISighting) => void,
  setImageUri: (uri: string) => void
) => {
  setSighting(defaultSighting)
  setImageUri('')
}
