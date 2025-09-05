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

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email must required")
    .isEmail()
    .withMessage("Invalid email formate"),
  body("password").notEmpty().withMessage("password is Required"),
]);

export const validateUpdateUser = withValidationErrors([
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

export const validateProduct = (req, res, next) => {
  try {
    let { productName, productPrice, discount, quantity, gst } = req.body;

    if (!productName || typeof productName !== "string") {
      return res.status(400).json({ error: "Product name is required" });
    }

    const priceNum = Number(productPrice);
    const discountNum = Number(discount || 0);
    const qtyNum = Number(quantity);
    const gstNum = Number(gst || 18);

    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ error: "Valid product price is required" });
    }
    if (isNaN(qtyNum) || qtyNum < 0) {
      return res.status(400).json({ error: "Valid quantity is required" });
    }
    if (isNaN(gstNum) || gstNum < 0) {
      return res.status(400).json({ error: "Valid GST is required" });
    }

    const priceAfterDiscount = priceNum - (priceNum * discountNum) / 100;
    const gstAmount = (priceAfterDiscount * gstNum) / 100;
    const total = priceAfterDiscount + gstAmount;

    req.body.productPrice = priceNum.toString();
    req.body.discount = discountNum.toString();
    req.body.quantity = qtyNum.toString();
    req.body.gst = gstNum.toString();
    req.body.totalAmount = total.toString();

    next();
  } catch (err) {
    res.status(400).json({ error: "Validation error", details: err.message });
  }
};
