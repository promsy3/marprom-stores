require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('../models/Order');

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
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });
    
    try {
        await connectToDatabase();
        if(!req.body) {
            let body = '';
            await new Promise((resolve) => {
                req.on('data', chunk => { body += chunk; });
                req.on('end', resolve);
            });
            if(body) req.body = JSON.parse(body);
        }

        const { items, totalAmount } = req.body || {};
        
        const newOrder = new Order({
            items,
            totalAmount,
            status: 'pending'
        });

        await newOrder.save();
        res.status(201).json({ message: "Order recorded successfully", orderId: newOrder._id });
    } catch (err) {
        res.status(500).json({ error: "Failed to record order", details: err.message });
    }
};
