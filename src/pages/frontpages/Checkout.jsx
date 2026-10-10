import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = () => {
  const { cart, totalPrice: globalTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSuccess, setIsSuccess] = useState(false);

  const directItem = location.state?.directItem;
  const checkoutItems = directItem ? [directItem] : cart;
  const finalTotalPrice = directItem ? directItem.priceNumeric : globalTotalPrice;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    if (!directItem) {
      clearCart();
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 bg-green-50 rounded-xl border border-green-200 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Pesanan Berhasil! 🎉</h2>
        <p className="text-sm text-gray-600 mb-6">
          Terima kasih telah berbelanja di GowesBike. Pesanan Anda sedang diproses.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white text-sm font-medium py-2 px-5 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Formulir Pembayaran</h1>

      <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2 text-sm border-b pb-2">Ringkasan Pesanan</h3>
        {checkoutItems.length === 0 ? (
          <p className="text-xs text-gray-500">Tidak ada barang yang dibeli.</p>
        ) : (
          <div className="space-y-1 mb-3">
            {checkoutItems.map((item) => (
              <div key={item.id} className="flex justify-between text-xs text-gray-600">
                <span>{item.name} x{item.quantity}</span>
                <span>Rp {(item.priceNumeric * item.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-sm text-gray-900 pt-2 border-t mt-2">
              <span>Total:</span>
              <span className="text-blue-600">Rp {finalTotalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>
        )}
      </div>

      <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <label className="w-28 text-sm text-gray-700 font-medium">Nama Lengkap</label>
          <input
            type="text"
            required
            className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-28 text-sm text-gray-700 font-medium">Alamat Kirim</label>
          <input
            type="text"
            required
            className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-28 text-sm text-gray-700 font-medium">Pembayaran</label>
          <select 
            className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
          >
            <option>Transfer Bank (BCA / Mandiri)</option>
            <option>E-Wallet (Gopay / OVO / Dana)</option>
            <option>COD (Bayar di Tempat)</option>
          </select>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={checkoutItems.length === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium py-2.5 px-6 rounded-md transition cursor-pointer"
          >
            Konfirmasi Pesanan
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;