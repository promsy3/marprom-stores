require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) return cachedDb;
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is missing');
    const db = await mongoose.connect(process.env.MONGO_URI);
    cachedDb = db;
    return db;
}

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: "Method not allowed" });
    
    try {
        await connectToDatabase();
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products", details: err.message });
    }
};
