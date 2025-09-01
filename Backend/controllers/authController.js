import { StatusCodes } from "http-status-codes";
import Usermodel from "../models/Usermodel.js";

export const register = async (req, res) => {
  const isFirstAccount = (await Usermodel.countDocuments({})) === 0;
  if (isFirstAccount) {
    req.body.role = "admin";
  }
  const user = await Usermodel.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};
