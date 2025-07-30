# 🛒 E-Commerce Shopping Site using MERN

A fully functional **E-Commerce Web Application** built with the **MERN Stack** (MongoDB, Express.js, React.js with Vite, Node.js) and styled with modern UI/UX. This platform allows **users to buy** their favorite clothing products and **sellers to upload and sell** their own clothing items.

> ✨ Recently built and deployed on **Render** using the **Yarn** package manager for both frontend and backend.

---

## 🚀 Features

### 👥 User Side:
- User registration and secure login/logout
- Browse a wide range of clothing products
- Add products to cart and wishlist
- Place orders and view order history
- Responsive UI for all screen sizes

### 🛍️ Seller/Admin Side:
- Seller login & dashboard
- Upload new products with image previews
- Manage inventory (update/delete)
- View sales reports and order details

### 🔧 Tech Stack

| Technology | Description |
|------------|-------------|
| **React (Vite)** | Fast frontend development with hot module replacement |
| **Express.js** | Backend routing and API handling |
| **Node.js** | Server-side runtime |
| **MongoDB** | NoSQL database for product, user, and order management |
| **Yarn** | Package manager for handling dependencies |
| **Render** | Full-stack deployment for both frontend and backend |

---

## 📁 Project Structure

E-Commerce-Shopping-Site-using-MERN/
├── client/ # Vite + React frontend
├── server/ # Node + Express backend
├── admin-panel/ # Separate admin panel (if applicable)
├── .env # Environment variables
└── README.md

yaml
Copy
Edit

---

## 🌐 Live Demo

- 🖥️ **Frontend (User View):** [https://e-commerce-shopping-site-using-mern-8nu3.onrender.com](https://e-commerce-shopping-site-using-mern-8nu3.onrender.com)
- 🛠️ **Admin Panel:** [https://e-commerce-shopping-site-using-mern-admin.onrender.com](https://e-commerce-shopping-site-using-mern-admin.onrender.com)
- 🌍 **API Server:** [https://e-commerce-shopping-site-using-mern.onrender.com](https://e-commerce-shopping-site-using-mern.onrender.com)

> 📝 Replace the above links with your actual Render deployed URLs.

---

## 🧰 Getting Started (Local Development)

### Prerequisites:
- Node.js and Yarn installed
- MongoDB running locally or on MongoDB Atlas

 Setup Backend:
bash
Copy
Edit
cd server
yarn install
yarn dev
3. Setup Frontend:
bash
Copy
Edit
cd ../client
yarn install
yarn dev
4. (Optional) Setup Admin Panel:
bash
Copy
Edit
cd ../admin-panel
yarn install
yarn dev


🔐 Environment Variables
Create a .env file in the server/ directory with the following:
env
Copy
Edit
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Update frontend .env as needed with backend API base URL.

📸 Screenshots
(Add screenshots of homepage, product page, cart, admin dashboard, etc.)

🤝 Contributing
Pull requests and feedback are welcome! Feel free to fork this repo and submit PRs.

📜 License
This project is licensed under the MIT License.

💬 Contact
Ayush Verma
📧 [ayve012@gmail.com]

### 1. Clone the repo:
```bash
git clone https://github.com/yourusername/E-Commerce-Shopping-Site-using-MERN.git
cd E-Commerce-Shopping-Site-using-MERN
