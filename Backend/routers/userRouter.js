import { Router } from "express";

import { validateUpdateUser } from "../middleware/validationMiddleware.js";
import uploaded from "../middleware/multermiddleware.js";
import { getCurrentUser, updateUser } from "../controllers/userControllers.js";
const router = Router();

router.get("/current-user", getCurrentUser);

router.patch(
  "/update-user",
  uploaded.single("avatar"),
  validateUpdateUser,
  updateUser
);

export default router;
