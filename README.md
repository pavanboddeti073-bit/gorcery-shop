# 🛒 Fresh Mart - Online Grocery Store

A modern, responsive, and lightweight grocery shopping web application built with pure HTML5, CSS3, and Vanilla JavaScript.

![Fresh Mart Preview](https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

- **Green & White Clean Theme**: Fresh aesthetic with mint highlights, subtle shadows, and responsive layout.
- **Product Catalog (12+ Items)**: Diverse grocery selection (Fruits, Vegetables, Dairy, Bakery, Beverages, Snacks) with ratings, prices in ₹, and unit metrics.
- **Search & Filter**: Real-time instant search and category filter pills with instant result counts.
- **Interactive Shopping Cart**:
  - Slide-out cart drawer with backdrop blur.
  - Increment/decrement quantity controls (`+` / `−`).
  - Item removal and total price breakdown (Subtotal, Delivery Fee, Discounts).
  - Free delivery threshold tracker (Free delivery over ₹499).
  - Persistent cart state saved via `localStorage`.
- **Demo Checkout & Order Confirmation**: Form validation for address and payment method (Cash on Delivery / UPI / Card) and order receipt modal with unique order ID.
- **Mobile Optimized**: Responsive design with touch-friendly controls and sticky floating cart button on mobile devices.

---

## 📁 Project Structure

```
├── index.html    # Core markup, accessible structure, modals & drawers
├── style.css     # CSS custom variables, grid layout, animations, responsive design
├── script.js     # State management, search/filter logic, cart operations & localStorage
└── README.md     # Project documentation
```

---

## 🚀 Quick Start (Local Run)

No installations or build tools required! Simply open `index.html` in your browser:

```bash
# Option 1: Open index.html directly in your favorite browser

# Option 2: Run with Python's built-in HTTP server
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🌐 Deploy to Vercel or GitHub Pages

- **GitHub Pages**: Go to **Settings** > **Pages** > Select branch `main` and folder `/ (root)` > Click **Save**.
- **Vercel**: Import the GitHub repository and click **Deploy** (zero configuration needed).

---

## 📄 License
This project is open-source and free to use under the MIT License.
