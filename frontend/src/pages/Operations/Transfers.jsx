import { useState } from 'react';
import axios from 'axios';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Transfers() {
  const [formData, setFormData] = useState({ productId: '', quantity: '', fromLocation: '', toLocation: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = { ...formData, quantity: Number(formData.quantity) };
      await axios.post('http://localhost:5001/api/operations/transfer', payload);
      setStatus({ type: 'success', message: 'Transfer logged successfully.' });
      setFormData({ productId: '', quantity: '', fromLocation: '', toLocation: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to process transfer.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Internal Transfer</h2>
      
      {status.message && (
        <div className={`p-4 mb-6 rounded-lg flex items-center gap-3 border ${status.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
          <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" value={formData.productId} onChange={(e) => setFormData({...formData, productId: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Location</label>
            <input type="text" required placeholder="e.g. Main Warehouse" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" value={formData.fromLocation} onChange={(e) => setFormData({...formData, fromLocation: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Location</label>
            <input type="text" required placeholder="e.g. Production Floor" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" value={formData.toLocation} onChange={(e) => setFormData({...formData, toLocation: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity to Move</label>
          <input type="number" required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-sm">
          {isSubmitting ? 'Moving...' : 'Log Transfer'}
        </button>
      </form>
    </div>
  );
}