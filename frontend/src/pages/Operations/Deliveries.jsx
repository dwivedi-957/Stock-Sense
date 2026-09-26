import { useState } from 'react';
import axios from 'axios';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Deliveries() {
  const [formData, setFormData] = useState({ productId: '', customer: '', quantity: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        productId: formData.productId,
        customer: formData.customer,
        quantity: Number(formData.quantity)
      };
      const response = await axios.post('http://localhost:5001/api/operations/delivery', payload);
      setStatus({ type: 'success', message: response.data.message || 'Delivery successfully processed.' });
      setFormData({ productId: '', customer: '', quantity: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.error || 'Failed to process delivery.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Process Delivery</h2>
        <p className="text-gray-500 mt-2">Log outgoing goods from the warehouse to customers.</p>
      </div>

      {status.message && (
        <div className={`p-4 mb-6 rounded-lg flex items-center gap-3 ${
          status.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
        } border`}>
          {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
          <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={formData.productId} onChange={(e) => setFormData({...formData, productId: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
          <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={formData.customer} onChange={(e) => setFormData({...formData, customer: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Delivered</label>
          <input type="number" required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-sm">
          {isSubmitting ? 'Processing...' : 'Validate & Save Delivery'}
        </button>
      </form>
    </div>
  );
}