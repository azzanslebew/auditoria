import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BottomNav from '../../components/BottowNav';

const FavoritPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('kursus');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Data dummy untuk favorit
  const [favorites, setFavorites] = useState({
    kursus: [
      { id: 1, name: 'Kursus Gitar Pemula', instructor: 'Budi Santoso', category: 'kursus' },
      { id: 2, name: 'Kursus Vokal Dasar', instructor: 'Siti Aminah', category: 'kursus' }
    ],
    jasa: [
      { id: 1, name: 'Komposisi Lagu Pop', provider: 'Musik Kreatif', price: 'Rp 2.000.000', category: 'jasa' },
      { id: 2, name: 'Aransemen Orkestra', provider: 'Harmoni Studio', price: 'Rp 5.000.000', category: 'jasa' }
    ],
    alat: [
      { id: 1, name: 'Gitar Akustik Yamaha', type: 'Gitar', price: 'Rp 1.500.000', category: 'alat' },
      { id: 2, name: 'Piano Digital Roland', type: 'Piano', price: 'Rp 8.000.000', category: 'alat' }
    ]
  });

  const handleRemoveFavorite = (category, id) => {
    setIsLoading(true);
    setTimeout(() => {
      setFavorites({
        ...favorites,
        [category]: favorites[category].filter(item => item.id !== id)
      });
      setNotificationMessage('Item dihapus dari favorit');
      setShowNotification(true);
      setIsLoading(false);
      setTimeout(() => setShowNotification(false), 3000);
    }, 1000);
  };

  const handleClearFavorites = (category) => {
    setIsLoading(true);
    setTimeout(() => {
      setFavorites({ ...favorites, [category]: [] });
      setNotificationMessage(`Semua ${category} favorit dihapus`);
      setShowNotification(true);
      setShowConfirm(false);
      setIsLoading(false);
      setTimeout(() => setShowNotification(false), 3000);
    }, 1000);
  };

  const renderFavorites = (category) => {
    const items = favorites[category];
    if (!items || items.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Icon icon="mdi:heart-off" className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>Belum ada {category} favorit.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-gray-800">{item.name}</h4>
              <button
                onClick={() => handleRemoveFavorite(category, item.id)}
                className="text-red-500 hover:text-red-600"
                aria-label={`Hapus ${item.name} dari favorit`}
                title="Hapus dari favorit"
                disabled={isLoading}
              >
                <Icon icon="mdi:heart-off" className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {category === 'kursus' ? `Pengajar: ${item.instructor}` :
                category === 'jasa' ? `Penyedia: ${item.provider}` :
                  `Tipe: ${item.type}`}
            </p>
            {category !== 'kursus' && (
              <p className="text-sm text-gray-600">Harga: {item.price}</p>
            )}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => navigate(`/${category}/${item.id}`)}
                className="text-sm text-blue-600 hover:underline"
                aria-label={`Lihat detail ${item.name}`}
                title="Lihat detail"
              >
                Lihat Detail
              </button>
              <button
                onClick={() => navigate(`/${category}/${item.id}/${category === 'alat' ? 'beli' : 'pesan'}`)}
                className="text-sm text-purple-600 hover:underline"
                aria-label={category === 'alat' ? `Beli ${item.name}` : `Pesan ${item.name}`}
                title={category === 'alat' ? 'Beli sekarang' : 'Pesan sekarang'}
              >
                {category === 'alat' ? 'Beli Sekarang' : 'Pesan Sekarang'}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-exo pt-16 pb-20 md:pb-8">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all z-50">
          {notificationMessage}
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-gray-800 mb-4">Hapus semua {activeTab} favorit?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
                aria-label="Batal"
              >
                Batal
              </button>
              <button
                onClick={() => handleClearFavorites(activeTab)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                aria-label="Hapus semua"
                disabled={isLoading}
              >
                {isLoading ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 sm:pb-4 pb-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Favorit Saya</h1>
              <p className="text-blue-100 text-sm sm:text-base mt-1">Kelola kursus, jasa, dan alat musik favorit Anda</p>
            </div>
            <div className="gap-3 sm:flex hidden">
              <button
                onClick={() => navigate('/')}
                className="flex items-center bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-all"
                aria-label="Kembali ke beranda"
                title="Kembali ke Beranda"
              >
                <Icon icon="mdi:home" className="w-5 h-5 mr-2" />
                Beranda
              </button>
              <button
                onClick={() => navigate('/peserta/akun')}
                className="flex items-center bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-all"
                aria-label="Kembali ke akun"
                title="Kembali ke Akun"
              >
                <Icon icon="mdi:account" className="w-5 h-5 mr-2" />
                Akun
              </button>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="p-6 sm:p-8">
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`flex-1 py-3 px-4 text-sm sm:text-base font-semibold text-center transition-all ${activeTab === 'kursus' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('kursus')}
                aria-label="Tab Kursus"
              >
                Kursus
              </button>
              <button
                className={`flex-1 py-3 px-4 text-sm sm:text-base font-semibold text-center transition-all ${activeTab === 'jasa' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('jasa')}
                aria-label="Tab Jasa"
              >
                Jasa
              </button>
              <button
                className={`flex-1 py-3 px-4 text-sm sm:text-base font-semibold text-center transition-all ${activeTab === 'alat' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('alat')}
                aria-label="Tab Alat Musik"
              >
                Alat Musik
              </button>
            </div>

            {/* Favorites Content */}
            <div className="mb-6">
              {renderFavorites(activeTab)}
            </div>

            {/* Clear Favorites Button */}
            {favorites[activeTab].length > 0 && (
              <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all font-semibold"
                aria-label={`Hapus semua ${activeTab} favorit`}
                title="Hapus semua favorit"
                disabled={isLoading}
              >
                <Icon icon="mdi:delete" className="w-5 h-5 mr-2" />
                Hapus Semua {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </button>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default FavoritPage;