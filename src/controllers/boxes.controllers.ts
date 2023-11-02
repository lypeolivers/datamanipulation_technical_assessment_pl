import { Request, Response } from "express";
import { getBoxService, createBoxService } from "../services";

export const getBoxController = async (req: Request, res: Response) => {
  const data = await getBoxService();
  return res.status(201).json(data);
};

export const createBoxController = async (req: Request, res: Response) => {
  const box = await createBoxService(req.body);
  return res.status(201).json(box);
};
