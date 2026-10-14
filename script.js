/**
 * Fresh Mart - Pure Vanilla JavaScript Engine
 * Handles Product Rendering, Category Filters, Search, Shopping Cart & Checkout
 */

// ============================================================================
// 1. Sample Grocery Products Data
// ============================================================================
const PRODUCTS = [
  {
    id: 1,
    name: "Fresh Kashmiri Apples",
    category: "fruits",
    price: 140,
    mrp: 180,
    unit: "1 kg (Approx. 4-5 pcs)",
    rating: 4.8,
    ratingCount: 142,
    badge: "Organic",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Ripe Alphonso Mangoes",
    category: "fruits",
    price: 320,
    mrp: 400,
    unit: "1 dozen (Approx. 2.5 kg)",
    rating: 4.9,
    ratingCount: 230,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Organic Cavendish Bananas",
    category: "fruits",
    price: 45,
    mrp: 60,
    unit: "1 dozen (Approx. 1 kg)",
    rating: 4.6,
    ratingCount: 98,
    badge: "Farm Fresh",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Farm Fresh Hybrid Tomatoes",
    category: "vegetables",
    price: 35,
    mrp: 50,
    unit: "1 kg",
    rating: 4.5,
    ratingCount: 178,
    badge: "Farm Fresh",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Fresh Green Broccoli",
    category: "vegetables",
    price: 55,
    mrp: 75,
    unit: "500g (1 head)",
    rating: 4.7,
    ratingCount: 89,
    badge: "Organic",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Tender Green Baby Spinach",
    category: "vegetables",
    price: 25,
    mrp: 35,
    unit: "250g bunch",
    rating: 4.6,
    ratingCount: 64,
    badge: "Locally Grown",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Pure Cow Milk (Pasteurized)",
    category: "dairy",
    price: 34,
    mrp: 38,
    unit: "500 ml pouch",
    rating: 4.9,
    ratingCount: 310,
    badge: "Daily Fresh",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Farm Fresh Brown Eggs",
    category: "dairy",
    price: 85,
    mrp: 105,
    unit: "Pack of 6",
    rating: 4.8,
    ratingCount: 195,
    badge: "High Protein",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    name: "Artisan Whole Wheat Bread",
    category: "bakery",
    price: 48,
    mrp: 55,
    unit: "400g loaf",
    rating: 4.7,
    ratingCount: 112,
    badge: "100% Atta",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    name: "Greek Yogurt (Natural)",
    category: "dairy",
    price: 70,
    mrp: 85,
    unit: "400g tub",
    rating: 4.8,
    ratingCount: 76,
    badge: "Probiotic",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 11,
    name: "Organic Darjeeling Green Tea",
    category: "beverages",
    price: 210,
    mrp: 260,
    unit: "100g tin",
    rating: 4.9,
    ratingCount: 145,
    badge: "Detox",
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 12,
    name: "Crunchy California Almonds",
    category: "snacks",
    price: 290,
    mrp: 360,
    unit: "250g vacuum pack",
    rating: 4.9,
    ratingCount: 188,
    badge: "Premium Quality",
    image: "https://images.unsplash.com/photo-1508061252966-f72fb98abc22?auto=format&fit=crop&w=600&q=80"
  }
];

// Fallback SVG image in case image loading fails
const FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Crect width='100%25' height='100%25' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24' fill='%2364748b' text-anchor='middle' dominant-baseline='middle'%3EFresh%20Grocery%20Item%3C/text%3E%3C/svg%3E";

// Free delivery threshold & standard fee in Rupees
const FREE_DELIVERY_THRESHOLD = 499;
const STANDARD_DELIVERY_FEE = 40;

// ============================================================================
// 2. Application State
// ============================================================================
let currentCategory = "all";
let searchQuery = "";
let cart = loadCartFromStorage();

// ============================================================================
// 3. DOM Elements Cache
// ============================================================================
const productsGrid = document.getElementById("productsGrid");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");
const categoryPillsContainer = document.getElementById("categoryPills");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");

// Cart Elements
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartCountBadge = document.getElementById("cartCountBadge");
const cartHeaderTotal = document.getElementById("cartHeaderTotal");
const cartDrawerCount = document.getElementById("cartDrawerCount");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

// Free Delivery Progress
const trackerText = document.getElementById("trackerText");
const deliveryProgressFill = document.getElementById("deliveryProgressFill");

