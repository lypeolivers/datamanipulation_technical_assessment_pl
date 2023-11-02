import { Request, Response } from "express";
import { createClientService, getClientService } from "../services";

export const getClientController = async (req: Request, res: Response) => {
  const data = await getClientService();
  return res.status(201).json(data);
};

export const createClientController = async (req: Request, res: Response) => {
  const client = await createClientService(req.body);
  return res.status(201).json(client);
};
