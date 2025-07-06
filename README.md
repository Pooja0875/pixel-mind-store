# 🛍️ Pixel Mind Store

A fully responsive e-commerce frontend built with **Next.js**, **TypeScript**, **CSS Modules**, and **Zustand**. It integrates product filtering, a floating cart drawer, and admin features to add or delete local products.

---

### 🌐 Live Demo

🔗 [Visit Pixel Mind Store](https://pixel-mind-store.netlify.app/)

---

### 📦 Features

- 🔍 **Search + Category Filtering**
- 🛒 **Cart Drawer with Zustand**
- 💳 **Payment UI with QR Code**
- 📱 **Fully Responsive Design**
- 🔄 **Persistent Cart (localStorage)**
- 💾 **Local Product Storage (Admin)**
- ⚙️ **Admin Login with Expiry (30 mins)**

---

### 🔐 Admin Panel

Go to `/admin-login` and enter this password to access admin functions:
admin123


#### ✅ Admin Actions

- ➕ Add New Product
- 🗑️ Delete Locally Added Products  
  (including products from previous sessions)

---

### 🛠️ Tech Stack

- **Next.js 15**
- **TypeScript**
- **Zustand (Global Store)**
- **CSS Modules**
- **FakeStoreAPI**
- **localStorage + session routing**

---

### 🚀 Getting Started

```bash
git clone https://github.com/Pooja0875/pixel-mind-store.git
cd pixel-mind-store
npm install
npm run dev


🛡️ Notes
Only products added by admin can be deleted.

Cart and local products are stored in localStorage.

Images use next/image and support remote hosts like:

fakestoreapi.com

i.imgur.com

gstatic.com

qrserver.com


👨‍💻 Author
Created by Pooja0875