const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  brand: String,
  images: [String],
  stock: { type: Number, default: 0 },
  specifications: { 
    frameSize: String,
    wheelSize: String,
    gears: String,
    material: String,
    weight: String,
    color: [String],
  },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
