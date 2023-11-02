import { ClientModel } from "../../models/Client";

const getClientService = async (): Promise<any[]> => {
  const clients = await ClientModel.find();
  return clients;
};

export default getClientService;
