import { Request, Response, NextFunction } from "express";
import { BoxModel } from "../models/Box";

const validateBodyBox = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const box = new BoxModel(req.body);
  const error = box.validateSync();
  if (error) {
    return res.status(500).json({ message: error.message });
  } else {
    next();
  }
};

export default validateBodyBox;
