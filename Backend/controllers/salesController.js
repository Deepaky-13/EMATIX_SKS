import { Sales } from "../models/salesModel.js";
import { Product } from "../models/ProductModel.js";
import { Order } from "../models/orderModel.js";

//  Create a Sale + linked Order (already done)
export const createSale = async (req, res) => {
  try {
    const {
      productId,
      quantity,
      paymentMethod,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPincode,
      shippingPhone,
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const productPrice = Number(product.productPrice);
    const discount = Number(product.discount) || 0;
    const gstRate = Number(product.gst) || 18;
    const stock = Number(product.quantity);

    if (stock < quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough stock available" });
    }

    const discountPrice = productPrice - (productPrice * discount) / 100;
    const total = discountPrice * quantity;

    const subtotal = total;
    const gstAmount = (subtotal * gstRate) / 100;
    const totalAmount = subtotal + gstAmount;

    const newSale = new Sales({
      user: req.user.userId,
      items: [
        {
          product: product._id,
          productName: product.productName,
          productBrand: product.productBrand,
          productColor: product.productColor,
          quantity,
          price: discountPrice,
          total,
        },
      ],
      subtotal,
      discount,
      gst: gstRate,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
    });

    await newSale.save();

    const newOrder = new Order({
      user: req.user.userId,
      sale: newSale._id,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPincode,
      shippingPhone,
    });

    await newOrder.save();

    newSale.order = newOrder._id;
    await newSale.save();

    product.quantity = String(stock - quantity);
    await product.save();

    res.status(201).json({ success: true, sale: newSale, order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all Sales
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sales.find()
      .populate("user", "name email")
      .populate("items.product", "productName productBrand")
      .populate("order", "orderStatus shippingAddress shippingPhone");
    res.status(200).json({ success: true, data: sales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Sale by ID
export const getSaleById = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "productName productBrand")
      .populate("order");
    if (!sale) {
      return res
        .status(404)
        .json({ success: false, message: "Sale not found" });
    }
    res.status(200).json({ success: true, data: sale });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Sale (ex: change payment status)
export const updateSale = async (req, res) => {
  try {
    const sale = await Sales.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("user", "name email")
      .populate("items.product", "productName productBrand");

    if (!sale) {
      return res
        .status(404)
        .json({ success: false, message: "Sale not found" });
    }

    res.status(200).json({ success: true, data: sale });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Sale (restore stock if deleted)
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) {
      return res
        .status(404)
        .json({ success: false, message: "Sale not found" });
    }

    // Restore stock before deleting
    for (let item of sale.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.quantity = String(Number(product.quantity) + item.quantity);
        await product.save();
      }
    }

    await sale.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Sales by Date Range
export const getSalesByDate = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res
        .status(400)
        .json({ success: false, message: "Start and End dates required" });
    }

    const sales = await Sales.find({
      createdAt: { $gte: new Date(start), $lte: new Date(end) },
    });

    res.status(200).json({ success: true, count: sales.length, data: sales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Sales Summary (total revenue, total sales, etc.)
export const getSalesSummary = async (req, res) => {
  try {
    const summary = await Sales.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalSales: { $sum: 1 },
          avgOrderValue: { $avg: "$totalAmount" },
        },
      },
    ]);

    res.status(200).json({ success: true, summary: summary[0] || {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Best-Selling Products
export const getBestSellingProducts = async (req, res) => {
  try {
    const topProducts = await Sales.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          productName: { $first: "$items.productName" },
          productBrand: { $first: "$items.productBrand" },
          totalSold: { $sum: "$items.quantity" },
          revenue: { $sum: "$items.total" },
        },
      },
      { $sort: { totalSold: -1 } }, // Sort by most sold
      { $limit: 5 }, // Top 5
    ]);

    res.status(200).json({ success: true, data: topProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Sales grouped by Product Category
export const getSalesByCategory = async (req, res) => {
  try {
    const categorySales = await Sales.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.productCategory",
          totalRevenue: { $sum: "$items.total" },
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    res.status(200).json({ success: true, data: categorySales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Monthly Sales/Revenue
export const getMonthlySales = async (req, res) => {
  try {
    const monthlySales = await Sales.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({ success: true, data: monthlySales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Customers who spent the most
export const getTopCustomers = async (req, res) => {
  try {
    const topCustomers = await Sales.aggregate([
      {
        $group: {
          _id: "$user",
          totalSpent: { $sum: "$totalAmount" },
          ordersCount: { $sum: 1 },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({ success: true, data: topCustomers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
