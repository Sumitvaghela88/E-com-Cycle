import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

export default function CustomerAuth() {
  const [isLogin, setIsLogin] = useState(true); // toggle between login/register
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
    phone: "",
    address: { street: "", city: "", state: "", zipCode: "" },
  });

  // Initial form state for resetting
  const initialFormState = {
    name: "",
    email: "",
    confirmPassword: "", // Added confirmPassword to initial state
    password: "",
    phone: "",
    address: { street: "", city: "", state: "", zipCode: "" },
  };

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

  // ====== HANDLE SUBMIT ======
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // === LOGIN ===
        const { data } = await axios.post(`${API_URL}/auth/login`, {
          email: form.email,
          password: form.password,
        });

        if (data.user?.role === "customer") {
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userData", JSON.stringify(data.user));
          toast.success(`Welcome back, ${data.user.name}!`);
          navigate("/");
        } else {
          toast.error("Only customers can log in here.");
        }
      } else {
        // === REGISTER ===
        if (form.password !== form.confirmPassword) {
          toast.error("Passwords do not match!");
          setLoading(false);
          return;
        }
        const { data } = await axios.post(`${API_URL}/auth/register`, form);
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        {/* LEFT PANEL */}
        <div className="md:w-1/2 bg-indigo-600 text-white flex flex-col justify-center items-center p-10 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {isLogin ? "Welcome Back!" : "Join Our Ride 🚴"}
          </h2>
          <p className="text-sm mb-6">
            {isLogin
              ? "Login to access your account and explore new bicycles."
              : "Sign up now and start your cycling journey with us!"}
          </p>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setForm(initialFormState); // Clear form fields on toggle
            }}
            className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-indigo-600 transition"
          >
            {isLogin ? "Create an Account" : "Already have an account?"}
          </button>
        </div>

        {/* RIGHT PANEL (FORM) */}
        <div className="md:w-1/2 p-10">
          <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isLogin ? "Customer Login" : "Customer Registration"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name only in register */}
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            )}

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />

            {/* Confirm Password only in register */}
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            )}
            {/* Extra fields for register */}
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={form.address.street}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.address.city}
                    onChange={handleChange}
                    className="col-span-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.address.state}
                    onChange={handleChange}
                    className="col-span-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP"
                    value={form.address.zipCode}
                    onChange={handleChange}
                    className="col-span-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                </div>
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading
                ? isLogin
                  ? "Signing in..."
                  : "Registering..."
                : isLogin
                ? "Sign In"
                : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
