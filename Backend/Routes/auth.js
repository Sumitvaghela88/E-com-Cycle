const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require("../Controllers/authController");

const { protect, admin } = require("../Middleware/auth");


const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Auto Login (Cookie check)
router.get("/me", protect, getMe);

// Logout (clear cookie)
router.get("/logout", logoutUser);

// Test Protected Route
router.get("/profile", protect, (req, res) => {
  res.json({ user: req.user });
});

// Admin-only route
router.get("/admin-only", protect, admin, (req, res) => {
  res.json({ message: "Admin access granted" });
});

module.exports = router;
