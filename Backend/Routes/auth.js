const express = require('express');
const { registerUser, loginUser } = require('../Controllers/authController');
const { protect, admin } = require('../Middeleware/auth');

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route example
router.get('/profile', protect, (req, res) => {
  res.json({ user: req.user });
});

// Admin-only example
router.get('/admin-only', protect, admin, (req, res) => {
  res.json({ message: "Admin access granted" });
});

module.exports = router;
