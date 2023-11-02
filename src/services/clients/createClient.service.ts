import { ClientModel } from "../../models/Client";

const createClientService = async (payload: any): Promise<any> => {
  const client = new ClientModel({
    Name: "Nome",
    Cod: "Code",
    Latitude: "latitude",
    Longitude: "longitude",
    Box: "Box",
    Status: "Status",
    Address: "Address",
    Project: "C7",
    Auto_connect: "Auto connect",
    Force: "force",
  });
  await client.save();
  return client;
};

export default createClientService;