// Bill Summary
const billSubtotal = document.getElementById("billSubtotal");
const billDelivery = document.getElementById("billDelivery");
const billDiscount = document.getElementById("billDiscount");
const billTotal = document.getElementById("billTotal");

// Floating Mobile Cart
const floatingCartBtn = document.getElementById("floatingCartBtn");
const floatingCartCount = document.getElementById("floatingCartCount");
const floatingCartTotal = document.getElementById("floatingCartTotal");

// Checkout Modal Elements
const checkoutModalOverlay = document.getElementById("checkoutModalOverlay");
const closeCheckoutModalBtn = document.getElementById("closeCheckoutModalBtn");
const cancelCheckoutBtn = document.getElementById("cancelCheckoutBtn");
const checkoutForm = document.getElementById("checkoutForm");
const modalPayableAmount = document.getElementById("modalPayableAmount");

// Order Success Modal Elements
const orderSuccessOverlay = document.getElementById("orderSuccessOverlay");
const successCustName = document.getElementById("successCustName");
const successOrderId = document.getElementById("successOrderId");
const successTotal = document.getElementById("successTotal");
const continueShoppingBtn = document.getElementById("continueShoppingBtn");

// Toast Container
const toastContainer = document.getElementById("toastContainer");

// ============================================================================
// 4. Cart Storage Helpers
// ============================================================================
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("fresh_mart_cart");
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Could not load cart from localStorage", err);
    return [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem("fresh_mart_cart", JSON.stringify(cart));
  } catch (err) {
    console.error("Could not save cart to localStorage", err);
  }
}

