export interface Species {
  id?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  name: string;
  scientificname: string;
  type: string;
  worry: string;
  belonging: string;
  class: string;
  condition: string;
  family: string;
  lastsighting: Date;
}