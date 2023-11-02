export interface IClient {
  address: string;
  box: string;
  lat: number;
  lng: number;
  name: string;
  code: string;
  status: number;
  project: string;
  auto_connect: boolean;
  force: boolean;
  implanted: boolean;
}

export interface IClientImport {
  Latitude: string;
  Longitude: string;
  Box: string;
  Status: string;
  Auto_connect: string;
  Force: string;
}
