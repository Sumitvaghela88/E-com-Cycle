const express = require('express');
const { protect } = require('../Middleware/auth');
const { getMyOrders } = require('../Controllers/orderController');

const router = express.Router();
router.use(protect);

router.get('/my-orders', getMyOrders);

module.exports = router;
