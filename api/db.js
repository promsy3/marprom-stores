require('dotenv').config();
const mongoose = require('mongoose');

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing in environment variables');
  }

  // Set connectTimeoutMS and other options if needed
  const db = await mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false,
  });

  cachedDb = db;
  return db;
}

module.exports = connectToDatabase;
