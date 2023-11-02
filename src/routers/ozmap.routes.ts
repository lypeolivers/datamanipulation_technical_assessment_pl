import { Router } from "express";
import {
  getOzmapController,
  postOzmapController,
} from "../controllers/ozmap.controllers";

const ozmapRouter = Router();

ozmapRouter.get("", getOzmapController);
ozmapRouter.post("", postOzmapController);

export default ozmapRouter;
