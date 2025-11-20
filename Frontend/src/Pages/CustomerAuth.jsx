// src/Pages/CustomerAuth.jsx
import React, { useState, useContext, useEffect } from "react";
import api from "../Utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import Cookies from "js-cookie";

export default function CustomerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const initialFormState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: { street: "", city: "", state: "", zipCode: "" },
  };

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["street", "city", "state", "zipCode"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ===========================
      // LOGIN
      // ===========================
      if (isLogin) {
        const { data } = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        if (data.user?.role !== "customer") {
          toast.error("This account is not a customer.");
          return;
        }

        // Save token
        Cookies.set("token", data.token, { expires: 7 });

        // Update auth context
        login(data.user, data.token);

        toast.success(`Welcome back, ${data.user.name}!`);
        navigate("/");
        return;
      }

      // ===========================
      // REGISTER
      // ===========================
      if (!isLogin) {
        if (form.password !== form.confirmPassword) {
          toast.error("Passwords do not match.");
          return;
        }

        const { data } = await api.post("/auth/register", form);

        // Save token
        Cookies.set("token", data.token, { expires: 7 });

        login(data.user, data.token);

        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center p-4">
      <div className="backdrop-blur-lg bg-white/60 border border-gray-200 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT PANEL */}
        <div className="md:w-1/2 bg-gradient-to-br from-gray-800 to-gray-700 text-white flex flex-col justify-center items-center p-10 text-center">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wide drop-shadow">
            {isLogin ? "Welcome Back!" : "Join Us Today"}
          </h2>

          <p className="text-sm mb-6 opacity-90">
            {isLogin
              ? "Login to access your customer account."
              : "Create your account and enjoy our services!"}
          </p>

          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setForm(initialFormState);
            }}
            className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-gray-800 transition-all duration-300 shadow-sm"
          >
            {isLogin ? "Create an Account" : "Already have an account?"}
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:w-1/2 p-10">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-700">
            {isLogin ? "Customer Login" : "Customer Registration"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 ring-gray-400 outline-none bg-white/70"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 ring-gray-400 outline-none bg-white/70"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 ring-gray-400 outline-none bg-white/70"
            />

            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 ring-gray-400 outline-none bg-white/70"
              />
            )}

            {!isLogin && (
              <>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 ring-gray-400 outline-none bg-white/70"
                />

                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={form.address.street}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 ring-gray-400 outline-none bg-white/70"
                />

                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.address.city}
                    onChange={handleChange}
                    className="px-4 py-3 border rounded-lg focus:ring-2 ring-gray-400 outline-none bg-white/70"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.address.state}
                    onChange={handleChange}
                    className="px-4 py-3 border rounded-lg focus:ring-2 ring-gray-400 outline-none bg-white/70"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP"
                    value={form.address.zipCode}
                    onChange={handleChange}
                    className="px-4 py-3 border rounded-lg focus:ring-2 ring-gray-400 outline-none bg-white/70"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 shadow-md"
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
