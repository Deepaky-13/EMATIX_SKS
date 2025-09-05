import { Order } from "../models/orderModel.js";
import { Sales } from "../models/salesModel.js";

// ✅ Create Order (in most cases handled inside createSale)
export const createOrder = async (req, res) => {
  try {
    const {
      saleId,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPincode,
      shippingPhone,
      courier,
      trackingId,
      estimatedDelivery,
    } = req.body;

    // Check if sale exists
    const sale = await Sales.findById(saleId);
    if (!sale) {
      return res
        .status(404)
        .json({ success: false, message: "Sale not found" });
    }

    const order = new Order({
      user: req.user.userId,
      sale: saleId,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPincode,
      shippingPhone,
      courier,
      trackingId,
      estimatedDelivery,
    });

    await order.save();

    // Link back to Sale
    sale.order = order._id;
    await sale.save();

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate({
        path: "sale",
        populate: { path: "items.product", select: "productName productBrand" },
      });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate({
        path: "sale",
        populate: { path: "items.product", select: "productName productBrand" },
      });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Order (status, courier, tracking, etc.)
export const updateOrder = async (req, res) => {
  try {
    const updates = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    })
      .populate("user", "name email")
      .populate("sale");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Order (rare case, but available)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await order.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Track Order (customer view)
export const trackOrder = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const order = await Order.findOne({ trackingId })
      .populate("user", "name email")
      .populate("sale");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Tracking ID not found" });
    }

    res.status(200).json({
      success: true,
      orderStatus: order.orderStatus,
      courier: order.courier,
      trackingId: order.trackingId,
      estimatedDelivery: order.estimatedDelivery,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
