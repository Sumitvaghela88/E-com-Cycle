// server.js
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const app = require('./app');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
