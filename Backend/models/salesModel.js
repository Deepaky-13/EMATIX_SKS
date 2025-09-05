import mongoose from "mongoose";

const salesItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: { type: String }, 
    productBrand: { type: String },
    productColor: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }, 
    total: { type: Number, required: true }, 
  },
  { _id: false }
);

const salesSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [salesItemSchema],

    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    gst: { type: Number, default: 18 },
    totalAmount: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ["COD", "Credit Card", "Debit Card", "UPI", "Net Banking"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    // link to order (1 Sale -> 1 Order)
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

export const Sales = mongoose.model("Sales", salesSchema);
