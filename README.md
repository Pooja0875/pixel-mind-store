# 🛍️ Pixel Mind Store

**Pixel Mind Store** is a modern e-commerce frontend application built using **Next.js** and **TypeScript**. It allows users to browse products, add items to a cart, and for admins to manage products (add or delete locally). Product data comes from the FakeStore API and user-added local storage.

## 🚀 Live Demo

🔗 [Click here to view the live site](https://app.netlify.com/projects/pixel-mind-store/)  


## 📦 Features

- 🛒 Browse and add products to cart
- 🔍 Search and filter by product category
- 🧑‍💼 Admin login for product management
- ➕ Add new products (stored locally)
- 🗑️ Delete locally added products
- 🖼️ Product detail popup with image
- 🧠 Zustand for global state management

---

## ⚙️ Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher recommended)
- npm

### Clone and Run Locally

```bash
git clone https://github.com/your-username/pixel-mind-store.git
cd pixel-mind-store
npm install
npm run dev

Then visit http://localhost:3000

🔐 Admin Access
To access the admin panel:

Go to /admin-login

Use the password: admin123

Admin panel includes:

➕ Add New Product

🗑️ Delete Existing Product (added locally)

⚠️ Admin session expires after 30 minutes.

🧱 Tech Stack
Next.js

TypeScript

Zustand

FakeStore API

[CSS Modules] or [Tailwind CSS]

📁 Folder Structure
bash
Copy code
/components       → Reusable UI components
/pages            → Next.js pages (e.g., browse, admin-login)
/store            → Zustand store for global state
/styles           → CSS Modules
/public           → Public assets

Recommended build settings:

Build Command: npm run build

Publish Directory: .next