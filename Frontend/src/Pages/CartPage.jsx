// src/pages/Cart.jsx
import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../Components/CartContext";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  Divider,
  Container,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as LocalShippingIcon,
  ArrowBack as ArrowBackIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, updateQuantity, addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal >= 5000 ? 0 : 200) : 0;
  const total = subtotal + shipping;

  const handleQuantityChange = (item, newQty) => {
    if (newQty < 1) return;
    updateQuantity(item._id, newQty);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return toast.error("Your cart is empty!");
    setLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: total,
        currency: "INR",
      });

      const options = {
        key: data.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "CasuaLux Bicycles",
        description: "Order Payment",
        order_id: data.order_id,
        image: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );
            if (verifyRes.data.success) {
              toast.success("✅ Payment successful!");
              clearCart();
              setTimeout(() => navigate("/order-success"), 500);
            } else toast.error("Payment verification failed.");
          } catch (err) {
            toast.error("Payment verification failed.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: "CasuaLux Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#1f2937" },
        modal: { ondismiss: () => toast.error("Payment cancelled.") },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong during checkout.");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f9fafb 0%, #e5e7eb 100%)",
        py: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="lg">

        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Button
              onClick={() => navigate("/products")}
              startIcon={<ArrowBackIcon />}
              sx={{
                color: "#4b5563",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "rgba(75,85,99,0.08)" },
              }}
            >
              Continue Shopping
            </Button>

            <Chip
              label={`${cart.length} ${cart.length === 1 ? "item" : "items"}`}
              sx={{
                backgroundColor: "#374151",
                color: "white",
                fontWeight: 700,
                px: 1,
              }}
            />
          </Box>

          <Typography
            variant="h3"
            sx={{ fontWeight: 900, color: "#111827", mb: 1 }}
          >
            Shopping Cart
          </Typography>
          <Typography sx={{ color: "#6b7280" }}>Review your items</Typography>
        </Box>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <Card
            sx={{
              maxWidth: 550,
              mx: "auto",
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              border: "2px solid #e5e7eb",
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 60, color: "#9ca3af" }} />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Your cart is empty
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Start adding bicycles to your cart!
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/products")}
              sx={{
                px: 5,
                py: 1.8,
                borderRadius: 3,
                fontWeight: 700,
                background: "linear-gradient(135deg,#374151,#1f2937)",
              }}
            >
              Continue Shopping
            </Button>
          </Card>
        ) : (
          // 🔥 NO CHANGES BELOW THIS POINT — YOUR ORIGINAL CART UI
          <>
           


        ) : (
          <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" } }}>
            {/* Cart Items */}
            <Box sx={{ flex: 1 }}>
              {cart.map((item, index) => (
                <Card
                  key={item._id}
                  sx={{
                    mb: 3,
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "2px solid #e5e7eb",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    backgroundColor: "white",
                    animation: `slideIn 0.4s ease-out ${index * 0.1}s both`,
                    "@keyframes slideIn": {
                      from: {
                        opacity: 0,
                        transform: "translateX(-20px)",
                      },
                      to: {
                        opacity: 1,
                        transform: "translateX(0)",
                      },
                    },
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                      borderColor: "#9ca3af",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                      {/* Image */}
                      <Box
                        sx={{
                          width: 140,
                          height: 140,
                          borderRadius: 2,
                          overflow: "hidden",
                          background: "linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)",
                          flexShrink: 0,
                          border: "2px solid #e5e7eb",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            padding: "12px",
                          }}
                        />
                      </Box>

                      {/* Details */}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, color: "#111827", mb: 1 }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1f2937",
                            fontWeight: 800,
                            mb: 2,
                          }}
                        >
                          ₹{item.price.toLocaleString()}
                        </Typography>

                        {/* Quantity Controls */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              border: "2px solid #d1d5db",
                              borderRadius: 2,
                              overflow: "hidden",
                              backgroundColor: "white",
                            }}
                          >
                            <IconButton
                              aria-label="Decrease quantity"
                              size="small"
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              sx={{
                                borderRadius: 0,
                                color: "#374151",
                                "&:hover": {
                                  backgroundColor: "#f3f4f6",
                                },
                                "&:disabled": {
                                  color: "#d1d5db",
                                },
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography
                              sx={{
                                px: 3,
                                py: 0.5,
                                fontWeight: 700,
                                textAlign: "center",
                                backgroundColor: "#f9fafb",
                                color: "#1f2937",
                                minWidth: "50px",
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              aria-label="Increase quantity"
                              size="small"
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              sx={{
                                borderRadius: 0,
                                color: "#374151",
                                "&:hover": {
                                  backgroundColor: "#f3f4f6",
                                },
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>

                          <Box>
                            <Typography
                              sx={{
                                color: "#6b7280",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                              }}
                            >
                              Subtotal
                            </Typography>
                            <Typography
                              sx={{
                                color: "#1f2937",
                                fontWeight: 700,
                                fontSize: "1.1rem",
                              }}
                            >
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Remove Button */}
                      <IconButton
                        onClick={() => removeFromCart(item._id)}
                        aria-label="Remove from cart"
                        sx={{
                          color: "#6b7280",
                          border: "2px solid #e5e7eb",
                          borderRadius: 2,
                          "&:hover": {
                            backgroundColor: "#fef2f2",
                            borderColor: "#ef4444",
                            color: "#ef4444",
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Order Summary */}
            <Card
              sx={{
                width: { xs: "100%", md: 420 },
                height: "fit-content",
                position: { md: "sticky" },
                top: 20,
                borderRadius: 3,
                border: "2px solid #e5e7eb",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                backgroundColor: "white",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, mb: 4, color: "#111827" }}
                >
                  Order Summary
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <SummaryRow label="Subtotal" value={`₹${subtotal.toLocaleString()}`} />
                  <SummaryRow
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LocalShippingIcon sx={{ fontSize: 20, color: "#6b7280" }} />
                        Shipping
                      </Box>
                    }
                    value={shipping === 0 ? "FREE" : `₹${shipping}`}
                    color={shipping === 0 ? "#10b981" : "#6b7280"}
                    bold={shipping === 0}
                  />

                  {subtotal > 0 && subtotal < 5000 && (
                    <Box
                      sx={{
                        fontSize: "0.875rem",
                        color: "#92400e",
                        backgroundColor: "#fef3c7",
                        border: "1px solid #fcd34d",
                        p: 2,
                        borderRadius: 2,
                        mb: 2,
                        mt: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <LocalShippingIcon sx={{ fontSize: 18 }} />
                      <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                        Add ₹{(5000 - subtotal).toLocaleString()} more for FREE shipping!
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 3, borderColor: "#e5e7eb" }} />
                  
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                      backgroundColor: "#f9fafb",
                      borderRadius: 2,
                      border: "2px solid #e5e7eb",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827" }}>
                      Total
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: "#1f2937" }}>
                      ₹{total.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>

                {/* Security Badge */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    mb: 3,
                    color: "#6b7280",
                    fontSize: "0.875rem",
                  }}
                >
                  <LockIcon sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    Secure checkout guaranteed
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={loading}
                  sx={{
                    py: 2,
                    mb: 2,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    background: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
                    boxShadow: "0 4px 12px rgba(31, 41, 55, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 16px rgba(31, 41, 55, 0.4)",
                    },
                    "&:disabled": {
                      background: "#d1d5db",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={26} sx={{ color: "white" }} />
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={clearCart}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    borderWidth: 2,
                    borderColor: "#d1d5db",
                    color: "#6b7280",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#fef2f2",
                      borderColor: "#ef4444",
                      color: "#ef4444",
                      borderWidth: 2,
                    },
                  }}
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </Box>
            </>
        )}
      </Container>
    </Box>
  );
};


// 🧩 Reusable summary row
const SummaryRow = ({ label, value, color, bold }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
    <Typography
      component="div"
      sx={{ color: "#6b7280", fontWeight: 500 }}
    >
      {label}
    </Typography>

    <Typography
      component="div"
      sx={{
        fontWeight: bold ? 700 : 600,
        color: color || "#1f2937",
      }}
    >
      {value}
    </Typography>
  </Box>
);


export default Cart;