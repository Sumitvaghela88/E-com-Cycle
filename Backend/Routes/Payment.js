const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../Models/Order");
require("dotenv").config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
 key_secret: process.env.RAZORPAY_SECRET

});

// -------------------------------
// CREATE ORDER
// -------------------------------
router.post("/create-order", async (req, res) => {
  try {
    const { amount, user } = req.body;

    console.log("➡ Amount received:", amount);
    console.log("➡ User received:", user);

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    console.log("➡ Razorpay Created Order:", order);

    await Order.create({
      user,
      amount,
      currency: order.currency,
      status: "created",
      razorpay_order_id: order.id,
    });

    res.json({
      success: true,
      key_id: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
    });

  } catch (error) {
    console.error("🔥 Razorpay Error:", error); // <-- ADD THIS
    res.status(500).json({ message: error.message });
  }
});

// -------------------------------
// VERIFY PAYMENT
// -------------------------------
router.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET) // FIXED
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await Order.findOneAndUpdate(
        { razorpay_order_id },
        {
          razorpay_payment_id,
          razorpay_signature,
          status: "paid",
        }
      );

      return res.json({ success: true, message: "Payment verified successfully!" });
    }

    res.status(400).json({ success: false, message: "Signature mismatch!" });

  } catch (err) {
    console.error("Verification Error:", err);
    res.status(500).json({ message: "Payment verification failed!" });
  }
});

module.exports = router;
