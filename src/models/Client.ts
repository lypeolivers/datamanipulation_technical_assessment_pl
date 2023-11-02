import { model, Schema, Types } from "mongoose";
import { IClient } from "../types/Client";

const schema = new Schema<IClient>({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  box: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  auto_connect: {
    type: Boolean,
    required: true,
  },
  force: {
    type: Boolean,
    required: true,
  },
  implanted: {
    type: Boolean,
    required: true,
  },
});

export const ClientModel = model<IClient>("Client", schema);
