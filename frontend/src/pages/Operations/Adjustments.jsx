import { useState } from 'react';
import axios from 'axios';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Adjustments() {
  const [formData, setFormData] = useState({ productId: '', location: '', differenceQuantity: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/operations/adjustment', {
        ...formData, differenceQuantity: Number(formData.differenceQuantity)
      });
      setStatus({ type: 'success', message: 'Stock adjusted successfully.' });
      setFormData({ productId: '', location: '', differenceQuantity: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to adjust stock.' });
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Stock Adjustment</h2>
      
      {status.message && (
        <div className={`p-4 mb-6 rounded-lg flex items-center gap-3 border ${status.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
          <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" value={formData.productId} onChange={(e) => setFormData({...formData, productId: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse Location</label>
          <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difference Quantity (Use negative for lost/damaged)</label>
          <input type="number" required placeholder="-5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" value={formData.differenceQuantity} onChange={(e) => setFormData({...formData, differenceQuantity: e.target.value})} />
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg shadow-sm">
          Submit Adjustment
        </button>
      </form>
    </div>
  );
}