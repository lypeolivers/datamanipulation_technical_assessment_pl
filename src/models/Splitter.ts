import { model, Schema, Types } from "mongoose";

export default interface Splitter {
  id: Types.ObjectId;
  name: string;
  splitterType: string;
  parent: string;
  implanted: boolean;
  ratio: {
    output: number;
    input: number;
  };
  isDrop: boolean;
  project: string;
}

const schema = new Schema<Splitter>({
  name: {
    type: String,
    required: true,
  },
  splitterType: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
  implanted: {
    type: Boolean,
    required: true,
  },
  ratio: {
    output: {
      type: Number,
      required: true,
    },
    input: {
      type: Number,
      required: true,
    },
  },
  isDrop: {
    type: Boolean,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
});

export const SplitterModel = model<Splitter>("Splitter", schema);
