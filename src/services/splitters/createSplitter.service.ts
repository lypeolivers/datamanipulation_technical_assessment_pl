import { SplitterModel } from "../../models/Splitter";

const createSplitterService = async (payload: any): Promise<any> => {
  const splitter = new SplitterModel({
    Name: "Nome",
    Type: "latitude",
    Box: "longitude",
    implanted: "type",
    Inputs: "level",
    Outputs: "outputs",
    "Allows client connection": "true",
    Project: "C7",
  });
  await splitter.save();
  return splitter;
};

export default createSplitterService;
