import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../Error/customError.js";
import Usermodel from "../models/Usermodel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        if (errorMessages[0].startsWith("no product ")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access ");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name must Required"),
  body("email")
    .notEmpty()
    .withMessage("Email must required")
    .isEmail()
    .withMessage("Invalid email formate")
    .custom(async (email) => {
      const user = await Usermodel.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exits");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is Required")
    .isLength({ min: 8 })
    .withMessage("password must contain at least 8 characters long"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("phone number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage(" phone Number must be 10 digit long")
    .isNumeric()
    .withMessage("invalid phone number"),
]);
