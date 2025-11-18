import { Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoadingScreen from "./Components/LoadingScreen";

import AdminDashboard from "./Pages/Dashboard";
import ProductsPage from "./Pages/ProductPage";
import Cart from "./Pages/CartPage";
import OrderSuccess from "./Pages/Ordersuccess";
import CustomerAuth from "./Pages/CustomerAuth";
import AdminAuth from "./Pages/AdminAuth";

import CustomerProtectedRoute from "./Components/CustomerProtectedRoute";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";

import { AuthContext } from "./context/AuthContext";

const Home = lazy(() => import("./Pages/Home"));

function App() {
  const { user, role } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />

      <Suspense fallback={<LoadingScreen />}>
        <main className="overflow-x-hidden bg-white text-gray-900">
          <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/order-success" element={<OrderSuccess />} />

            {/* CUSTOMER AUTH */}
            <Route
              path="/customer-auth"
              element={
                user && role === "customer" ? (
                  <Navigate to="/" />
                ) : user && role === "admin" ? (
                  <Navigate to="/admin" />
                ) : (
                  <CustomerAuth />
                )
              }
            />

            {/* ADMIN AUTH */}
            <Route
              path="/admin-auth"
              element={
                user && role === "admin" ? (
                  <Navigate to="/admin" />
                ) : user && role === "customer" ? (
                  <Navigate to="/" />
                ) : (
                  <AdminAuth />
                )
              }
            />

            {/* CUSTOMER PROTECTED */}
            <Route
              path="/products"
              element={
                <CustomerProtectedRoute>
                  <ProductsPage />
                </CustomerProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <CustomerProtectedRoute>
                  <Cart />
                </CustomerProtectedRoute>
              }
            />

            {/* ADMIN PROTECTED */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />

            {/* DEFAULT */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Suspense>

      <Footer />
    </Router>
  );
}

export default App;
