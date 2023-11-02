import { SplitterModel } from "../../models/Splitter";

const getSplitterService = async (): Promise<any[]> => {
  const splitter = await SplitterModel.find();
  return splitter;
};

export default getSplitterService;
