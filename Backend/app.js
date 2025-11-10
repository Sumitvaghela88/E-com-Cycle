// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// ===== MIDDLEWARE =====

// Allow frontend requests
app.use(cors());

// Parse JSON and URL-encoded data with increased limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files (for uploaded images or other assets)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== ROUTES =====
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/products', require('./Routes/products'));
app.use('/api/orders', require('./Routes/order'));
app.use('/api/admin', require('./Routes/admin'));
app.use("/api/customer", require("./Routes/admin"));

const paymentRoutes = require("./Routes/Payment");
app.use('/api/payment', paymentRoutes);


// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

module.exports = app;
