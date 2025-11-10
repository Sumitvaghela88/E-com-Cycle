import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <Box className="flex flex-col justify-center items-center h-screen text-center">
      <Typography variant="h4" className="text-green-600 font-bold mb-3">
         Payment Successful!
      </Typography>
      <Typography className="text-gray-600 mb-6">
        Thank you for your purchase. Your bicycle order is confirmed.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/products")}
        sx={{
          backgroundColor: "#4f46e5",
          "&:hover": { backgroundColor: "#4338ca" },
          borderRadius: "10px",
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default OrderSuccess;
