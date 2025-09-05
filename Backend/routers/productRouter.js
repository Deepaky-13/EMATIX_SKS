import express from "express";
const router = express.Router();

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { validateProduct } from "../middleware/validationMiddleware.js";

router.route("/").get(getProducts).post(validateProduct, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(validateProduct, updateProduct)
  .delete(deleteProduct);

export default router;
