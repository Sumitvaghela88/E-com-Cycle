import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoadingScreen from "./Components/LoadingScreen";
import AdminDashboard from "./Pages/Dashboard";
import ProductsPage from "./Pages/ProductPage";
import Cart from "./Pages/CartPage";
import SellIcon from "@mui/icons-material/Sell"; 
import OrderSuccess from "./Pages/Ordersuccess";



// Lazy load Home page
const Home = lazy(() => import("./Pages/Home"));

// Placeholder routed pages
const CategoriesPage = () => (
  <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-gray-700">
    All Categories Page Coming Soon
  </div>                                                             
);
const SellPage = () => (
  <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-gray-700">
    Sell Page Coming Soon
  </div>
);
const CartPage = () => (
  <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-gray-700">
    Cart Page Coming Soon
  </div>
);
const AccountPage = () => (
  <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-gray-700">
    Account Page Coming Soon
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />

      <Suspense fallback={<LoadingScreen />}>
        <main className="overflow-x-hidden bg-white text-gray-900">
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Home />} />

            {/* Other routes */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/sell" element={<SellPage/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<AdminDashboard />} />
            <Route path="/sell" element={<OrderSuccess />} />

            
          </Routes>
        </main>
      </Suspense>

      <Footer />
    </Router>
  );
}

export default App;
