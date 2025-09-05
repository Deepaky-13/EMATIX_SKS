import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Link back to Sales record (1 Order -> 1 Sale)
    sale: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sales",
      required: true,
    },

    // Shipping information
    shippingAddress: { type: String, required: true },
    shippingCity: { type: String, required: true },
    shippingState: { type: String, required: true },
    shippingPincode: { type: String, required: true },
    shippingCountry: { type: String, default: "India" },
    shippingPhone: { type: String, required: true },

    // Courier & tracking
    courier: { type: String },
    trackingId: { type: String },
    estimatedDelivery: { type: Date },

    // Order status lifecycle
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      default: "Pending",
    },

    // Optional: invoice / order number
    orderNumber: { type: String, unique: true },

    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
