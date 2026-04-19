require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  // Clothes 
  { id: 1, name: 'Spiral Beadwork Abaya', category: 'clothes', price: 60, image:'product1.jpg', description: 'Pure organic cotton in timeless design', trending: true, rating: '★★★★★ (128)' },
  { id: 2, name: 'Beaded Floral Abaya', category: 'clothes', price: 60, image:'product2.jpg',  description: 'Breathable linen-cotton blend', trending: true, rating: '★★★★★ (95)' },
  { id: 3, name: 'Embellished Abaya', category: 'clothes', price: 60, image:'product3.jpg', description: 'Sustainable denim crafted with precision', trending: false, rating: '★★★★★ (87)' },
  { id: 4, name: '3D Floral Appliqué', category: 'clothes', price: 60, image: 'product4.jpg', description: 'Hand-finished organic cotton knit', trending: false, rating: '★★★★★ (73)' },
  { id: 5, name: 'Luxury Lilac Abaya', category: 'clothes', price: 60, image: 'product5.jpg', description: 'Summer-ready organic linen dress', trending: true, rating: '★★★★★ (112)' },
  { id: 6, name: 'Farasha Abaya', category: 'clothes', price: 70, image: 'product6.jpg', description: 'Durable organic canvas everyday bag', trending: true, rating: '★★★★★ (156)' },
 
  // Bags 
  { id: 7, name: 'Leather Crossbody Variant', category: 'bags', price: 180, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80', description: 'Premium leather with sustainable sourcing', trending: false, rating: '★★★★★ (98)' },
  { id: 8, name: 'Minimalist Ivory Clutch', category: 'bags', price: 95, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80', description: 'Sleek design, perfect for evenings', trending: true, rating: '★★★★★ (142)' },
  { id: 9, name: 'Heritage Leather Satchel', category: 'bags', price: 280, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80', description: 'Timeless leather craftsmanship', trending: false, rating: '★★★★★ (67)' },
  
  // Watches 
  { id: 10, name: 'Minimalist Black Dial', category: 'watches', price: 250, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80', description: 'Sleek design with sustainable materials', trending: true, rating: '★★★★★ (189)' },
  { id: 11, name: 'Heritage Chronograph', category: 'watches', price: 380, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80', description: 'Classic elegance that lasts generations', trending: false, rating: '★★★★★ (76)' },
  { id: 12, name: 'Eco-Leather Strap Edition', category: 'watches', price: 210, image: 'https://images.unsplash.com/photo-1508656919614-3d964f40f09a?auto=format&fit=crop&w=600&q=80', description: 'Eco-friendly materials, timeless style', trending: true, rating: '★★★★★ (134)' },
  
  // Bangles / Jewelry
  { id: 13, name: 'Gold Statement Ring/Bangle', category: 'bangles', price: 145, image: 'bangle1.jpg', description: 'Premium 18k gold-plated brass', trending: true, rating: '★★★★★ (203)' },
  { id: 14, name: 'Minimalist Silver Stack', category: 'bangles', price: 125, image: 'https://images.unsplash.com/photo-1573408301145-b98c4af010f3?auto=format&fit=crop&w=600&q=80', description: 'Set of three elegant stacking bangles', trending: true, rating: '★★★★★ (167)' },
  { id: 15, name: 'Ceramic Detail Bangle', category: 'bangles', price: 89, image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80', description: 'Handmade ceramic with natural finishes', trending: false, rating: '★★★★★ (91)' },
  { id: 16, name: 'Pearl Accent Detail', category: 'bangles', price: 175, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80', description: 'Freshwater pearl with elegant spacing', trending: false, rating: '★★★★★ (103)' },
];

async function seedDB() {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI not found in environment variables. Please create a .env file with your MongoDB connection string.");
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await Product.deleteMany({});
    console.log("Cleared existing products.");

    await Product.insertMany(products);
    console.log("Successfully seeded", products.length, "products.");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seedDB();
