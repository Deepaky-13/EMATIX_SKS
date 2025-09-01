import Usermodel from "../models/Usermodel";

export const register = async (req, res) => {
  const user = await Usermodel.create(req.body);
  res.status()
};
