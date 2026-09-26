const mongoose = require('mongoose');

// User Schema (Authentication)[span_4](start_span)[span_4](end_span)
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['Manager', 'Staff'], default: 'Staff' }
});

// Product Schema[span_5](start_span)[span_5](end_span)
const ProductSchema = new mongoose.Schema({
  name: String,
  sku: { type: String, unique: true },
  category: String,
  unitOfMeasure: String,
  minStockAlert: { type: Number, default: 10 } // Alerts for low stock[span_6](start_span)[span_6](end_span)
});

// Stock Ledger / Transaction Schema (Core Operations)[span_7](start_span)[span_7](end_span)
const TransactionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['Receipt', 'Delivery', 'Internal Transfer', 'Adjustment'], 
    required: true 
  },
  status: {
    type: String,
    enum: ['Draft', 'Waiting', 'Ready', 'Done', 'Canceled'],
    default: 'Draft'
  },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  fromLocation: String, // e.g., 'Vendor' or 'Main Warehouse[span_8](start_span)'[span_8](end_span)
  toLocation: String,   // e.g., 'Production Floor' or 'Customer[span_9](start_span)'[span_9](end_span)
  date: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Product: mongoose.model('Product', ProductSchema),
  Transaction: mongoose.model('Transaction', TransactionSchema)
};
