const connectToDatabase = require('./db');
const Product = require('../models/Product');

module.exports = async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: "Method not allowed" });
    
    try {
        await connectToDatabase();
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (err) {
        console.error("API Error (Products):", err);
        res.status(500).json({ error: "Failed to fetch products", details: err.message });
    }
};
