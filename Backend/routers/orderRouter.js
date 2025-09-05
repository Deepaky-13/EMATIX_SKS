import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  trackOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// * Create new order (optional, mostly created via sale)
router.post("/", createOrder);

// * Get all orders
router.get("/", getAllOrders);

// * Get order by ID
router.get("/:id", getOrderById);

// * Update order (status, courier, trackingId, etc.)
router.patch("/:id", updateOrder);

// * Delete order
router.delete("/:id", deleteOrder);

//* Track order by trackingId
// Example: GET /api/orders/track/TRACK12345
router.get("/track/:trackingId", trackOrder);

export default router;
