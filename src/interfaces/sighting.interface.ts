export interface ISighting {
  id?: string
  worry: string
  belonging: string
  class: string
  condition: string
  family: string
  lastsighting: Date // Actualizado para ser un objeto Date
  location: {
    latitude: number
    longitude: number
  }
  name: string
  region: string
  scientificname: string
  type: string
}
