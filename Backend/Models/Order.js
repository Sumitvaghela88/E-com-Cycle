const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: String, required: false },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  status: { type: String, default: "created" },
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
});

module.exports = mongoose.model("Order", orderSchema);
