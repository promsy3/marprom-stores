const connectToDatabase = require('./db');
const Order = require('../models/Order');

module.exports = async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await connectToDatabase();

        // GET /api/orders - Protected by ADMIN_KEY
        if (req.method === 'GET') {
            const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
            
            if (!process.env.ADMIN_KEY) {
                return res.status(500).json({ error: "Server configuration error: ADMIN_KEY not set" });
            }

            if (adminKey !== process.env.ADMIN_KEY) {
                return res.status(401).json({ error: "Unauthorized access" });
            }

            const orders = await Order.find({}).sort({ createdAt: -1 });
            return res.status(200).json(orders);
        }

        // POST /api/orders - Public (for checkout)
        if (req.method === 'POST') {
            // Manual body parsing for serverless compatibility if needed
            let body = req.body;
            if (!body) {
                let rawBody = '';
                await new Promise((resolve) => {
                    req.on('data', chunk => { rawBody += chunk; });
                    req.on('end', resolve);
                });
                if (rawBody) body = JSON.parse(rawBody);
            }

            const { items, totalAmount } = body || {};
            
            if (!items || !totalAmount) {
                return res.status(400).json({ error: "Missing order items or total amount" });
            }

            const newOrder = new Order({
                items,
                totalAmount,
                status: 'pending'
            });

            await newOrder.save();
            return res.status(201).json({ message: "Order recorded successfully", orderId: newOrder._id });
        }

        return res.status(405).json({ error: "Method not allowed" });

    } catch (err) {
        console.error("API Error (Orders):", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};
