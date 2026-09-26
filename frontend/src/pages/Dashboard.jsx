import { useState, useEffect } from 'react';
import axios from 'axios';
import { PackageSearch, AlertTriangle, ArrowDownToLine, ArrowUpFromLine, RefreshCcw } from 'lucide-react';

export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/dashboard/kpis');
        setKpis(response.data);
      } catch (err) {
        setError('Failed to connect to the StockSense server.');
      } finally {
        setLoading(false);
      }
    };
    fetchKPIs();
  }, []);

  if (loading) return <div className="p-8 text-gray-500">Loading dashboard data...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Inventory Overview</h2>
        
        {/* Mock Dynamic Filters */}
        <div className="flex gap-3">
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Document Types</option>
            <option>Receipts</option>
            <option>Deliveries</option>
          </select>
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Main Warehouse</option>
            <option>Production Floor</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KpiCard title="Total Products" value={kpis?.totalProducts || 0} icon={<PackageSearch />} color="blue" />
        <KpiCard title="Low / Out of Stock" value={kpis?.lowStockItems || 0} icon={<AlertTriangle />} color="red" />
        <KpiCard title="Pending Receipts" value={kpis?.pendingReceipts || 0} icon={<ArrowDownToLine />} color="emerald" />
        <KpiCard title="Pending Deliveries" value={kpis?.pendingDeliveries || 0} icon={<ArrowUpFromLine />} color="orange" />
        <KpiCard title="Scheduled Transfers" value={kpis?.internalTransfersScheduled || 0} icon={<RefreshCcw />} color="purple" />
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, color }) {
  const colorMap = {
    blue: 'border-blue-500 text-blue-600 bg-blue-50',
    red: 'border-red-500 text-red-600 bg-red-50',
    emerald: 'border-emerald-500 text-emerald-600 bg-emerald-50',
    orange: 'border-orange-500 text-orange-600 bg-orange-50',
    purple: 'border-purple-500 text-purple-600 bg-purple-50',
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 p-6 flex flex-col justify-between ${colorMap[color].split(' ')[0]}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
        <div className={`p-2 rounded-lg ${colorMap[color].split(' ').slice(1).join(' ')}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}