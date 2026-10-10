import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const productsData = [
  { 
    id: '1', 
    name: 'Cervélo S5 Disc Shimano Dura-Ace Di2', 
    category: 'Road / Aero Bike',
    priceFormatted: 'Rp 185.000.000', 
    priceNumeric: 185000000, 
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=1000&auto=format&fit=crop&q=80',
    description: 'Sepeda aero road paling aerodinamis dari Cervélo, didesain untuk kecepatan maksimum di lintasan datar maupun perbukitan.',
    specs: {
      groupset: 'Shimano Dura-Ace Di2 R9270 12-Speed Electronic',
      brakes: 'Shimano Dura-Ace R9270 Hydraulic Disc',
      wheels: 'Reserve 52/63mm Carbon Tubeless Ready',
      tires: 'Vittoria Corsa TLR G2.0 700x28c',
      crankset: 'Shimano Dura-Ace FC-R9200 Power Meter',
      chainring: '52/36T',
      bottomBracket: 'CeramicSpeed BBright PressFit',
      pedals: 'N/A (Optional Shimano Dura-Ace PD-R9100)',
      saddle: 'Selle Italia Novus Boost Superflow Carbon',
      seatpost: 'Cervélo SP20 Carbon Aero Seatpost'
    }
  },
  { 
    id: '2', 
    name: 'Specialized S-Works Tarmac SL8', 
    category: 'All-Rounder Road Bike',
    priceFormatted: 'Rp 210.000.000', 
    priceNumeric: 210000000, 
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1000&auto=format&fit=crop&q=80',
    description: 'Kombinasi sempurna antara aerodinamika, bobot super ringan (6.8kg), dan kualitas berkendara tingkat kejuaraan dunia.',
    specs: {
      groupset: 'SRAM RED AXS 12-Speed Wireless Electronic',
      brakes: 'SRAM RED eTap AXS Hydraulic Disc',
      wheels: 'Roval Rapide CLX II Carbon Tubeless',
      tires: 'Specialized S-Works Turbo RapidAir 700x26c',
      crankset: 'SRAM RED AXS Power Meter Crankset',
      chainring: '48/35T Integrated Power Meter',
      bottomBracket: 'SRAM DUB BSA Threaded 68mm',
      pedals: 'N/A (Sold Separately)',
      saddle: 'Body Geometry S-Works Power Carbon Rails',
      seatpost: 'S-Works Tarmac SL8 Carbon Seatpost, FACT Carbon'
    }
  },
  { 
    id: '3', 
    name: 'Trek Madone SLR 9 AXS Gen 7', 
    category: 'Aero Race Bike',
    priceFormatted: 'Rp 198.000.000', 
    priceNumeric: 198000000, 
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=1000&auto=format&fit=crop&q=80',
    description: 'Dilengkapi teknologi IsoFlow revolusioner yang meningkatkan aerodinamika, mengurangi bobot, dan meredam getaran jalan.',
    specs: {
      groupset: 'SRAM RED eTap AXS 12-Speed Electronic',
      brakes: 'SRAM RED eTap AXS Hydraulic Flat-Mount Disc',
      wheels: 'Bontrager Aeolus RSL 51 OCLV Carbon',
      tires: 'Pirelli P Zero Race TLR 700x28c',
      crankset: 'SRAM RED AXS Power Meter',
      chainring: '50/37T',
      bottomBracket: 'SRAM DUB T47 Threaded',
      pedals: 'N/A',
      saddle: 'Bontrager Aeolus RSL Carbon Rails',
      seatpost: 'Madone KVF Carbon Internal Seat Mast Cap'
    }
  },
  { 
    id: '4', 
    name: 'Bianchi Oltre RC SRAM Red AXS', 
    category: 'Hyperbike Aero',
    priceFormatted: 'Rp 225.000.000', 
    priceNumeric: 225000000, 
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=1000&auto=format&fit=crop&q=80',
    description: 'Hyperbike revolusioner dengan Air Deflector terintegrasi pada headtube dan kokpit aero terpadu khas teknologi Celeste Bianchi.',
    specs: {
      groupset: 'SRAM RED eTap AXS 12-Speed Electronic',
      brakes: 'SRAM RED eTap AXS Hydraulic Disc',
      wheels: 'Reparto Corse SPB 50mm Carbon Tubeless Ready',
      tires: 'Pirelli P ZERO Race SL TLR 700x28c',
      crankset: 'SRAM RED AXS DUB Power Meter',
      chainring: '48/35T',
      bottomBracket: 'SRAM DUB PressFit 86.5x41mm',
      pedals: 'N/A',
      saddle: 'Bianchi RC139 Carbon Air Superflow',
      seatpost: 'Oltre Full Carbon Custom Aero Seatpost'
    }
  },
];

const Dashboard = () => {
  const { searchQuery } = useCart();

  // Filter sepeda berdasarkan nama, kategori, atau deskripsi
  const filteredProducts = productsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto py-4">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Katalog Superbike & Pro Bicycles</h1>
        <p className="text-gray-500 text-base mt-3">Koleksi sepeda balap profesional dengan spesifikasi kelas dunia</p>
      </div>

      {/* Jika produk hasil pencarian tidak ditemukan */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <p className="text-gray-500 text-lg">Tidak ada sepeda yang cocok dengan kata kunci "<span className="font-bold text-gray-800">{searchQuery}</span>"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-blue-500 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-64 bg-gray-100 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <span className="absolute top-4 left-4 text-xs uppercase tracking-wider font-bold text-blue-700 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-50 mt-auto">
                <div>
                  <span className="text-xs text-gray-400 block">Harga Resmi</span>
                  <p className="text-xl text-blue-600 font-extrabold">{item.priceFormatted}</p>
                </div>
                <span className="text-sm font-bold text-blue-600 group-hover:translate-x-1 transition flex items-center gap-1">
                  Lihat Detail &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;