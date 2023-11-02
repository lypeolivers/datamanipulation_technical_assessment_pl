import { Request, Response } from "express";
import { createSplitterService, getSplitterService } from "../services";

export const getSplitterController = async (req: Request, res: Response) => {
  const data = await getSplitterService();
  return res.status(201).json(data);
};

export const createSplitterController = async (req: Request, res: Response) => {
  const splitter = await createSplitterService(req.body);
  return res.status(201).json(splitter);
};