// ============================================================================
// 5. Toast Notifications
// ============================================================================
function showToast(message, type = "success") {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type === "danger" ? "toast-danger" : ""}`;
  
  const icon = type === "danger" ? "🗑️" : "✅";
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2400);
}

// ============================================================================
// 6. Product Filtering & Rendering
// ============================================================================
function getFilteredProducts() {
  return PRODUCTS.filter(product => {
    const matchesCategory = (currentCategory === "all") || (product.category.toLowerCase() === currentCategory.toLowerCase());
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();

  // Update results header text
  if (currentCategory === "all" && !searchQuery) {
    resultsCount.textContent = `Showing all ${filtered.length} products`;
  } else if (searchQuery) {
    resultsCount.textContent = `Found ${filtered.length} result(s) for "${searchQuery}"`;
  } else {
    const capitalized = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    resultsCount.textContent = `Showing ${filtered.length} in ${capitalized}`;
  }

  // Handle empty state
  if (filtered.length === 0) {
    productsGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
  }

  // Render product cards
  productsGrid.innerHTML = filtered.map(product => {
    const cartItem = cart.find(item => item.id === product.id);
    const inCartQty = cartItem ? cartItem.qty : 0;

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-image-container">
          <span class="badge-tag">${product.badge}</span>
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="product-image"
            loading="lazy"
            onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';"
          >
          <span class="product-rating">★ ${product.rating.toFixed(1)}</span>
        </div>

        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <span class="product-unit">${product.unit}</span>

          <div class="product-bottom-row">
            <div class="product-pricing">
              <span class="product-price">₹${product.price}</span>
              <span class="product-mrp">₹${product.mrp}</span>
            </div>

            <div class="product-action-wrapper" id="action-wrapper-${product.id}">
              ${
                inCartQty > 0
                  ? `
                  <div class="card-qty-control" aria-label="Quantity for ${product.name}">
                    <button class="card-qty-btn" onclick="updateItemQuantity(${product.id}, -1)" aria-label="Decrease quantity">−</button>
                    <span class="card-qty-count">${inCartQty}</span>
                    <button class="card-qty-btn" onclick="updateItemQuantity(${product.id}, 1)" aria-label="Increase quantity">+</button>
                  </div>
                  `
                  : `
                  <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add
                  </button>
                  `
              }
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// ============================================================================
// 7. Cart Core Operations
// ============================================================================
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      unit: product.unit,
      image: product.image,
      qty: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  renderProducts(); // Refresh in-card buttons

  // Bump animation for header badge
  cartCountBadge.classList.add("bump");
  setTimeout(() => cartCountBadge.classList.remove("bump"), 250);

  showToast(`Added ${product.name} to cart!`);
}

function updateItemQuantity(productId, change) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  const item = cart[itemIndex];
  const newQty = item.qty + change;

  if (newQty <= 0) {
    cart.splice(itemIndex, 1);
    showToast(`Removed ${item.name} from cart`, "danger");
  } else {
    item.qty = newQty;
  }

  saveCartToStorage();
  updateCartUI();
  renderProducts();
}

function removeFromCart(productId) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  const itemName = cart[itemIndex].name;
  cart.splice(itemIndex, 1);

  saveCartToStorage();
  updateCartUI();
  renderProducts();

  showToast(`Removed ${itemName} from cart`, "danger");
}

function clearCart() {
  if (cart.length === 0) return;

  if (confirm("Are you sure you want to clear all items from your cart?")) {
    cart = [];
    saveCartToStorage();
    updateCartUI();
    renderProducts();
    showToast("Shopping cart has been cleared", "danger");
  }
}

// ============================================================================
// 8. Cart UI Rendering & Calculations
// ============================================================================
function calculateCartTotals() {
  let totalItemsCount = 0;
  let subtotal = 0;
  let mrpTotal = 0;

  cart.forEach(item => {
    totalItemsCount += item.qty;
    subtotal += item.price * item.qty;
    mrpTotal += (item.mrp || item.price) * item.qty;
  });

  const discount = Math.max(0, mrpTotal - subtotal);
  const deliveryFee = (subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD) ? 0 : STANDARD_DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  return {
    totalItemsCount,
    subtotal,
    discount,
    deliveryFee,
    grandTotal
  };
}

function updateCartUI() {
  const totals = calculateCartTotals();

  // 1. Update Badges & Counts
  cartCountBadge.textContent = totals.totalItemsCount;
  cartHeaderTotal.textContent = `₹${totals.subtotal}`;
  cartDrawerCount.textContent = `(${totals.totalItemsCount} ${totals.totalItemsCount === 1 ? "item" : "items"})`;

  // 2. Floating Mobile Button
  if (floatingCartBtn) {
    floatingCartCount.textContent = totals.totalItemsCount;
    floatingCartTotal.textContent = `₹${totals.subtotal}`;
    floatingCartBtn.style.display = (totals.totalItemsCount > 0 && window.innerWidth <= 768) ? "flex" : "none";
  }

  // 3. Free Delivery Tracker
  if (totals.subtotal === 0) {
    trackerText.innerHTML = `Add ₹${FREE_DELIVERY_THRESHOLD} more for <strong>FREE Delivery!</strong>`;
    deliveryProgressFill.style.width = "0%";
  } else if (totals.subtotal >= FREE_DELIVERY_THRESHOLD) {
    trackerText.innerHTML = "🎉 Congratulations! You unlocked <strong>FREE Delivery!</strong>";
    deliveryProgressFill.style.width = "100%";
  } else {
    const diff = FREE_DELIVERY_THRESHOLD - totals.subtotal;
    const progress = Math.min(100, Math.round((totals.subtotal / FREE_DELIVERY_THRESHOLD) * 100));
    trackerText.innerHTML = `Add ₹${diff} more for <strong>FREE Delivery!</strong>`;
    deliveryProgressFill.style.width = `${progress}%`;
  }

  // 4. Cart Items List Rendering
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-message">
        <div class="empty-cart-icon">🛒</div>
        <h4>Your cart is empty!</h4>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <button class="btn btn-primary" onclick="closeCartDrawer()">Start Shopping</button>
      </div>
    `;
    clearCartBtn.disabled = true;
    checkoutBtn.disabled = true;
    clearCartBtn.style.opacity = "0.5";
    checkoutBtn.style.opacity = "0.5";
  } else {
    clearCartBtn.disabled = false;
    checkoutBtn.disabled = false;
    clearCartBtn.style.opacity = "1";
    checkoutBtn.style.opacity = "1";

    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img 
          src="${item.image}" 
          alt="${item.name}" 
          class="cart-item-img"
          onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';"
        >
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-rate">₹${item.price} • ${item.unit}</div>
          <div class="cart-item-controls">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="updateItemQuantity(${item.id}, -1)" aria-label="Decrease quantity">−</button>
              <span class="qty-display">${item.qty}</span>
              <button class="qty-btn" onclick="updateItemQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
            </div>
            <span class="cart-item-total">₹${item.price * item.qty}</span>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item" aria-label="Remove item">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `).join("");
  }

  // 5. Bill Summary Breakdown
  billSubtotal.textContent = `₹${totals.subtotal}`;
  billDelivery.textContent = totals.deliveryFee === 0 ? "FREE" : `₹${totals.deliveryFee}`;
  billDiscount.textContent = `-₹${totals.discount}`;
  billTotal.textContent = `₹${totals.grandTotal}`;
}

