import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems, searchQuery, setSearchQuery } = useCart();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Otomatis arahkan ke halaman katalog (dashboard) jika user mengetik saat sedang di halaman lain
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm">
            🚴
          </div>
          <span className="font-extrabold text-2xl text-gray-900 tracking-tight">GowesBike</span>
        </div>

        <nav className="flex gap-10">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => 
              isActive ? "text-blue-600 font-extrabold text-base border-b-2 border-blue-600 pb-1" : "text-gray-600 hover:text-blue-600 text-base font-medium transition"
            }
          >
            Katalog
          </NavLink>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => 
              isActive ? "text-blue-600 font-extrabold text-base border-b-2 border-blue-600 pb-1 flex items-center gap-2" : "text-gray-600 hover:text-blue-600 text-base font-medium flex items-center gap-2 transition"
            }
          >
            <span>Keranjang</span>
            {totalItems > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </NavLink>
          <NavLink 
            to="/checkout" 
            className={({ isActive }) => 
              isActive ? "text-blue-600 font-extrabold text-base border-b-2 border-blue-600 pb-1" : "text-gray-600 hover:text-blue-600 text-base font-medium transition"
            }
          >
            Pembayaran
          </NavLink>
        </nav>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Cari sepeda (e.g. Trek, Cervélo)..."
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-sm w-64 focus:outline-none focus:border-blue-500 bg-gray-50"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;