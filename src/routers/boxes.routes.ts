import { Router } from "express";
import {
  createBoxController,
  getBoxController,
} from "../controllers/boxes.controllers";
import validateBodyBox from "../middlewares/validateBodyBox";

const boxesRouter = Router();

boxesRouter.get("", getBoxController);
boxesRouter.post("", validateBodyBox, createBoxController);

export default boxesRouter;
