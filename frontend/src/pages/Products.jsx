import { useState } from 'react';
import axios from 'axios';
import { PackagePlus, CheckCircle2 } from 'lucide-react';

export default function Products() {
  const [formData, setFormData] = useState({ name: '', sku: '', category: '', unitOfMeasure: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/products', formData);
      setSuccess(true);
      setFormData({ name: '', sku: '', category: '', unitOfMeasure: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <PackagePlus size={32} className="text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-800">Add New Product</h2>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle2 size={20} /> Product created successfully in the database.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SKU (Barcode/ID)</label>
          <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input type="text" required placeholder="e.g. Electronics, Raw Materials" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit of Measure</label>
          <select required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.unitOfMeasure} onChange={(e) => setFormData({...formData, unitOfMeasure: e.target.value})}>
            <option value="">Select a unit...</option>
            <option value="Units">Units (Pieces)</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="Liters">Liters (L)</option>
            <option value="Meters">Meters (m)</option>
          </select>
        </div>
        <div className="col-span-2 pt-4">
          <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm">
            Save Product to Database
          </button>
        </div>
      </form>
    </div>
  );
}