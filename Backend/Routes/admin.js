const express = require('express');
const { protect, admin } = require('../Middeleware/auth');
const {
  getStats,
  getOrders,
  updateOrderStatus,
} = require('../Controllers/adminController');

const router = express.Router();
router.use(protect, admin);

router.get('/stats', getStats);
router.get('/orders', getOrders);
router.put('/orders/:id', updateOrderStatus);

module.exports = router;
