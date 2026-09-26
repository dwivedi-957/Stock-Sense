require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Product, Transaction } = require('./models/Models');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://dwivedi957:IndiaRuns2026@cluster0.lyq9a2t.mongodb.net');

// Authentication API: Signup/Login & OTP redirect simulation[span_10](start_span)[span_10](end_span)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret');
  res.json({ token, redirect: '/dashboard' }); // Redirected to Inventory Dashboard[span_11](start_span)[span_11](end_span)
});

// Core Feature: Receipts (Incoming Goods)[span_12](start_span)[span_12](end_span)
app.post('/api/operations/receipt', async (req, res) => {
  const { productId, supplier, quantity } = req.body;
  const receipt = new Transaction({
    type: 'Receipt',
    status: 'Done',
    product: productId,
    quantity,
    fromLocation: supplier,
    toLocation: 'Main Warehouse'
  });
  await receipt.save();
  // Validating receipt increases stock automatically via ledger summation[span_13](start_span)[span_13](end_span)
  res.json({ message: 'Receipt validated', receipt });
});

// Core Feature: Delivery Orders (Outgoing Goods)[span_14](start_span)[span_14](end_span)
app.post('/api/operations/delivery', async (req, res) => {
  const { productId, quantity, customer } = req.body;
  const delivery = new Transaction({
    type: 'Delivery',
    status: 'Done',
    product: productId,
    quantity: -quantity, // Delivery reduces stock[span_15](start_span)[span_15](end_span)
    fromLocation: 'Main Warehouse',
    toLocation: customer
  });
  await delivery.save();
  res.json({ message: 'Delivery validated', delivery });
});

// Core Feature: Create a Product[span_1](start_span)[span_1](end_span)
app.post('/api/products', async (req, res) => {
  const { name, sku, category, unitOfMeasure } = req.body;
  const product = new Product({ name, sku, category, unitOfMeasure });
  await product.save();
  res.json({ message: 'Product created', product });
});

// Core Feature: Internal Transfers[span_2](start_span)[span_2](end_span)
app.post('/api/operations/transfer', async (req, res) => {
  const { productId, quantity, fromLocation, toLocation } = req.body;
  const transfer = new Transaction({
    type: 'Internal Transfer',
    status: 'Done',
    product: productId,
    quantity: quantity, 
    fromLocation,
    toLocation
  });
  await transfer.save();
  res.json({ message: 'Internal transfer logged', transfer });
});

// Core Feature: Stock Adjustments[span_3](start_span)[span_3](end_span)
app.post('/api/operations/adjustment', async (req, res) => {
  const { productId, differenceQuantity, location } = req.body;
  const adjustment = new Transaction({
    type: 'Adjustment',
    status: 'Done',
    product: productId,
    quantity: differenceQuantity, 
    fromLocation: location,
    toLocation: location
  });
  await adjustment.save();
  res.json({ message: 'Stock adjustment logged', adjustment });
});


// Dashboard KPIs API[span_16](start_span)[span_16](end_span)
app.get('/api/dashboard/kpis', async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const pendingReceipts = await Transaction.countDocuments({ type: 'Receipt', status: { $ne: 'Done' } });
  const pendingDeliveries = await Transaction.countDocuments({ type: 'Delivery', status: { $ne: 'Done' } });
  
  res.json({
    totalProducts,
    pendingReceipts,
    pendingDeliveries,
    lowStockItems: 5, // Mocked dynamically calculated value
    internalTransfersScheduled: 2 // Mocked value for scheduled transfers[span_17](start_span)[span_17](end_span)
  });
});

app.listen(5001, () => console.log('Backend running on port 5001'));
