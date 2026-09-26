import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowRightLeft, Settings, User, LogOut, FileText } from 'lucide-react';

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`;

  const subLinkClass = ({ isActive }) =>
    `block px-4 py-2 text-sm rounded-md transition-colors ${
      isActive ? 'text-blue-400 bg-gray-800' : 'text-gray-400 hover:text-white'
    }`;

  return (
    <aside className="w-64 h-full bg-gray-900 text-white flex flex-col shadow-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-wider text-blue-400">StockSense</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <NavLink to="/dashboard" className={linkClass}><LayoutDashboard size={20} /> Dashboard</NavLink>
        <NavLink to="/products" className={linkClass}><Package size={20} /> Products</NavLink>
        
        <div className="pt-4 pb-1">
          <div className="flex items-center gap-3 px-4 py-2 text-gray-400 uppercase text-xs font-bold tracking-wider">
            <ArrowRightLeft size={16} /> Operations
          </div>
          <div className="pl-6 space-y-1 mt-1 border-l border-gray-700 ml-6">
            <NavLink to="/operations/receipts" className={subLinkClass}>Receipts</NavLink>
            <NavLink to="/operations/deliveries" className={subLinkClass}>Deliveries</NavLink>
            <NavLink to="/operations/transfers" className={subLinkClass}>Internal Transfers</NavLink>
            <NavLink to="/operations/adjustments" className={subLinkClass}>Adjustments</NavLink>
            <NavLink to="/operations/history" className={subLinkClass}>Move History</NavLink>
          </div>
        </div>

        <NavLink to="/settings" className={linkClass}><Settings size={20} /> Settings</NavLink>
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-2">
        <button className="flex w-full items-center gap-3 px-4 py-2 text-gray-300 hover:text-white transition-colors">
          <User size={20} /> My Profile
        </button>
        <button className="flex w-full items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 transition-colors">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}