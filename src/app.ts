import express, { Application } from "express";
import {
  boxesRouter,
  clientsRouter,
  ozmapRouter,
  splittersRouter,
} from "./routers";
import { handleError } from "./errors";

const app: Application = express();
app.use(express.json());

app.use("/ozmap", ozmapRouter);
app.use("/boxes", boxesRouter);
app.use("/splitters", splittersRouter);
app.use("/clients", clientsRouter);

app.use(handleError);

export default app;