// ============================================================================
// 9. Drawer & Modal Controls
// ============================================================================
function openCartDrawer() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
  cartOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
  cartOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Your cart is empty!", "danger");
    return;
  }
  const totals = calculateCartTotals();
  modalPayableAmount.textContent = `₹${totals.grandTotal}`;
  checkoutModalOverlay.classList.remove("hidden");
  closeCartDrawer();
}

function closeCheckoutModal() {
  checkoutModalOverlay.classList.add("hidden");
  checkoutForm.reset();
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const totals = calculateCartTotals();

  // Generate random Order ID like #FM-78423
  const randomOrderId = "#FM-" + Math.floor(10000 + Math.random() * 90000);

  // Set values on success modal
  successCustName.textContent = name || "Customer";
  successOrderId.textContent = randomOrderId;
  successTotal.textContent = `₹${totals.grandTotal}`;

  // Clear Cart
  cart = [];
  saveCartToStorage();
  updateCartUI();
  renderProducts();

  // Switch Modals
  closeCheckoutModal();
  orderSuccessOverlay.classList.remove("hidden");
}

function closeSuccessModal() {
  orderSuccessOverlay.classList.add("hidden");
}

// ============================================================================
// 10. Event Listeners Setup
// ============================================================================
function setupEventListeners() {
  // Category Pills Filter
  categoryPillsContainer.addEventListener("click", (e) => {
    const pill = e.target.closest(".category-pill");
    if (!pill) return;

    // Update active pill styling
    document.querySelectorAll(".category-pill").forEach(p => {
      p.classList.remove("active");
      p.setAttribute("aria-selected", "false");
    });
    pill.classList.add("active");
    pill.setAttribute("aria-selected", "true");

    currentCategory = pill.dataset.category;
    renderProducts();
  });

  // Footer Category Links
  document.querySelectorAll(".footer-category-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetCat = link.dataset.cat;
      const targetPill = document.querySelector(`.category-pill[data-category="${targetCat}"]`);
      if (targetPill) {
        targetPill.click();
        window.scrollTo({ top: 350, behavior: "smooth" });
      }
    });
  });

  // Search Input Filter
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    clearSearchBtn.style.display = searchQuery ? "block" : "none";
    renderProducts();
  });

  // Clear Search Button
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.style.display = "none";
    searchInput.focus();
    renderProducts();
  });

  // Reset Filters Button
  resetFiltersBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.style.display = "none";
    const allPill = document.querySelector('.category-pill[data-category="all"]');
    if (allPill) allPill.click();
  });

  // Cart Drawer open/close
  openCartBtn.addEventListener("click", openCartDrawer);
  closeCartBtn.addEventListener("click", closeCartDrawer);
  cartOverlay.addEventListener("click", closeCartDrawer);

  if (floatingCartBtn) {
    floatingCartBtn.addEventListener("click", openCartDrawer);
  }

  // Clear Cart Action
  clearCartBtn.addEventListener("click", clearCart);

  // Checkout Actions
  checkoutBtn.addEventListener("click", openCheckoutModal);
  closeCheckoutModalBtn.addEventListener("click", closeCheckoutModal);
  cancelCheckoutBtn.addEventListener("click", closeCheckoutModal);
  checkoutForm.addEventListener("submit", handleCheckoutSubmit);

  // Success Modal Close
  continueShoppingBtn.addEventListener("click", closeSuccessModal);

  // Close modals on overlay backdrop click
  checkoutModalOverlay.addEventListener("click", (e) => {
    if (e.target === checkoutModalOverlay) closeCheckoutModal();
  });
  orderSuccessOverlay.addEventListener("click", (e) => {
    if (e.target === orderSuccessOverlay) closeSuccessModal();
  });

  // Close on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!checkoutModalOverlay.classList.contains("hidden")) closeCheckoutModal();
      else if (!orderSuccessOverlay.classList.contains("hidden")) closeSuccessModal();
      else if (cartDrawer.classList.contains("active")) closeCartDrawer();
    }
  });

  // Window resize to toggle floating cart display
  window.addEventListener("resize", () => {
    const totals = calculateCartTotals();
    if (floatingCartBtn) {
      floatingCartBtn.style.display = (totals.totalItemsCount > 0 && window.innerWidth <= 768) ? "flex" : "none";
    }
  });
}

// ============================================================================
// 11. Initialization
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();
  setupEventListeners();
});
