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
} from "lucide-react";
import toast from "react-hot-toast";
import ProductForm from "../Components/ProductForm";

const API_URL = "http://localhost:5000/api";
const axiosInstance = axios.create({ baseURL: API_URL });

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

  // ===== PRODUCT STATES =====
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // ===== AUTH / INIT =====
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
      loadDashboardData();
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const handleLogin = async () => {
    try {
      const { data } = await axiosInstance.post("/auth/login", loginForm);
      if (data.user?.role === "admin") {
        localStorage.setItem("adminToken", data.token);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setIsLoggedIn(true);
        loadDashboardData();
        toast.success("Login successful!");
      } else {
        toast.error(data.message || "Invalid credentials or not an admin");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setLoginForm({ email: "", password: "" });
  };

  // ===== DASHBOARD =====
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

  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data } = await axiosInstance.put(`/admin/orders/${orderId}`, { orderStatus: status });
      if (data) {
        toast.success("Order status updated!");
        loadDashboardData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error: " + err.message);
    }
  };

  // ===== PRODUCT CRUD =====
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
        toast.success("Product updated successfully!");
      } else {
        await axiosInstance.post("/products", productData);
        toast.success("Product added successfully!");
      }
      setShowProductForm(false);
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save product.");
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
        toast.success("Product deleted successfully!");
        loadProducts();
      } catch (err) {
        toast.error(err.response?.data?.message || "Error deleting product.");
      }
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowProductForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (currentPage === "products") {
      loadProducts();
    }
  }, [currentPage]);

  // ===== LOGIN PAGE =====
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Optional faint background pattern */}
        {/* <div className="absolute inset-0 bg-[url('/bike-pattern.svg')] opacity-10 bg-cover"></div> */}

        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700 relative z-10">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-2xl inline-block mb-4 shadow-lg">
              <LayoutDashboard className="w-12 h-12 text-gray-300" />
            </div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Admin Login</h1>
            <p className="text-gray-400">Bicycle E-commerce Dashboard</p>
          </div>

          <div className="space-y-5">
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
            />
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 py-3 rounded-lg hover:from-gray-600 hover:to-gray-500 transition shadow-lg font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== DASHBOARD NAVIGATION =====
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
      color: "bg-green-500",
      trend: "+12.5%",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-500",
      trend: "+8.2%",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-purple-500",
      trend: "+3.1%",
    },
    {
      title: "Customers",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-orange-500",
      trend: "+15.3%",
    },
  ];

  // ===== MAIN LAYOUT =====
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-gray-900 text-white transition-all duration-300 overflow-hidden`}
      >
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold">🚴 Bicycle Admin</h2>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.page
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 mt-8 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {sidebarOpen ? <X /> : <Menu />}
              </button>
              <h1 className="text-2xl font-bold capitalize">{currentPage}</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
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
                      className="bg-white rounded-xl shadow-sm p-6 border hover:shadow-lg transition"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`${card.color} p-3 rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm text-green-600 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {card.trend}
                        </span>
                      </div>
                      <h3 className="text-gray-600 text-sm">{card.title}</h3>
                      <p className="text-3xl font-bold">{card.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-3 text-sm font-medium text-gray-700">Order ID</th>
                        <th className="p-3 text-sm font-medium text-gray-700">Customer</th>
                        <th className="p-3 text-sm font-medium text-gray-700">Amount</th>
                        <th className="p-3 text-sm font-medium text-gray-700">Status</th>
                        <th className="p-3 text-sm font-medium text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentOrders && stats.recentOrders.length > 0 ? (
                        stats.recentOrders.map((order) => (
                          <tr key={order._id} className="border-b hover:bg-gray-50">
                            <td className="p-3 text-sm">{order._id?.slice(-8)}</td>
                            <td className="p-3 text-sm">{order.user?.name || "N/A"}</td>
                            <td className="p-3 text-sm">₹{order.totalAmount}</td>
                            <td className="p-3 text-sm">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
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
                            <td className="p-3 text-sm">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center p-6 text-gray-500">
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
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Products Management</h2>
                <button
                  onClick={handleAddNew}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  + Add Product
                </button>
              </div>

              {/* Product Form */}
              {showProductForm && (
                <div className="bg-white p-6 rounded-xl shadow-md border">
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

              {/* Product Table */}
              <div className="bg-white rounded-xl shadow-md border overflow-x-auto">
                {loading ? (
                  <div className="text-center py-10 text-gray-500">Loading products...</div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="p-4 text-sm font-medium text-gray-700">Image</th>
                        <th className="p-4 text-sm font-medium text-gray-700">Name</th>
                        <th className="p-4 text-sm font-medium text-gray-700">Brand</th>
                        <th className="p-4 text-sm font-medium text-gray-700">Price</th>
                        <th className="p-4 text-sm font-medium text-gray-700">Stock</th>
                        <th className="p-4 text-sm font-medium text-gray-700">Frame Size</th>
                        <th className="p-4 text-sm font-medium text-gray-700">Wheel Size</th>
                        <th className="p-4 text-sm font-medium text-gray-700">Colors</th>
                        <th className="p-4 text-sm font-medium text-gray-700 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((p) => (
                          <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                            <td className="p-4">
                              {p.images?.[0] ? (
                                <img
                                  src={p.images[0]}
                                  alt={p.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              ) : (
                                <span className="text-gray-400 italic text-sm">No image</span>
                              )}
                            </td>
                            <td className="p-4 font-medium">{p.name}</td>
                            <td className="p-4">{p.brand || "-"}</td>
                            <td className="p-4">₹{p.price}</td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  p.stock > 10
                                    ? "bg-green-100 text-green-800"
                                    : p.stock > 0
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {p.stock}
                              </span>
                            </td>
                            <td className="p-4">{p.specifications?.frameSize || "-"}</td>
                            <td className="p-4">{p.specifications?.wheelSize || "-"}</td>
                            <td className="p-4">
                              {p.specifications?.color?.length > 0
                                ? p.specifications.color.join(", ")
                                : "-"}
                            </td>
                            <td className="p-4">
                              <div className="flex gap-3 justify-center">
                                <button
                                  onClick={() => handleEditProduct(p)}
                                  className="text-yellow-600 hover:text-yellow-800 text-lg transition"
                                  title="Edit"
                                >
                                  ✏️
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p._id)}
                                  className="text-red-600 hover:text-red-800 text-lg transition"
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
                          <td colSpan="9" className="text-center text-gray-500 py-8">
                            No products found. Add your first product!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ORDERS PAGE */}
          {currentPage === "orders" && (
            <div className="bg-white rounded-xl shadow-md border p-6">
              <h2 className="text-xl font-semibold mb-4">Orders Management</h2>
              <p className="text-gray-500">Orders functionality coming soon...</p>
            </div>
          )}

          {/* CUSTOMERS PAGE */}
          {currentPage === "customers" && (
            <div className="bg-white rounded-xl shadow-md border p-6">
              <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
              <p className="text-gray-500">Customer management functionality coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
