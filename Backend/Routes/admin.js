const express = require('express');
const { protect, admin } = require('../Middleware/auth');
const {
  getStats,
  getOrders,
  updateOrderStatus,
  getCustomers,
} = require('../Controllers/adminController');

const router = express.Router();

router.get('/stats', getStats);
router.get('/orders', getOrders);
router.put('/orders/:id', updateOrderStatus);

router.get("/customers", getCustomers);

module.exports = router;
