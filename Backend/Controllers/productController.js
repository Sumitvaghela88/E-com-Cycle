const Product = require('../Models/Product');
const cloudinary = require('../Config/cloudynary'); 

//  CREATE Product (with optional image upload)
exports.createProduct = async (req, res) => {
  try {
    console.log('REQ BODY:', req.body);
    console.log('REQ FILE:', req.file);

    const { name, description, price, brand, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Upload image to Cloudinary if provided
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'bicycle-products',
      });
      imageUrl = result.secure_url;
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      brand,
      stock: stock || 0,
      images: imageUrl ? [imageUrl] : [],
      specifications: {
        frameSize: req.body.frameSize,
        wheelSize: req.body.wheelSize,
        gears: req.body.gears,
        material: req.body.material,
        weight: req.body.weight,
        color: req.body.color ? req.body.color.split(',') : [],
      },
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error(' Product creation failed:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  GET All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  GET Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  UPDATE Product
exports.updateProduct = async (req, res) => {
  try {
    const updateData = req.body;

    // If new image uploaded, update Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'bicycle-products',
      });
      updateData.images = [result.secure_url];
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updated,
    });
  } catch (error) {
    console.error(' Update failed:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//  DELETE Product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
