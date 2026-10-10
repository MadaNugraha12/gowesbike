import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, AlertCircle, X } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  const [errorMessage, setErrorMessage] = useState('');
  const [selectedProductToDelete, setSelectedProductToDelete] = useState(null);

  const handleQuantityChange = (id, value) => {
    const val = parseInt(value, 10);

    if (val <= 0 || isNaN(val)) {
      setErrorMessage('Jumlah pemesanan minimal adalah 1 barang!');
      updateQuantity(id, 1);
    } else {
      setErrorMessage('');
      updateQuantity(id, val);
    }
  };

  const handleOpenDeleteModal = (item) => {
    setSelectedProductToDelete(item);
  };

  const handleConfirmDelete = () => {
    if (selectedProductToDelete) {
      removeFromCart(selectedProductToDelete.id);
      setSelectedProductToDelete(null);
      setErrorMessage(''); // Hapus pesan error saat produk dihapus
    }
  };

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Keranjang Belanja</h1>

      {/* Pesan Error Kuantitas hanya tampil jika keranjang TIDAK kosong */}
      {errorMessage && cart.length > 0 && (
        <div className="max-w-md mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center justify-between text-sm shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button 
            onClick={() => setErrorMessage('')}
            className="text-red-400 hover:text-red-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">Keranjang belanja Anda masih kosong.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Lihat Katalog Sepeda
          </button>
        </div>
      ) : (
        <>
          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="bg-gray-100 text-xs text-gray-700">
                <th className="p-3 font-semibold rounded-l-md">Produk</th>
                <th className="p-3 font-semibold">Harga</th>
                <th className="p-3 font-semibold">Jumlah</th>
                <th className="p-3 font-semibold">Subtotal</th>
                <th className="p-3 font-semibold rounded-r-md text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {cart.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900 flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-4 text-gray-600">{item.priceFormatted}</td>
                  <td className="p-4">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      min="1"
                      className="w-16 p-1.5 border border-gray-300 rounded text-center text-sm focus:outline-none focus:border-blue-500"
                    />
                  </td>
                  <td className="p-4 font-semibold text-gray-900">
                    Rp {(item.priceNumeric * item.quantity).toLocaleString('id-ID')}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleOpenDeleteModal(item)}
                      className="text-red-500 hover:text-red-700 transition cursor-pointer p-2 hover:bg-red-50 rounded-lg"
                      title="Hapus produk"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div>
              <span className="text-sm text-gray-600">Total Pembayaran: </span>
              <span className="text-xl font-bold text-blue-600 ml-2">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-6 rounded-md transition cursor-pointer"
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        </>
      )}

      {/* Modal Pop-up Konfirmasi Hapus Item */}
      {selectedProductToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 text-red-600">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Hapus Produk?</h3>
              <p className="text-xs text-gray-500 mt-2">
                Apakah Anda yakin ingin menghapus <span className="font-semibold text-gray-800">"{selectedProductToDelete.name}"</span> dari keranjang belanja?
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedProductToDelete(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;