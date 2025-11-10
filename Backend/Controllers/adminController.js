const Order = require("../Models/Order");
const User = require("../Models/User");
const Product = require("../Models/Product");

// ====== GET STATS (Dashboard Overview) ======
const getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: "customer" });
    const totalProducts = await Product.countDocuments();

    const orders = await Order.find().sort({ createdAt: -1 }).limit(5);
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      totalOrders,
      totalProducts,
      totalUsers,
      recentOrders: orders,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
};

// ====== GET ALL ORDERS ======
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

// ====== UPDATE ORDER STATUS ======
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = orderStatus;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Error updating order status", error: err.message });
  }
};

// ====== GET CUSTOMERS ======
const  getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" }).select("-password");
    res.status(200).json(customers);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};

// ====== EXPORT ALL FUNCTIONS ======
module.exports = {
  getStats,
  getOrders,
  updateOrderStatus,
  getCustomers,
};
