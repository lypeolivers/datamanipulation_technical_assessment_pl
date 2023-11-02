import { Router } from "express";
import {
  createClientController,
  getClientController,
} from "../controllers/clients.controllers";

const clientsRouter = Router();

clientsRouter.get("", getClientController);
clientsRouter.post("", createClientController);

export default clientsRouter;
