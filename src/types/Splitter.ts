export interface ISplitterRatio {
  output: number;
  input: number;
}

export interface ISplitter {
  name: string;
  splitterType: string;
  parent: string;
  implanted: boolean;
  ratio: ISplitterRatio;
  isDrop: boolean;
  project: string;
}

export interface ISplitterImport {
  Name: string;
  Type: string;
  Box: string;
  implanted: string;
  Inputs: number;
  Outputs: number;
  "Allows client connection": String;
}
