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
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useCart } from "../Components/CartContext";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
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
        theme: { color: "#4f46e5" },
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
      } catch (error) {
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
      <Box className="flex justify-center items-center h-screen bg-gray-50">
        <CircularProgress />
        <Typography className="ml-3 text-gray-600 font-medium text-lg">
          Loading products...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen py-10 px-6 md:px-16 bg-gray-50">
      {/* ===== Header Section ===== */}
      <Box className="max-w-3xl mx-auto text-center mb-16">
        <Typography
          variant="h3"
          className="font-extrabold text-gray-800 mb-6 tracking-tight"
        >
          🚴‍♂️ Our Premium Bicycles
        </Typography>
        <Typography variant="body1" className="text-gray-600 mb-10 text-lg">
          Discover high-performance bicycles crafted for every adventure —
          from smooth city rides to challenging mountain trails.
        </Typography>

        {/* ===== Search Bar ===== */}
        <Box className="flex justify-center">
          <Box className="flex items-center bg-white shadow-lg border border-gray-200 rounded-full px-5 py-3 w-full md:w-[450px] hover:shadow-xl transition-all">
            <SearchIcon className="text-gray-500 mr-2" />
            <TextField
              variant="standard"
              placeholder="Search your dream bicycle..."
              fullWidth
              InputProps={{ disableUnderline: true }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Box>
      </Box>

      <Divider className="max-w-4xl mx-auto mb-16" />

      {/* ===== Product Grid (Flex Layout) ===== */}
      <Box
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-10 max-w-7xl mx-auto place-items-center
        "
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col w-full h-full"
              sx={{ border: "1px solid #e5e7eb" }}
            >
              {/* ===== Product Image ===== */}
              <Box
                sx={{
                  height: 260,
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
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
                    padding: "10px",
                    transition: "transform 0.4s ease",
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                />
              </Box>

              {/* ===== Product Details ===== */}
              <CardContent className="p-5 flex flex-col flex-grow">
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800 mb-1"
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="body2"
                  className="text-gray-500 mb-3 line-clamp-2"
                >
                  {product.description ||
                    "Ride with power, precision, and performance."}
                </Typography>

                <Typography
                  variant="h6"
                  className="text-indigo-600 font-bold mb-2"
                >
                  ₹{product.price?.toLocaleString()}
                </Typography>

                {/* ===== Buttons ===== */}
                <Box className="flex gap-3 mt-auto pt-5">
                  <Button
                    variant="outlined"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} added to cart 🛒`);
                    }}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: "10px",
                      borderColor: "#4f46e5",
                      color: "#4f46e5",
                      "&:hover": { backgroundColor: "#eef2ff" },
                      width: "50%",
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
                      fontWeight: 600,
                      borderRadius: "10px",
                      backgroundColor: "#4f46e5",
                      "&:hover": { backgroundColor: "#4338ca" },
                      width: "50%",
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography
            variant="h6"
            color="text.secondary"
            className="text-center mt-10 col-span-full"
          >
            No products found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Products;
