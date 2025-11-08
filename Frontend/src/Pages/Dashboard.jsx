import React, { useState, useEffect } from "react";
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

const API_URL = "http://localhost:5000/api";

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
  const [editProduct, setEditProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
    images: [],
    specifications: {
      frameSize: "",
      wheelSize: "",
      gears: "",
      material: "",
      weight: "",
      color: [],
    },
  });

  // ===== AUTH / INIT =====
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
      loadDashboardData();
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();
      if (response.ok && data.user.role === "admin") {
        localStorage.setItem("adminToken", data.token);
        setIsLoggedIn(true);
        loadDashboardData();
      } else {
        alert("Invalid credentials or not an admin");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setLoginForm({ email: "", password: "" });
  };

  // ===== DASHBOARD =====
  const loadDashboardData = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading dashboard:", err);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(`${API_URL}/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: status }),
      });
      if (response.ok) {
        alert("Order status updated!");
        loadDashboardData();
      } else alert("Failed to update order");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // ===== PRODUCT CRUD =====
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading products:", err);
      setLoading(false);
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("spec_")) {
      const specKey = name.replace("spec_", "");
      setProductForm({
        ...productForm,
        specifications: {
          ...productForm.specifications,
          [specKey]: value,
        },
      });
    } else {
      setProductForm({ ...productForm, [name]: value });
    }
  };

  const handleColorChange = (e) => {
    const colors = e.target.value.split(",").map((c) => c.trim());
    setProductForm({
      ...productForm,
      specifications: {
        ...productForm.specifications,
        color: colors,
      },
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = editProduct ? "PUT" : "POST";
      const url = editProduct
        ? `${API_URL}/products/${editProduct._id}`
        : `${API_URL}/products`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        alert(editProduct ? "Product updated successfully!" : "Product added successfully!");
        setShowProductForm(false);
        setEditProduct(null);
        resetProductForm();
        loadProducts();
      } else {
        alert("Failed to save product");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      brand: "",
      stock: "",
      images: [],
      specifications: {
        frameSize: "",
        wheelSize: "",
        gears: "",
        material: "",
        weight: "",
        color: [],
      },
    });
  };

  const handleEditProduct = (p) => {
    setEditProduct(p);
    setProductForm({
      ...p,
      specifications: p.specifications || {
        frameSize: "",
        wheelSize: "",
        gears: "",
        material: "",
        weight: "",
        color: [],
      },
    });
    setShowProductForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
        alert("Product deleted successfully!");
        loadProducts();
      } catch (err) {
        alert("Error deleting product: " + err.message);
      }
    }
  };

  const handleAddNew = () => {
    setEditProduct(null);
    resetProductForm();
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
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <LayoutDashboard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">Bicycle E-commerce Dashboard</p>
          </div>

          <div className="space-y-6">
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              placeholder="admin@example.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
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

      {/* Main */}
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
          {/* DASHBOARD PAGE */}
          {currentPage === "dashboard" && (
            <div className="space-y-6">
              {/* Stats */}
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
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.orderStatus === "Delivered" 
                                  ? "bg-green-100 text-green-800"
                                  : order.orderStatus === "Processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
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

          {/* PRODUCTS PAGE */}
          {currentPage === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Products Management
                </h2>
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
                  <h3 className="text-xl font-semibold mb-4">
                    {editProduct ? "Edit Product" : "Add New Product"}
                  </h3>

                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    {/* Basic Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={productForm.name}
                        onChange={handleProductChange}
                        required
                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        name="price"
                        placeholder="Price (₹)"
                        value={productForm.price}
                        onChange={handleProductChange}
                        required
                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={productForm.brand}
                        onChange={handleProductChange}
                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        name="stock"
                        placeholder="Stock Quantity"
                        value={productForm.stock}
                        onChange={handleProductChange}
                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <textarea
                      name="description"
                      placeholder="Product Description"
                      value={productForm.description}
                      onChange={handleProductChange}
                      required
                      rows="3"
                      className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Specifications */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3 text-gray-700">Specifications</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input
                          type="text"
                          name="spec_frameSize"
                          placeholder="Frame Size (e.g., 17, 19, 21)"
                          value={productForm.specifications.frameSize}
                          onChange={handleProductChange}
                          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          name="spec_wheelSize"
                          placeholder="Wheel Size (e.g., 26, 27.5, 29)"
                          value={productForm.specifications.wheelSize}
                          onChange={handleProductChange}
                          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          name="spec_gears"
                          placeholder="Gears (e.g., 21, 24)"
                          value={productForm.specifications.gears}
                          onChange={handleProductChange}
                          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          name="spec_material"
                          placeholder="Material (e.g., Aluminum, Steel)"
                          value={productForm.specifications.material}
                          onChange={handleProductChange}
                          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          name="spec_weight"
                          placeholder="Weight (e.g., 12kg)"
                          value={productForm.specifications.weight}
                          onChange={handleProductChange}
                          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          name="colors"
                          placeholder="Colors (comma separated)"
                          value={productForm.specifications.color?.join(", ") || ""}
                          onChange={handleColorChange}
                          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="border-t pt-4">
                      <label className="font-medium text-gray-700 block mb-2">
                        Product Images
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          Promise.all(
                            files.map(
                              (file) =>
                                new Promise((resolve, reject) => {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => resolve(ev.target.result);
                                  reader.onerror = reject;
                                  reader.readAsDataURL(file);
                                })
                            )
                          ).then((base64Images) => {
                            setProductForm((prev) => ({
                              ...prev,
                              images: [...(prev.images || []), ...base64Images],
                            }));
                          });
                        }}
                        className="border p-2 rounded-lg w-full"
                      />
                    </div>

                    {/* Image Preview */}
                    {productForm.images?.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {productForm.images.map((img, i) => (
                          <div
                            key={i}
                            className="relative border rounded-lg overflow-hidden group"
                          >
                            <img
                              src={img}
                              alt={`preview-${i}`}
                              className="w-full h-24 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = [...productForm.images];
                                newImages.splice(i, 1);
                                setProductForm({ ...productForm, images: newImages });
                              }}
                              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        {editProduct ? "Update Product" : "Add Product"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditProduct(null);
                          setShowProductForm(false);
                          resetProductForm();
                        }}
                        className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products Table */}
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
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                p.stock > 10 
                                  ? "bg-green-100 text-green-800"
                                  : p.stock > 0
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
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
                          <td
                            colSpan="9"
                            className="text-center text-gray-500 py-8"
                          >
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