import { Request, Response } from "express";
import * as path from "path";
import { postOzmapService, readOzmapService } from "../services";

let filePath = path.resolve(__dirname, "../../files/data.xls");
let testFilePath = path.resolve(__dirname, "../../files/test.xls");

if (process.env.APP_ENV == "test") {
  filePath = testFilePath;
}

export const getOzmapController = async (req: Request, res: Response) => {
  const list = await readOzmapService(res, filePath);
  return res.status(201).json(list);
};

export const postOzmapController = async (req: Request, res: Response) => {
  const data = await postOzmapService(res, req);
  return res.status(201).json(data);
};
