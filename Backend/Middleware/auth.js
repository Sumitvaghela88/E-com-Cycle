const jwt = require("jsonwebtoken");
const User = require("../Models/User");

// ============================
// PROTECT ROUTES (HEADER TOKEN)
// ============================
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user)
      return res.status(401).json({ message: "User not found" });

    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

// ============================
// ADMIN ONLY
// ============================
exports.admin = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  res.status(403).json({ message: "Admins only" });
};
