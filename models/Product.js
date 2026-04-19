const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  trending: {
    type: Boolean,
    default: false
  },
  rating: {
    type: String,
    default: "★★★★★ (0)"
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
