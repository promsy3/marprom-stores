# Marprom Stores 🌟

A modern, full-stack e-commerce web application for premium organic apparel and accessories. Custom built with a dynamic frontend, a scalable Node.js backend, and optimized for serverless deployments on Vercel.

## Features ✨

- **Dynamic Frontend:** Built with vanilla HTML/CSS/JS, featuring a glassmorphism navigation bar, responsive product grids, filtering functionality, and smooth reveal animations.
- **Node.js & Express Backend:** A robust REST API routing system serving dynamic data directly to the client.
- **MongoDB Atlas Integration:** Full Mongoose data modeling providing persistent, real-time inventory and order databases.
- **WhatsApp Checkout Workflow:** Cart sessions automatically compile into detailed receipt manifests and seamlessly funnel users to a live WhatsApp Concierge API endpoint for instant checkout and personal assistance.
- **Offline Fallback Architecture:** Safely detects database network disruptions and instantly reverts to local data rendering.
- **Serverless Ready:** Configured fundamentally with a `vercel.json` routing configuration to seamlessly deploy via Vercel Serverless Functions.

## Tech Stack 🛠️

- **Frontend:** HTML5, CSS3, Vanilla JS
- **Backend:** Node.js, Express.js, CORS
- **Database:** MongoDB Atlas, Mongoose
- **Environment:** Dotenv

## Local Setup 🚀

To run this project locally on your machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Database configuration:**
   Create a `.env` file in the root directory and add your MongoDB Atlas string:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.your-url.mongodb.net/marprom?retryWrites=true&w=majority
   ```

3. **Seed the database:**
   *(Optional)* If starting from scratch, you can push the starting inventory to your MongoDB database using:
   ```bash
   node seedDb.js
   ```

4. **Start the backend server:**
   ```bash
   node server.js
   ```
   The backend will safely launch on `http://localhost:5000`.

5. **Start the frontend:**
   Open `index.html` via Live Server or `npx serve`.

---

*Handcrafted by Marprom Stores. Premium Organic Apparel & Accessories.*
