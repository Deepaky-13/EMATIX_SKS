import express from "express";
const router = express.Router();
import { register } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";

router.post("/register", validateRegisterInput, register);

export default router;
