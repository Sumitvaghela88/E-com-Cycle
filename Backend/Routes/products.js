const express = require('express');
const router = express.Router();
const uploads = require('../Config/Multer.js');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../Controllers/productController');

// 🟢 Create Product
router.post('/', uploads.single('image'), createProduct);

// 🟡 Get All Products
router.get('/', getProducts);

// 🔵 Get Single Product
router.get('/:id', getProductById);

// 🟠 Update Product
router.put('/:id', uploads.single('image'), updateProduct);

// 🔴 Delete Product
router.delete('/:id', deleteProduct);

module.exports = router;
