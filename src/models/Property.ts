import { model, Schema, Types } from "mongoose";
import Client from "./Client";

export default interface Property {
  id: Types.ObjectId;
  address: string;
  project: string;
  box: string;
  lat: string;
  lng: string;
  force: boolean;
  auto_connect: boolean;
  client: Client;
}
