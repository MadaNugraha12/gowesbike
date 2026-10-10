import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productsData } from './Dashboard';
import { ShoppingBag, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.id === id) || productsData[0];

  // Tombol Beli Sekarang: Masukkan ke Context/LocalStorage dulu, lalu ke Checkout
  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  // Tombol + Keranjang: Masukkan ke Context/LocalStorage, lalu ke Halaman Keranjang
  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition font-medium cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
      </button>

      <div className="grid grid-cols-2 gap-10 items-start">
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="space-y-5">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-3 leading-tight">{product.name}</h1>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-500 block">Harga Resmi</span>
              <span className="text-2xl font-black text-blue-600">{product.priceFormatted}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-bold py-3 px-4 rounded-xl transition cursor-pointer"
              >
                + Keranjang
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 px-6 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" /> Beli Sekarang
              </button>
            </div>
          </div>

          <div className="flex gap-4 text-xs text-gray-500 pt-2">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Garansi Resmi Frame 5 Tahun</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Free Tune-Up 1 Tahun</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center justify-between">
          <span>Spesifikasi Teknis (Technical Specifications)</span>
          <span className="text-xs font-normal text-gray-400">Pro-Spec Componentry</span>
        </h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Groupset</span>
            <span className="font-semibold text-gray-900 text-right">{product.specs.groupset}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Sistem Rem (Brakes)</span>
            <span className="font-semibold text-gray-900 text-right">{product.specs.brakes}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Wheelset</span>
            <span className="font-semibold text-gray-900 text-right">{product.specs.wheels}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Ban (Tires)</span>
            <span className="font-semibold text-gray-900 text-right">{product.specs.tires}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Crankset</span>
            <span className="font-semibold text-gray-900 text-right">{product.specs.crankset}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Chainring</span>
            <span className="font-semibold text-gray-900 text-right">{product.specs.chainring}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Bottom Bracket (BB)</span>
            <span className="font-semibold text-gray-900 text-right">{product.specs.bottomBracket}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Pedal</span>
            <span className="font-semibold text-gray-900 text-right">{product.specs.pedals}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Sadel</span>
            <span className="font-semibold text-gray-900 text-right">{product.specs.saddle}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500 font-medium">Seatpost</span>
            <span className="font-semibold text-gray-900 text-right">{product.specs.seatpost}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;