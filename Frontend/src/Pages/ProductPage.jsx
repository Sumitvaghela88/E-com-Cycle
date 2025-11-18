import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
  Chip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useCart } from "../Components/CartContext";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("idle");
  const { addToCart } = useCart();

  // ✅ Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );
      if (existingScript) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Handle Razorpay Payment
  const handleBuyNow = async (product) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load. Check your internet.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: product.price }
      );

      if (!data.success && !data.order) {
        toast.error("Order creation failed!");
        return;
      }

      const orderData = data.order || data;

      const options = {
        key: data.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "CasuaLux Bicycles",
        description: product.name,
        image: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              response
            );

            if (verifyRes.data.success) {
              toast.success(`✅ Payment successful for ${product.name}`);
            } else {
              toast.error("❌ Payment verification failed");
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: "CasuaLux Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: { address: "CasuaLux Bicycle Store" },
        theme: { color: "#1f2937" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () =>
        toast.error("Payment failed. Please try again.")
      );
      rzp.open();
    } catch (err) {
      console.error("Razorpay Error:", err);
      toast.error("Something went wrong during checkout.");
    }
  };

  // ✅ Fetch Products
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");

      setProducts(res.data);

      if (res.status === 200) {
        setStatus("success");
        console.log("Products fetched successfully");
      } else {
        setStatus("failed");
        console.log("Failed to fetch products");
      }

    } catch (error) {
      setStatus("error");
      console.error("Error fetching products:", error);

    } finally {
      setLoading(false);
    }
  };

  fetchProducts();


  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Box
        className="flex flex-col justify-center items-center h-screen"
        sx={{
          background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: "#9ca3af" }} />
        <Typography className="mt-6 text-gray-300 font-semibold text-xl animate-pulse">
          Loading premium bicycles...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      className="min-h-screen py-12 px-6 md:px-16"
      sx={{
        background: "linear-gradient(180deg, #f9fafb 0%, #e5e7eb 100%)",
      }}
    >
      {/* ===== Header Section ===== */}
      <Box className="max-w-5xl mx-auto text-center mb-12">
        <Box
          sx={{
            display: "inline-block",
            mb: 2,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "4px",
              background: "linear-gradient(90deg, #374151 0%, #6b7280 100%)",
              borderRadius: "2px",
            },
          }}
        >
          <Typography
            variant="h2"
            className="font-black"
            sx={{
              color: "#111827",
              letterSpacing: "-0.02em",
              textShadow: "2px 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            🚴‍♂️ Premium Bicycles
          </Typography>
        </Box>

        <Typography
          variant="h6"
          className="mb-8 font-medium"
          sx={{
            color: "#4b5563",
            maxWidth: "600px",
            mx: "auto",
            mt: 4,
          }}
        >
          Discover high-performance bicycles crafted for every adventure
        </Typography>

        {/* ===== Search Bar ===== */}
        <Box className="flex justify-center mb-8">
          <Box
            className="flex items-center bg-white rounded-2xl px-6 py-4 w-full md:w-[550px] transition-all duration-300"
            sx={{
              border: "2px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                borderColor: "#9ca3af",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              },
              "&:focus-within": {
                borderColor: "#6b7280",
                boxShadow: "0 0 0 3px rgba(107, 114, 128, 0.1)",
              },
            }}
          >
            <SearchIcon sx={{ color: "#6b7280", fontSize: 28, mr: 2 }} />
            <TextField
              variant="standard"
              placeholder="Search your dream bicycle..."
              fullWidth
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#1f2937",
                },
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Box>

        {/* ===== Feature Bar ===== */}
        <Box className="flex justify-center gap-4 flex-wrap">
          {[
            { icon: <LocalShippingIcon />, text: "Free Shipping" },
            { icon: <VerifiedIcon />, text: "1 Year Warranty" },
            { icon: <SupportAgentIcon />, text: "24/7 Support" },
          ].map((feat) => (
            <Chip
              key={feat.text}
              icon={feat.icon}
              label={feat.text}
              sx={{
                backgroundColor: "#ffffff",
                color: "#374151",
                fontWeight: 700,
                fontSize: "14px",
                padding: "24px 16px",
                border: "2px solid #d1d5db",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                  borderColor: "#9ca3af",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
                "& .MuiChip-icon": {
                  color: "#6b7280",
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* ===== Product Grid ===== */}
      <Box
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        sx={{ mt: 8 }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Card
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden flex flex-col h-full"
              sx={{
                border: "2px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`,
                "@keyframes fadeInUp": {
                  from: {
                    opacity: 0,
                    transform: "translateY(20px)",
                  },
                  to: {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
                  borderColor: "#9ca3af",
                },
              }}
            >
              {/* ===== Badge & Image ===== */}
              <Box sx={{ position: "relative" }}>
                <Chip
                  icon={<LocalOfferIcon sx={{ fontSize: 14 }} />}
                  label="Premium"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 1,
                    backgroundColor: "#1f2937",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "11px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                  }}
                />

                {/* ===== Product Image ===== */}
                <Box
                  sx={{
                    height: 280,
                    background: "linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 70%)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      product.images?.[0] ||
                      "https://via.placeholder.com/400x400.png?text=No+Image"
                    }
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: "24px",
                      transition: "transform 0.5s ease",
                      position: "relative",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                      "&:hover": {
                        transform: "scale(1.08) rotate(-2deg)",
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* ===== Product Details ===== */}
              <CardContent className="p-6 flex flex-col flex-grow">
                {/* ===== Rating ===== */}
                <Box className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      sx={{
                        fontSize: 16,
                        color: i < 4 ? "#6b7280" : "#d1d5db",
                      }}
                    />
                  ))}
                  <Typography
                    variant="caption"
                    sx={{ ml: 1, color: "#6b7280", fontWeight: 600 }}
                  >
                    (4.8)
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  className="font-bold mb-2"
                  sx={{
                    fontSize: "18px",
                    lineHeight: 1.3,
                    color: "#111827",
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="body2"
                  className="mb-4 line-clamp-2"
                  sx={{
                    color: "#6b7280",
                    flexGrow: 1,
                    lineHeight: 1.6,
                  }}
                >
                  {product.description ||
                    "Ride with power, precision, and performance."}
                </Typography>

                {/* ===== Price Section ===== */}
                <Box className="flex items-center gap-3 mb-5">
                  <Typography
                    variant="h5"
                    className="font-black"
                    sx={{
                      color: "#1f2937",
                    }}
                  >
                    ₹{product.price?.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: "#9ca3af",
                      fontWeight: 500,
                    }}
                  >
                    ₹{(product.price * 1.25)?.toLocaleString()}
                  </Typography>
                  <Chip
                    label="25% OFF"
                    size="small"
                    sx={{
                      backgroundColor: "#f3f4f6",
                      color: "#374151",
                      fontWeight: 800,
                      fontSize: "10px",
                      border: "1px solid #d1d5db",
                    }}
                  />
                </Box>

                {/* ===== Action Buttons ===== */}
                <Box className="flex gap-3">
                  <Button
                    variant="outlined"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} added to cart 🛒`);
                    }}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "12px",
                      borderWidth: 2,
                      borderColor: "#4b5563",
                      color: "#374151",
                      flex: 1,
                      py: 1.3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#f9fafb",
                        borderWidth: 2,
                        borderColor: "#1f2937",
                        color: "#1f2937",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleBuyNow(product)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
                      flex: 1,
                      py: 1.3,
                      boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box className="col-span-full flex flex-col items-center justify-center py-20">
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
                border: "3px solid #e5e7eb",
              }}
            >
              <SearchIcon sx={{ fontSize: 60, color: "#9ca3af" }} />
            </Box>
            <Typography
              variant="h5"
              className="font-bold mb-2"
              sx={{ color: "#374151" }}
            >
              No products found
            </Typography>
            <Typography variant="body1" sx={{ color: "#6b7280" }}>
              Try adjusting your search criteria
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Products;