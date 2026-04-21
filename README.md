# Marprom Stores 🌟

A modern, full-stack e-commerce web application for premium organic apparel and accessories. Custom built with a dynamic frontend and a scalable serverless backend optimized for Vercel.

## Features ✨

- **Glassmorphism UI:** Built with vanilla HTML/CSS, featuring a professional landing page, responsive product grids, and smooth reveal animations.
- **Serverless API:** A robust API system using Vercel Functions (`/api`) serving dynamic data from MongoDB.
- **MongoDB Atlas Integration:** Full Mongoose data modeling providing persistent inventory and order tracking.
- **WhatsApp Checkout:** Cart sessions automatically compile into detailed receipt manifests and funnel users to a live WhatsApp Concierge API endpoint.
- **Secured Order Management:** Background order recording with a secured GET endpoint for store owners.
- **Offline Fallback Architecture:** Safely reverts to local data if the database is unreachable.

## Tech Stack 🛠️

- **Frontend:** HTML5, CSS3, Vanilla JS (Reorganized into `script.js`)
- **Backend:** Node.js, Vercel Serverless Functions
- **Database:** MongoDB Atlas, Mongoose
- **Environment:** Dotenv

## Local Setup 🚀

To run this project locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   ADMIN_KEY=your_secure_admin_password
   ```

3. **Seed the database:**
   Populate your MongoDB database with starting inventory:
   ```bash
   npm run seed
   ```

4. **Start local development:**
   Using the Vercel CLI (recommended):
   ```bash
   npm run dev
   ```
   Or serve the static files:
   ```bash
   npm start
   ```

## API Endpoints 🔌

- `GET /api/products`: Retrieve all products.
- `POST /api/orders`: Submit a new order.
- `GET /api/orders`: View all orders (Requires `x-admin-key` header or `adminKey` query param).

---

*Handcrafted by Marprom Stores. Premium Organic Apparel & Accessories.*
