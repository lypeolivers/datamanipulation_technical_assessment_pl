import mongoose from "mongoose";
import "dotenv/config";

export const db = {
  uri: process.env.DB_URL_CLUSTER || "",
};

const options = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDatabase: any = async () => {
  await mongoose
    .connect(db.uri, options)
    .then(() => {
      console.log("Mongoose connection done");
    })
    .catch((e) => {
      console.log("Mongoose connection error");
      console.error(e);
    });
};

export default connectDatabase;
