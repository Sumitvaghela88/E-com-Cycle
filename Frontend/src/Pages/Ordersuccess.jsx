import React, { useEffect } from "react";
import { Box, Typography, Button, Card, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Confetti from "react-confetti";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Destructure order data passed through navigation
  const orderId = state?.orderId || "N/A";
  const amount = state?.amount || 0;
  const cartItems = state?.cartItems || [];

  // Confetti animation
  const [showConfetti, setShowConfetti] = React.useState(true);
  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 5,
          borderRadius: 4,
          textAlign: "center",
          boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
          animation: "fadeIn .5s ease-out",
        }}
      >
        {/* Success Icon */}
        <Box sx={{ animation: "scaleUp .6s ease-out", mb: 2 }}>
          <CheckCircleIcon sx={{ fontSize: 90, color: "#22c55e" }} />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800, color: "#16a34a", mb: 1 }}>
          Payment Successful!
        </Typography>

        <Typography sx={{ color: "#4b5563", fontSize: "1.1rem" }}>
          Your order has been placed successfully. Thank you for shopping with CasuaLux.
        </Typography>

        {/* ORDER DETAILS BOX */}
        <Card
          sx={{
            p: 3,
            mt: 4,
            borderRadius: 3,
            backgroundColor: "#f9fafb",
            border: "2px solid #e5e7eb",
            textAlign: "left",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, color: "#111827" }}
          >
            Order Summary
          </Typography>

          {/* Order ID */}
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ color: "#6b7280" }}>Order ID</Typography>
            <Typography sx={{ fontWeight: 700, color: "#1f2937" }}>
              {orderId}
            </Typography>
          </Box>

          {/* Amount */}
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ color: "#6b7280" }}>Total Amount</Typography>
            <Typography sx={{ fontWeight: 700, color: "#1f2937" }}>
              ₹{amount.toLocaleString()}
            </Typography>
          </Box>

          {/* Items List */}
          <Divider sx={{ my: 2 }} />

          <Typography sx={{ fontWeight: 700, color: "#1f2937", mb: 1 }}>
            Items
          </Typography>

          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                }}
              >
                <Typography sx={{ color: "#4b5563" }}>{item.name}</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  x{item.quantity} — ₹{(item.quantity * item.price).toLocaleString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography sx={{ color: "#6b7280" }}>No items found</Typography>
          )}
        </Card>

        {/* Buttons */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 4,
            py: 1.8,
            borderRadius: 3,
            fontWeight: 700,
            textTransform: "none",
            fontSize: "1.1rem",
            background: "linear-gradient(135deg, #4f46e5, #4338ca)",
            "&:hover": {
              background: "linear-gradient(135deg, #4338ca, #3730a3)",
            },
          }}
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 600,
            textTransform: "none",
            borderWidth: 2,
            color: "#4f46e5",
            borderColor: "#4f46e5",
            "&:hover": {
              backgroundColor: "#eef2ff",
              borderColor: "#4338ca",
              color: "#4338ca",
            },
          }}
          onClick={() => navigate("/orders")}
        >
          View My Orders
        </Button>
      </Card>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleUp {
            from { transform: scale(.4); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default OrderSuccess;
