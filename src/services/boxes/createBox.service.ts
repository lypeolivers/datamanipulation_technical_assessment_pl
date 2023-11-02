import { BoxModel } from "../../models/Box";

const createBoxService = async (payload: any): Promise<any> => {
  const box = await BoxModel.create(payload);

  return box;
};

export default createBoxService;
