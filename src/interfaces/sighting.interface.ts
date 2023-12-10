export interface ISighting {
  id: string
  worry: string
  belonging: string
  class: string
  condition: string
  family: string
  lastsighting: {
    seconds: number
    nanoseconds: number
  }
  location: {
    latitude: number
    longitude: number
  }
  name: string
  region: string
  scientificname: string
  type: string
  image: string
}
