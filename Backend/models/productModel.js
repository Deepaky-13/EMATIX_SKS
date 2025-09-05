import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: String },
    comment: { type: String },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, trim: true },
    productDescription: { type: String },
    productPrice: { type: String },
    discount: { type: String, default: "0" },
    quantity: { type: String },
    productColor: { type: String },
    productCategory: { type: String },
    ratings: [ratingSchema],
    photos: [{ type: String }],
    productBrand: { type: String },
    status: {
      type: String,
      enum: ["in-stock", "out-of-stock", "discontinued"],
      default: "in-stock",
    },
    gst: { type: String, default: "18" },
    totalAmount: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
