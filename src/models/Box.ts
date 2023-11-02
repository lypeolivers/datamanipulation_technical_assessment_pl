import { model, Schema, Types } from "mongoose";
import { IBox } from "../types/Box";

const schema = new Schema<IBox>({
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  boxType: {
    type: String,
    required: true,
  },
  hierarchyLevel: {
    type: Number,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  implanted: {
    type: Boolean,
    default: true,
  },
});

export const BoxModel = model<IBox>("Box", schema);
