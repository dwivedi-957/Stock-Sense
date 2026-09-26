import { useState } from 'react';
import axios from 'axios';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Receipts() {
  const [formData, setFormData] = useState({
    productId: '',
    supplier: '',
    quantity: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        productId: formData.productId,
        supplier: formData.supplier,
        quantity: Number(formData.quantity)
      };

      const response = await axios.post('http://localhost:5001/api/operations/receipt', payload);
      setStatus({ type: 'success', message: response.data.message || 'Receipt successfully processed.' });
      setFormData({ productId: '', supplier: '', quantity: '' }); // Reset form
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.error || 'Failed to process receipt. Check database connection.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Process Receipt</h2>
        <p className="text-gray-500 mt-2">Log incoming goods from vendors into the Main Warehouse.</p>
      </div>

      {status.message && (
        <div className={`p-4 mb-6 rounded-lg flex items-center gap-3 ${
          status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product ID (Object ID)</label>
            <input
              type="text"
              required
              placeholder="e.g., 651a2b3c4d5e6f7a8b9c0d1e"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.productId}
              onChange={(e) => setFormData({...formData, productId: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
            <input
              type="text"
              required
              placeholder="e.g., Vendor A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.supplier}
              onChange={(e) => setFormData({...formData, supplier: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Received</label>
            <input
              type="number"
              required
              min="1"
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Validating Receipt...' : 'Validate & Save Receipt'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}