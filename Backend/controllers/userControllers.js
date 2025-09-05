import { StatusCodes } from "http-status-codes";
import Usermodel from "../models/Usermodel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  console.log(req.user);

  const user = await Usermodel.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    // * To upload the file in the cloudinary

    const response = await cloudinary.v2.uploader.upload(req.file.path);

    // * To delete all the uploaded images in the folder
    // * so that it can be stored in the cloundinay

    await fs.unlink(req.file.path);

    //*-------------------bulid connection cloudnary--------------------------

    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "update User" });
};
