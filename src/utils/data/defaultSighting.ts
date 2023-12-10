import { ISighting } from '../../interfaces/sighting.interface'

export const defaultSighting: ISighting = {
  id: '',
  worry: '',
  belonging: '',
  class: '',
  condition: '',
  family: '',
  name: '',
  region: '',
  scientificname: '',
  type: '',
  lastsighting: {
    seconds: 0,
    nanoseconds: 0,
  },
  location: {
    latitude: 0,
    longitude: 0,
  },
  image: '',
  userId: '',
}
