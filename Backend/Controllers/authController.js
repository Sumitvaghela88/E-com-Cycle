const jwt = require("jsonwebtoken");
const User = require("../Models/User");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ==============================
// REGISTER USER
// ==============================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      role: "customer",
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token, // 👈 Send token to frontend now
    });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ==============================
// LOGIN USER
// ==============================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful",
      user,
      token, //  Send token to frontend (JS cookie will store)
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

// ==============================
// GET LOGGED USER
// ==============================
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to get user" });
  }
};

// ==============================
// LOGOUT USER
// ==============================
exports.logoutUser = (req, res) => {
  res.json({ message: "Logged out successfully" });
};
