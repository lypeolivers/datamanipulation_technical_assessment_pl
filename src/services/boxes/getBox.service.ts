import { BoxModel } from "../../models/Box";

const getBoxService = async (): Promise<any[]> => {
  const boxes = await BoxModel.find();
  return boxes;
};

export default getBoxService;
