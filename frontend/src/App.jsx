import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Receipts from './pages/Operations/Receipts';
import Deliveries from './pages/Operations/Deliveries';
import Transfers from './pages/Operations/Transfers';
import Adjustments from './pages/Operations/Adjustments';

// A simple UI placeholder for pages we don't have backend APIs for yet
const HistoryPlaceholder = () => (
  <div className="p-8 text-center text-gray-500 mt-20">
    <h2 className="text-2xl font-semibold mb-2">Move History</h2>
    <p>This page will display the full ledger of transactions once the GET API is built.</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="operations/receipts" element={<Receipts />} />
          <Route path="operations/deliveries" element={<Deliveries />} />
          <Route path="operations/transfers" element={<Transfers />} />
          <Route path="operations/adjustments" element={<Adjustments />} />
          <Route path="operations/history" element={<HistoryPlaceholder />} />
          <Route path="settings" element={<HistoryPlaceholder />} />
        </Route>
      </Routes>
    </Router>
  );
}