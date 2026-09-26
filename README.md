# Stock-Sense
Odoo x LPU Jalandhar Hackathon 2026

StockSense is a full-stack, modular Inventory Management System (IMS) designed to digitize and streamline stock-related operations for modern businesses. It replaces manual registers, scattered Excel sheets, and disjointed tracking methods with a centralized, real-time platform.

The system tracks all stock movements—incoming receipts, outgoing deliveries, internal warehouse transfers, and inventory adjustments—using a double-entry stock ledger architecture.

Key Features

⚬ Real-time Inventory Dashboard: Provides an immediate snapshot of stock health with KPIs like Total Products, Low/Out of Stock items, Pending Receipts, Pending Deliveries, and Scheduled Internal Transfers. Includes dynamic filtering by document type, status, warehouse location, and product category.
⚬ Double-Entry Stock Ledger: All inventory movements (Receipts, Deliveries, Transfers, Adjustments) are logged as immutable transactions rather than direct count mutations, providing audit trails.
⚬ Product Catalog Management: Manage products with custom SKUs, categories, units of measure (UOM), and automated low-stock threshold alerts.
⚬ Incoming Receipts Management: Process incoming goods from vendors, log received quantities, and update stock levels automatically upon validation.
⚬ Outgoing Delivery Orders: Streamline customer order fulfillment with picking and packing workflows that automatically deduct stock upon validation.
⚬ Internal Warehouse Transfers: Track stock movements between internal locations (e.g., Main Store to Production Rack or Rack A to Rack B) without altering total inventory counts.
⚬ Stock Adjustments: Easily reconcile mismatches between software-recorded stock and physical inventory counts.

Target Audience & Roles

⚬ Inventory Managers: Monitor stock levels, track pending receipts and deliveries, configure reorder rules, and view stock history.
⚬ Warehouse Staff: Perform picking, packing, shelving, internal transfers, and physical stock counting.

System Architecture & Tech Stack

StockSense is built using the MERN stack:

⚬ Frontend: React.js (Vite), Tailwind CSS, Lucide React (Icons), Axios, React Router
⚬ Backend: Node.js, Express.js, JSON Web Tokens (JWT), Bcrypt.js
⚬ Database: MongoDB (via Mongoose ODM) / MongoDB Atlas
⚬ Containerization: Docker & Docker Compose

Directory Structure

stocksense/
├── backend/
│   ├── models/
│   │   └── Models.js          # MongoDB Schemas (User, Product, Transaction)
│   ├── package.json           # Backend dependencies and scripts
│   └── server.js              # Express API server & routes
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx     # Master layout shell
│   │   │   └── Sidebar.jsx    # Primary navigation sidebar
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx  # Landing dashboard with KPIs
│   │   │   ├── Products.jsx   # Product management page
│   │   │   └── operations/
│   │   │       ├── Receipts.jsx     # Incoming stock form
│   │   │       ├── Deliveries.jsx   # Outgoing stock form
│   │   │       ├── Adjustments.jsx  # Inventory reconciliation form
│   │   │       └── History.jsx      # Stock ledger history
│   │   ├── App.jsx            # React Router configurations
│   │   ├── index.css          # Tailwind CSS directive imports
│   │   └── main.jsx           # Vite application entry point
│   ├── package.json           # Frontend dependencies
│   └── tailwind.config.js     # Tailwind design system configuration
└── docker-compose.yml         # Container orchestration setup


API Contract Summary

Endpoint	Method	Description	Payload Body / Query
/api/auth/login	POST	User authentication & session generation	{ email, password }
/api/dashboard/kpis	GET	Fetches real-time dashboard stats	None
/api/products	POST	Registers a new product SKU	{ name, sku, category, unitOfMeasure }
/api/operations/receipt	POST	Logs incoming stock from supplier	{ productId, supplier, quantity }
/api/operations/delivery	POST	Logs outgoing stock to customer	{ productId, customer, quantity }
/api/operations/transfer	POST	Moves stock between internal racks/warehouses	{ productId, quantity, fromLocation, toLocation }
/api/operations/adjustment	POST	Corrects stock count discrepancies	{ productId, differenceQuantity, location }

Quick Start Guide

Prerequisites

⚬ Node.js (v18 or higher)
⚬ MongoDB (Local instance or MongoDB Atlas connection string)
⚬ npm or yarn

Local Setup

1. Clone the repository:
   git clone https://github.com/your-username/stocksense.git
   cd stocksense
   
2. Configure & Start Backend:
   cd backend
   npm install
   
   Create a .env file inside the backend/ directory:
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   
   Start the backend development server:
   npm start
   
3. Configure & Start Frontend:
   In a new terminal window:
   cd frontend
   npm install
   npm run dev
   
4. Access the Application:
   Open your browser and navigate to http://localhost:5173 (or the URL provided by Vite).

Docker Deployment

To launch the complete environment (Frontend, Backend, and MongoDB) using Docker Compose:

docker-compose up --build


The application will be accessible at:

⚬ Frontend: http://localhost
⚬ Backend API: http://localhost:5001
⚬ MongoDB: localhost:27017
