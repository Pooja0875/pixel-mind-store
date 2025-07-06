# 🛍️ Pixel Mind Store

**Pixel Mind Store** is a sleek, responsive e-commerce frontend built with **Next.js**, **Zustand**, **React Query**, and **CSS Modules**. It offers product browsing, cart management, and a secure admin panel to manage custom products.

---

## 🔗 Live Demo

> [Visit the Live Site](https://your-vercel-deployment-url.vercel.app)

---

## ✨ Features

### 🛒 For Customers
- Browse products from [FakeStoreAPI](https://fakestoreapi.com/)
- Search & filter products by category
- Add products to cart
- View cart in a floating side drawer
- View product details in a floating popup

### 🔐 For Admins
- Secure login with password (local validation)
- Add new products (stored in localStorage)
- Delete existing locally added products
- Session timeout after 30 minutes of inactivity

---

## 🧰 Tech Stack

- **Next.js** 15
- **React** 18
- **Zustand** – State management
- **React Query** – API fetching
- **CSS Modules** – Styling
- **Vercel** – Deployment

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/Pooja0875/pixel-mind-store.git
cd pixel-mind-store
npm install
npm run dev

🔐 Admin Login
Navigate to: /admin-login

Password: admin123

After login, you'll be redirected to the Admin Panel where you can:

➕ Add new product

🗑️ Delete existing locally added product


📁 Folder Structure
pixel-mind-store/
├── components/
├── pages/
├── public/
├── store/           # Zustand global store
├── styles/
├── README.md

🙌 Acknowledgements
FakeStoreAPI – Dummy product data

Vercel – Deployment platform