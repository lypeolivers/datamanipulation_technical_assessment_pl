import axios from "axios";
import "dotenv/config";

const api = axios.create({
  baseURL: process.env.URL_OZMAP_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: process.env.TOKEN_API,
  },
});

export default api;
