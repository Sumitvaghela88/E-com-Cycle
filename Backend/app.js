const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require('path');

const app = express();

// ===== MIDDLEWARE =====
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== ROUTES =====
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/products', require('./Routes/products'));
app.use('/api/orders', require('./Routes/order'));
app.use('/api/admin', require('./Routes/admin'));

const paymentRoutes = require("./Routes/Payment");
app.use('/api/payment', paymentRoutes);

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

module.exports = app;
