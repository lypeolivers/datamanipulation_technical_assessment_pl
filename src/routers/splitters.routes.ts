import { Router } from "express";
import {
  createSplitterController,
  getSplitterController,
} from "../controllers/splitters.controllers";

const splittersRouter = Router();

splittersRouter.get("", getSplitterController);
splittersRouter.post("", createSplitterController);

export default splittersRouter;
