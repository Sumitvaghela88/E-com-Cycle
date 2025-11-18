import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api";

export default function AdminAuth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.role === "admin") navigate("/admin");
  }, [user, navigate]);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email: form.email.trim(),
        password: form.password,
      });

      if (!data?.user) return toast.error("Invalid server response.");
      if (data.user.role !== "admin") return toast.error("Only admins allowed.");

      login(data.user, data.token);
      toast.success(`Welcome, ${data.user.name}!`);
      navigate("/admin");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center p-4">

      <div className="bg-white/80 backdrop-blur-xl border border-gray-300 shadow-[0_10px_35px_rgba(0,0,0,0.25)] rounded-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-8 text-center shadow-md">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white/90 shadow-lg rounded-full flex items-center justify-center border border-purple-200">
              <svg
                className="w-12 h-12 text-purple-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold tracking-wide">Admin Portal</h2>
          <p className="text-sm mt-2 opacity-80">Secure Administrator Login</p>
        </div>

        {/* Form */}
        <div className="p-8">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 shadow-inner outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border rounded-lg shadow-inner focus:ring-2 focus:ring-purple-500 focus:border-purple-600 transition pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In as Admin"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
