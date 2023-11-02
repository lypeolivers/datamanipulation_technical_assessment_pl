export interface IBox {
  name: string;
  lat: string;
  lng: string;
  boxType: string;
  implanted: boolean;
  project: string;
  hierarchyLevel: number;
}

export interface IBoxImport {
  Name: string;
  Latitude: string;
  Longitude: string;
  Type: string;
  Level: number;
}
