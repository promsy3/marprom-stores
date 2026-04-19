require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
} else {
  console.warn('WARNING: MONGO_URI is not defined in .env! Backend is running without database connection.');
}

// GET route for products
app.get('/api/products', async (req, res) => {
    try {
        if (!process.env.MONGO_URI) {
            return res.status(503).json({ error: "Database not connected. Please set MONGO_URI in .env" });
        }
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products", details: err.message });
    }
});

// POST route for orders
app.post('/api/orders', async (req, res) => {
    try {
        if (!process.env.MONGO_URI) {
            return res.status(503).json({ error: "Database not connected" });
        }
        const { items, totalAmount } = req.body;
        
        const newOrder = new Order({
            items,
            totalAmount,
            status: 'pending' // pending until WhatsApp contact
        });

        await newOrder.save();
        res.status(201).json({ message: "Order recorded successfully", orderId: newOrder._id });
    } catch (err) {
        res.status(500).json({ error: "Failed to record order", details: err.message });
    }
});

// Start local server if not running in production serverless environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(5000, () => {
        console.log("Server running locally on port 5000");
    });
}

// Export for Vercel
module.exports = app;