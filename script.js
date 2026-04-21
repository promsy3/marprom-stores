// Marprom Store - Main Logic
const fallbackProducts = [
  // Clothes 
  { id: 1, name: 'Spiral Beadwork Abaya', category: 'clothes', price: 60, image:'product1.jpg', trending: true },
  { id: 2, name: 'Beaded Floral Abaya', category: 'clothes', price: 60, image:'product2.jpg', trending: true },
  { id: 3, name: 'Embellished Abaya', category: 'clothes', price: 60, image:'product3.jpg', trending: false },
  { id: 4, name: '3D Floral Appliqué', category: 'clothes', price: 60, image: 'product4.jpg', trending: false },
  { id: 5, name: 'Luxury Lilac Abaya', category: 'clothes', price: 60, image: 'product5.jpg', trending: true },
  { id: 6, name: 'Farasha Abaya', category: 'clothes', price: 70, image: 'product6.jpg', trending: true },
 
  // Bags 
  { id: 7, name: 'Leather Crossbody Variant', category: 'bags', price: 180, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80', trending: false },
  { id: 8, name: 'Minimalist Ivory Clutch', category: 'bags', price: 95, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80', trending: true },
  { id: 9, name: 'Heritage Leather Satchel', category: 'bags', price: 280, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80', trending: false },
  
  // Watches 
  { id: 10, name: 'Minimalist Black Dial', category: 'watches', price: 250, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80', trending: true },
  { id: 11, name: 'Heritage Chronograph', category: 'watches', price: 380, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80', trending: false },
  { id: 12, name: 'Eco-Leather Strap Edition', category: 'watches', price: 210, image: 'https://images.unsplash.com/photo-1508656919614-3d964f40f09a?auto=format&fit=crop&w=600&q=80', trending: true },
  
  // Bangles / Jewelry
  { id: 13, name: 'Gold Statement Ring/Bangle', category: 'bangles', price: 145, image: 'bangle1.jpg', trending: true },
  { id: 14, name: 'Minimalist Silver Stack', category: 'bangles', price: 125, image: 'https://images.unsplash.com/photo-1573408301145-b98c4af010f3?auto=format&fit=crop&w=600&q=80', trending: true },
  { id: 15, name: 'Ceramic Detail Bangle', category: 'bangles', price: 89, image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80', trending: false },
  { id: 16, name: 'Pearl Accent Detail', category: 'bangles', price: 175, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80', trending: false },
];

let products = fallbackProducts;
let cart = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Failed to fetch from backend');
    const data = await response.json();
    if(Array.isArray(data) && data.length > 0) {
      products = data;
      console.log("Loaded products from MongoDB!");
    }
  } catch(err) {
    console.warn("Backend not ready or MongoDB not connected. Falling back to local offline data.");
    products = fallbackProducts;
  }

  displayTrendingProducts();
  displayProducts();
  setupIntersectionObservers();
});

// Animations on Scroll
function setupIntersectionObservers() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Display Trending Products
function displayTrendingProducts() {
  const trending = products.filter(p => p.trending).slice(0, 4);
  const container = document.getElementById('trendingProducts');
  if (!container) return;
  container.innerHTML = trending.map(product => createProductCard(product, true)).join('');
}

// Filter Products
function filterProducts(category) {
  currentFilter = category;
  
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-link'));
  
  // Conceptually update active states
  const targetBtns = Array.from(document.querySelectorAll('.filter-btn')).filter(btn => btn.innerText.toLowerCase().includes(category.toLowerCase()) || (category === 'all' && btn.innerText.toLowerCase().includes('view all')));
  if(targetBtns.length > 0) targetBtns[0].classList.add('active');

  const targetNavs = Array.from(document.querySelectorAll('.nav-link')).filter(link => link.getAttribute('onclick')?.includes(category));
  if(targetNavs.length > 0) targetNavs[0].classList.add('active-link');
  
  displayProducts();

  const collectionSection = document.getElementById('collection');
  if(collectionSection && window.scrollY > collectionSection.offsetTop + 100) {
    collectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Display Filtered Products
function displayProducts() {
  const filtered = currentFilter === 'all' 
    ? products 
    : products.filter(p => p.category === currentFilter);
  
  const container = document.getElementById('productsGrid');
  if (!container) return;
  container.innerHTML = filtered.map(product => createProductCard(product, false)).join('');
}

function createProductCard(product, isTrendingSection) {
  const label = (product.trending && !isTrendingSection) ? '<span class="trending-label">Trending</span>' : '';
  
  return `
    <div class="product-card">
      ${label}
      <div class="product-image">
        <img src="${product.image}" loading="lazy" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80'">
        <button class="add-to-cart" onclick="addToCart(${product.id || "'"+product._id+"'"})">Add to selection</button>
      </div>
      <div class="product-info">
        <div class="product-name serif-font">${product.name}</div>
        <div class="product-price">$${product.price}</div>
      </div>
    </div>
  `;
}

// Cart Logic
function addToCart(productId) {
  const product = products.find(p => (p.id === productId || p._id === productId));
  if (!product) return;

  const existingItem = cart.find(item => (item.id === productId || item._id === productId));
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  toggleCart(true);
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cartCount');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  
  const cartItemsContainer = document.getElementById('cartItems');
  const cartSummary = document.getElementById('cartSummary');
  if (!cartItemsContainer) return;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-cart">Your selection is empty</div>';
    if (cartSummary) cartSummary.innerHTML = '';
    return;
  }
  
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80'">
      <div class="cart-item-info">
        <div class="cart-item-top">
          <div class="cart-item-name serif-font">${item.name}</div>
          <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
        <div class="cart-item-bottom">
          <span class="qty-control">Qty: ${item.quantity}</span>
          <button class="remove-btn" onclick="removeFromCart(${item.id || "'"+item._id+"'"})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (cartSummary) {
    cartSummary.innerHTML = `
      <div class="cart-total serif-font">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
    `;
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => (item.id !== productId && item._id !== productId));
  updateCartUI();
}

function toggleCart(forceOpen) {
  const modal = document.getElementById('cartModal');
  if (!modal) return;
  if(forceOpen === true) {
    modal.classList.add('open');
  } else {
    modal.classList.toggle('open');
  }
}

// Close cart on outside click
window.onclick = function(e) {
  const modal = document.getElementById('cartModal');
  if(e.target === modal) {
    toggleCart(false);
  }
};

async function checkout() {
  if (cart.length === 0) return;
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let message = "Hello Marprom Stores! I would like to place an order for the following items:\n\n";
  const itemsForBackend = [];
  
  cart.forEach(item => {
    message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
    itemsForBackend.push({
      productId: item.id || item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    });
  });
  
  message += `\n*Total Amount: $${total.toFixed(2)}*\n\nPlease confirm my order.`;

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: itemsForBackend, totalAmount: total })
    });
    if (!response.ok) console.warn("Backend order recording failed, check MONGO_URI.");
  } catch(err) {
    console.warn("Could not submit order to backend. Redirecting to WhatsApp anyway.", err);
  }

  const whatsappUrl = `https://wa.me/2348162430522?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');

  cart = [];
  updateCartUI();
  toggleCart(false);
}