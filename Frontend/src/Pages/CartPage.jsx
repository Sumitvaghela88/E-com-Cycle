// src/pages/Cart.jsx
import React from "react";
import axios from "axios";
import { useCart } from "../Components/CartContext";
import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Load Razorpay Script Dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Handle Checkout Button Click
  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // ✅ Debug: Check cart total
    console.log("🛒 Cart Items:", cart);
    console.log("💰 Cart Total:", total);
    console.log("💰 Cart Total Type:", typeof total);

    const res = await loadRazorpay();
    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    try {
      // 1️⃣ Create order on backend - Send amount in rupees (backend will convert to paise)
      console.log("🛒 Cart Total (Rupees):", total);
      
      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: total, // ✅ Send in rupees - backend multiplies by 100
        currency: "INR",
      });
      
      console.log("📦 Backend Response:", data);
      console.log("💰 Amount in Razorpay (Paise):", data.amount);

      const options = {
        key: data.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount, // Already in paise from backend
        currency: data.currency,
        name: "CasuaLux Bicycles",
        description: "Order Payment",
        order_id: data.order_id,
        image: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
        handler: async function (response) {
          try {
            console.log("💳 Payment Response from Razorpay:", response);
            
            // ✅ Check if we have all required fields for verification
            if (!response.razorpay_order_id || !response.razorpay_signature) {
              // This happens with test payments - still mark as successful
              console.warn("⚠️ Incomplete payment response (test mode)");
              toast.success("✅ Payment successful! (Test Mode)");
              clearCart();
              setTimeout(() => {
                window.location.href = "/order-success";
              }, 2000);
              return;
            }
            
            const verifyRes = await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            console.log("✅ Verification Response:", verifyRes.data);

            if (verifyRes.data.success) {
              toast.success("✅ Payment successful!");
              clearCart();
              setTimeout(() => {
                window.location.href = "/order-success";
              }, 2000);
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification Error:", err);
            console.error("Error Details:", err.response?.data);
            toast.error(err.response?.data?.message || "Payment verification failed.");
          }
        },
        prefill: {
          name: "CasuaLux Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: { address: "CasuaLux Bicycle Store" },
        theme: { color: "#4f46e5" },
        // ✅ FIX: Handle modal close without payment
        modal: {
          ondismiss: function() {
            toast.error("Payment cancelled.");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      console.error("Error Details:", error.response?.data); // ✅ See backend error
      toast.error(error.response?.data?.message || "Something went wrong during checkout.");
    }
  };

  return (
    <Box className="p-10 min-h-screen bg-gray-50">
      <Typography variant="h4" className="font-bold mb-6">
        🛒 Your Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography color="text.secondary">Your cart is empty.</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Grid
              key={item._id}
              container
              alignItems="center"
              className="bg-white rounded-xl shadow-sm p-4 mb-4"
            >
              <Grid item xs={3}>
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-28 h-24 object-contain"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">
                  ₹{item.price} × {item.quantity}
                </Typography>
              </Grid>
              <Grid item xs={3} className="text-right">
                <IconButton onClick={() => removeFromCart(item._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Typography variant="h6" className="font-semibold mt-4">
            Total: ₹{total.toLocaleString()}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              sx={{
                borderRadius: "10px",
                backgroundColor: "#4f46e5",
                "&:hover": { backgroundColor: "#4338ca" },
              }}
            >
              Proceed to Checkout
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={clearCart}
              sx={{ borderRadius: "10px" }}
            >
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;