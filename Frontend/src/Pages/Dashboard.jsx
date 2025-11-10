import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  TrendingUp,
  DollarSign,
  Menu,
  X,
  Eye,
  EyeOff,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Check,
  Clock,
  Truck,
  AlertCircle,
  Star,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";
const axiosInstance = axios.create({ baseURL: API_URL });

// Product Form Component
function ProductForm({ product, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    brand: product?.brand || "",
    stock: product?.stock || "",
    images: product?.images?.[0] || "",
    specifications: {
      frameSize: product?.specifications?.frameSize || "",
      wheelSize: product?.specifications?.wheelSize || "",
      color: product?.specifications?.color?.join(", ") || "",
      material: product?.specifications?.material || "",
      weight: product?.specifications?.weight || "",
    },
    category: product?.category || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      images: form.images ? [form.images] : [],
      specifications: {
        ...form.specifications,
        color: form.specifications.color.split(",").map((c) => c.trim()).filter(Boolean),
      },
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
          <input
            type="text"
            placeholder="e.g., Mountain Bike Pro"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
          <input
            type="text"
            placeholder="e.g., Trek, Giant"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
          <input
            type="number"
            placeholder="15000"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
          <input
            type="number"
            placeholder="50"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Category</option>
            <option value="Mountain">Mountain Bike</option>
            <option value="Road">Road Bike</option>
            <option value="Hybrid">Hybrid Bike</option>
            <option value="Electric">Electric Bike</option>
            <option value="Kids">Kids Bike</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          placeholder="Detailed product description..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-700 mb-3">Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Frame Size</label>
            <input
              type="text"
              placeholder='e.g., 17", 19"'
              value={form.specifications.frameSize}
              onChange={(e) =>
                setForm({
                  ...form,
                  specifications: { ...form.specifications, frameSize: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Wheel Size</label>
            <input
              type="text"
              placeholder='e.g., 27.5", 29"'
              value={form.specifications.wheelSize}
              onChange={(e) =>
                setForm({
                  ...form,
                  specifications: { ...form.specifications, wheelSize: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Material</label>
            <input
              type="text"
              placeholder="e.g., Aluminum, Carbon"
              value={form.specifications.material}
              onChange={(e) =>
                setForm({
                  ...form,
                  specifications: { ...form.specifications, material: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Weight (kg)</label>
            <input
              type="text"
              placeholder="e.g., 12.5"
              value={form.specifications.weight}
              onChange={(e) =>
                setForm({
                  ...form,
                  specifications: { ...form.specifications, weight: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Available Colors</label>
            <input
              type="text"
              placeholder="Red, Blue, Black (comma-separated)"
              value={form.specifications.color}
              onChange={(e) =>
                setForm({
                  ...form,
                  specifications: { ...form.specifications, color: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
        >
          {product ? "Update Product" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// Order Detail Modal
function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <Check className="w-5 h-5 text-green-600" />;
      case "Processing":
        return <Truck className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold">Order Details</h2>
            <p className="text-blue-100 text-sm">#{order._id?.slice(-8).toUpperCase()}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            {getStatusIcon(order.orderStatus)}
            <div>
              <p className="text-sm text-gray-600">Order Status</p>
              <p className="font-semibold text-lg">{order.orderStatus}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" /> Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{order.user?.email || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{order.user?.phone || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 md:col-span-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>
                  {order.shippingAddress?.street}, {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Package className="w-5 h-5" /> Order Items
            </h3>
            <div className="space-y-3">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  {item.product?.images?.[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.product?.name || "Product"}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">₹{item.quantity * item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Payment Summary
            </h3>
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">₹{order.totalAmount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <Calendar className="w-4 h-4" />
                <span>Ordered on {new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function AdminDashboard() {
  // ===== STATES =====
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showCustomerPassword, setShowCustomerPassword] = useState(false);

  // Product states
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Customer registration states
  const [isCustomerRegister, setIsCustomerRegister] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: { street: "", city: "", state: "", zipCode: "" },
  });

  const showToast = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("userRole");
    if (token && role === "admin") {
      setIsLoggedIn(true);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loadDashboardData();
    }
  }, []);

  const handleAdminLogin = async () => {
    try {
      const { data } = await axiosInstance.post("/auth/login", loginForm);
      if (data.user?.role === "admin") {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("userRole", "admin");
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setIsLoggedIn(true);
        loadDashboardData();
        showToast("Admin login successful!");
      } else {
        showToast("Only admins can access this dashboard", "error");
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Login failed", "error");
    }
  };

  const handleCustomerAuth = async (e) => {
    e.preventDefault();
    try {
      if (isCustomerRegister) {
        if (customerForm.password !== customerForm.confirmPassword) {
          showToast("Passwords do not match!", "error");
          return;
        }
        await axiosInstance.post("/auth/register", customerForm);
        showToast("Registration successful! Redirecting...", "success");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        const { data } = await axiosInstance.post("/auth/login", {
          email: customerForm.email,
          password: customerForm.password,
        });
        if (data.user?.role === "customer") {
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userData", JSON.stringify(data.user));
          showToast("Login successful! Redirecting...", "success");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          showToast("Invalid customer credentials", "error");
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Authentication failed", "error");
    }
  };

  const handleCustomerFormChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "zipCode"].includes(name)) {
      setCustomerForm((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setCustomerForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setLoginForm({ email: "", password: "" });
    showToast("Logged out successfully!");
  };

  const loadDashboardData = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/stats");
      setStats(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading dashboard:", err);
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/products");
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading products:", err);
      setLoading(false);
    }
  };

  const handleProductSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await axiosInstance.put(`/products/${editingProduct._id}`, productData);
        showToast("Product updated successfully!");
      } else {
        await axiosInstance.post("/products", productData);
        showToast("Product added successfully!");
      }
      setShowProductForm(false);
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save product", "error");
    }
  };

  const handleEditProduct = (p) => {
    setEditingProduct(p);
    setShowProductForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axiosInstance.delete(`/products/${id}`);
        showToast("Product deleted successfully!");
        loadProducts();
      } catch (err) {
        showToast(err.response?.data?.message || "Error deleting product", "error");
      }
    }
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/admin/orders");
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading orders:", err);
      showToast("Failed to load orders", "error");
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/admin/customers");
      setCustomers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading customers:", err);
      showToast("Failed to load customers", "error");
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data } = await axiosInstance.put(`/admin/orders/${orderId}`, { orderStatus: status });
      if (data) {
        showToast("Order status updated!");
        loadOrders();
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Error updating order", "error");
    }
  };

  useEffect(() => {
    if (currentPage === "products") loadProducts();
    else if (currentPage === "customers") loadCustomers();
    else if (currentPage === "orders") loadOrders();
  }, [currentPage]);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter customers
  const filteredCustomers = customers.filter((c) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        {notification.show && (
          <div
            className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in ${
              notification.type === "error" ? "bg-red-500" : "bg-green-500"
            } text-white flex items-center gap-2`}
          >
            {notification.type === "error" ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <Check className="w-5 h-5" />
            )}
            {notification.message}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col lg:flex-row">
          {/* LEFT PANEL */}
          <div className="lg:w-2/5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col justify-center items-center p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-2xl mb-6 inline-block">
                <LayoutDashboard className="w-20 h-20 mx-auto drop-shadow-lg" />
              </div>
              <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">🚴 Bicycle Store</h2>
              <p className="text-lg opacity-90 mb-8">
                {isCustomerRegister
                  ? "Join us and start your cycling journey!"
                  : "Welcome back! Login to continue"}
              </p>

              <div className="space-y-4 w-full max-w-xs mx-auto">
                <button
                  onClick={() => {
                    setIsCustomerRegister(!isCustomerRegister);
                    setCustomerForm({
                      name: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      phone: "",
                      address: { street: "", city: "", state: "", zipCode: "" },
                    });
                  }}
                  className="w-full px-6 py-3 border-2 border-white rounded-xl hover:bg-white hover:text-indigo-600 transition font-medium shadow-lg backdrop-blur-sm"
                >
                  {isCustomerRegister ? "Already have an account? Sign In" : "Create New Account"}
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white opacity-30"></div>
                  <span className="text-sm opacity-75">Secure Login</span>
                  <div className="flex-1 h-px bg-white opacity-30"></div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Fast</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Reliable</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:w-3/5 p-10 lg:p-12">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 flex items-center justify-center gap-3">
              {isCustomerRegister ? (
                <>
                  <Users className="w-8 h-8 text-indigo-600" />
                  Customer Registration
                </>
              ) : (
                <>
                  <ShoppingCart className="w-8 h-8 text-indigo-600" />
                  Customer Login
                </>
              )}
            </h3>

            <form onSubmit={handleCustomerAuth} className="space-y-4">
              {isCustomerRegister && (
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={customerForm.name}
                    onChange={handleCustomerFormChange}
                    required
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                  <Users className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                </div>
              )}

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={customerForm.email}
                  onChange={handleCustomerFormChange}
                  required
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              </div>

              <div className="relative">
                <input
                  type={showCustomerPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={customerForm.password}
                  onChange={handleCustomerFormChange}
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                />
                <CreditCard className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowCustomerPassword(!showCustomerPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showCustomerPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {isCustomerRegister && (
                <>
                  <div className="relative">
                    <input
                      type={showCustomerPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={customerForm.confirmPassword}
                      onChange={handleCustomerFormChange}
                      required
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    />
                    <Check className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={customerForm.phone}
                      onChange={handleCustomerFormChange}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    />
                    <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                    <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Shipping Address
                    </h4>
                    <input
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      value={customerForm.address.street}
                      onChange={handleCustomerFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={customerForm.address.city}
                        onChange={handleCustomerFormChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={customerForm.address.state}
                        onChange={handleCustomerFormChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="ZIP"
                        value={customerForm.address.zipCode}
                        onChange={handleCustomerFormChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg transform hover:scale-[1.02]"
              >
                {isCustomerRegister ? "Create Account" : "Sign In"}
              </button>
            </form>

            {/* Admin Login Section */}
            <div className="mt-10 pt-8 border-t-2 border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <LayoutDashboard className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-700">Admin Portal</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="Admin Email"
                    className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Admin Password"
                    className="w-full px-4 py-3 pl-12 pr-12 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
                  />
                  <CreditCard className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <button
                  onClick={handleAdminLogin}
                  className="w-full bg-gray-800 text-white py-4 rounded-xl hover:bg-gray-900 transition font-semibold shadow-md flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Admin Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
    { name: "Orders", icon: ShoppingCart, page: "orders" },
    { name: "Products", icon: Package, page: "products" },
    { name: "Customers", icon: Users, page: "customers" },
  ];

  const statsCards = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-gradient-to-br from-green-500 to-emerald-600",
      trend: "+12.5%",
      bgLight: "bg-green-50",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      trend: "+8.2%",
      bgLight: "bg-blue-50",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
      trend: "+3.1%",
      bgLight: "bg-purple-50",
    },
    {
      title: "Customers",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-gradient-to-br from-orange-500 to-red-600",
      trend: "+15.3%",
      bgLight: "bg-orange-50",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {notification.show && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-xl shadow-lg z-50 ${
            notification.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white flex items-center gap-2 animate-slide-in`}
        >
          {notification.type === "error" ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <Check className="w-5 h-5" />
          )}
          {notification.message}
        </div>
      )}

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 overflow-hidden shadow-2xl`}
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🚴 <span>Bicycle Admin</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">Management Portal</p>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentPage === item.page
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600 hover:text-white mt-8 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold capitalize text-gray-800">{currentPage}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-800">Admin</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* DASHBOARD */}
          {currentPage === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={i}
                      className={`${card.bgLight} rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`${card.color} p-3 rounded-xl shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm text-green-600 flex items-center gap-1 font-semibold">
                          <TrendingUp className="w-4 h-4" />
                          {card.trend}
                        </span>
                      </div>
                      <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
                      <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                    Recent Orders
                  </h2>
                  <button
                    onClick={() => setCurrentPage("orders")}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    View All
                    <TrendingUp className="w-4 h-4" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="p-4 text-sm font-semibold text-gray-700">Order ID</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Customer</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Amount</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentOrders && stats.recentOrders.length > 0 ? (
                        stats.recentOrders.map((order) => (
                          <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                            <td className="p-4 text-sm font-medium text-gray-800">
                              #{order._id?.slice(-8).toUpperCase()}
                            </td>
                            <td className="p-4 text-sm text-gray-700">{order.user?.name || "N/A"}</td>
                            <td className="p-4 text-sm font-semibold text-gray-800">
                              ₹{order.totalAmount}
                            </td>
                            <td className="p-4 text-sm">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  order.orderStatus === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.orderStatus === "Processing"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.orderStatus}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center p-8 text-gray-500">
                            No recent orders
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {currentPage === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Package className="w-7 h-7 text-purple-600" />
                  Products Management
                </h2>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    <option value="Mountain">Mountain</option>
                    <option value="Road">Road</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                    <option value="Kids">Kids</option>
                  </select>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setShowProductForm(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-md flex items-center gap-2 whitespace-nowrap"
                  >
                    <Package className="w-5 h-5" />
                    Add Product
                  </button>
                </div>
              </div>

              {showProductForm && (
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                    <Package className="w-6 h-6 text-blue-600" />
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h3>
                  <ProductForm
                    product={editingProduct}
                    onSubmit={handleProductSubmit}
                    onCancel={() => {
                      setEditingProduct(null);
                      setShowProductForm(false);
                    }}
                  />
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                {loading ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    Loading products...
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                        <tr>
                          <th className="p-4 text-sm font-semibold text-gray-700">Image</th>
                          <th className="p-4 text-sm font-semibold text-gray-700">Name</th>
                          <th className="p-4 text-sm font-semibold text-gray-700">Brand</th>
                          <th className="p-4 text-sm font-semibold text-gray-700">Category</th>
                          <th className="p-4 text-sm font-semibold text-gray-700">Price</th>
                          <th className="p-4 text-sm font-semibold text-gray-700">Stock</th>
                          <th className="p-4 text-sm font-semibold text-gray-700 text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((p) => (
                            <tr
                              key={p._id}
                              className="border-b hover:bg-gray-50 transition-colors"
                            >
                              <td className="p-4">
                                {p.images?.[0] ? (
                                  <img
                                    src={p.images[0]}
                                    alt={p.name}
                                    className="w-16 h-16 object-cover rounded-xl shadow-sm"
                                  />
                                ) : (
                                  <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                                    <Package className="w-8 h-8 text-gray-400" />
                                  </div>
                                )}
                              </td>
                              <td className="p-4 font-medium text-gray-800">{p.name}</td>
                              <td className="p-4 text-gray-600">{p.brand || "-"}</td>
                              <td className="p-4">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                  {p.category || "N/A"}
                                </span>
                              </td>
                              <td className="p-4 font-semibold text-gray-800">₹{p.price}</td>
                              <td className="p-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    p.stock > 10
                                      ? "bg-green-100 text-green-800"
                                      : p.stock > 0
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {p.stock} units
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2 justify-center">
                                  <button
                                    onClick={() => handleEditProduct(p)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                    title="Edit"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(p._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    title="Delete"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center text-gray-500 py-12">
                              <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                              <p className="text-lg font-medium">No products found</p>
                              <p className="text-sm">Add your first product to get started!</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ORDERS */}
          {currentPage === "orders" && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <ShoppingCart className="w-7 h-7 text-blue-600" />
                  Orders Management
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                  <Download className="w-5 h-5" />
                  Export
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  Loading orders...
                </div>
              ) : orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                      <tr>
                        <th className="p-4 text-sm font-semibold text-gray-700">Order ID</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Customer</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Amount</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Date</th>
                        <th className="p-4 text-sm font-semibold text-gray-700 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                          <td className="p-4 font-medium text-gray-800">
                            #{order._id.slice(-6).toUpperCase()}
                          </td>
                          <td className="p-4 text-gray-700">{order.user?.name || "N/A"}</td>
                          <td className="p-4 font-semibold text-gray-800">
                            ₹{order.totalAmount}
                          </td>
                          <td className="p-4">
                            <select
                              value={order.orderStatus}
                              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                              className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                                order.orderStatus === "Delivered"
                                  ? "bg-green-100 text-green-700 border-green-300"
                                  : order.orderStatus === "Processing"
                                  ? "bg-blue-100 text-blue-700 border-blue-300"
                                  : "bg-yellow-100 text-yellow-700 border-yellow-300"
                              }`}
                            >
                              <option>Pending</option>
                              <option>Processing</option>
                              <option>Delivered</option>
                            </select>
                          </td>
                          <td className="p-4 text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition font-medium"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-lg font-medium">No orders found</p>
                </div>
              )}
            </div>
          )}

          {/* CUSTOMERS */}
          {currentPage === "customers" && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Users className="w-7 h-7 text-orange-600" />
                  Customers Management
                </h2>
                <div className="relative w-full md:w-64">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  Loading customers...
                </div>
              ) : filteredCustomers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                      <tr>
                        <th className="p-4 text-sm font-semibold text-gray-700">Name</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Email</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Phone</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Location</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Joined</th>
                        <th className="p-4 text-sm font-semibold text-gray-700 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((c) => (
                        <tr key={c._id} className="border-b hover:bg-gray-50 transition">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                {c.name?.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-gray-800">{c.name}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {c.email}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {c.phone || "—"}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              {c.address?.city || "—"}
                            </div>
                          </td>
                          <td className="p-4 text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {new Date(c.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => showToast(`Viewing orders for ${c.name}`)}
                                className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm font-medium flex items-center gap-1"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete customer ${c.name}?`)) {
                                    showToast(`Customer ${c.name} deleted`);
                                  }
                                }}
                                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium"
                              >
                                🗑
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-lg font-medium">No customers found</p>
                  <p className="text-sm">Try adjusting your search</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}