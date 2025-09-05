import express from "express";
import {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  getBestSellingProducts,
  getSalesByCategory,
  getMonthlySales,
  getTopCustomers,
} from "../controllers/salesController.js";

const router = express.Router();

// ✅ Create a sale + linked order
router.post("/", createSale);

// ✅ Get all sales
router.get("/", getAllSales);

// ✅ Get sale by ID
router.get("/:id", getSaleById);

// ✅ Update sale (status, qty, etc.)
router.patch("/:id", updateSale);

// ✅ Delete sale
router.delete("/:id", deleteSale);

router.get("/analytics/top-products", getBestSellingProducts);
router.get("/analytics/category-sales", getSalesByCategory);
router.get("/analytics/monthly-revenue", getMonthlySales);
router.get("/analytics/top-customers", getTopCustomers);

export default router;
