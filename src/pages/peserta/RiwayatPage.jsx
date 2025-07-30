import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BottomNav from '../../components/BottowNav';

const RiwayatPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('kursus');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Data dummy untuk riwayat
  const [history, setHistory] = useState({
    kursus: [
      { id: 1, name: 'Kursus Gitar Pemula', instructor: 'Budi Santoso', date: '2025-06-15', status: 'Selesai' },
      { id: 2, name: 'Kursus Vokal Dasar', instructor: 'Siti Aminah', date: '2025-05-10', status: 'Selesai' }
    ],
    jasa: [
      { id: 1, name: 'Komposisi Lagu Pop', provider: 'Musik Kreatif', date: '2025-04-20', status: 'Selesai' },
      { id: 2, name: 'Aransemen Orkestra', provider: 'Harmoni Studio', date: '2025-03-12', status: 'Dibatalkan' }
    ],
    sewa: [
      { id: 1, name: 'Gitar Akustik Yamaha', type: 'Gitar', date: '2025-07-01', status: 'Selesai' },
      { id: 2, name: 'Piano Digital Roland', type: 'Piano', date: '2025-06-25', status: 'Sedang Berlangsung' }
    ],
    transaksi: [
      { id: 1, name: 'Pembelian Gitar Akustik', invoiceNumber: 'INV-001', amount: 'Rp 1.500.000', date: '2025-07-10', status: 'Selesai', paymentMethod: 'Transfer Bank' },
      { id: 2, name: 'Pembayaran Kursus Vokal', invoiceNumber: 'INV-002', amount: 'Rp 500.000', date: '2025-05-05', status: 'Selesai', paymentMethod: 'Kartu Kredit' }
    ]
  });

  const handleRemoveHistory = (category, id) => {
    setIsLoading(true);
    setTimeout(() => {
      setHistory({
        ...history,
        [category]: history[category].filter(item => item.id !== id)
      });
      setNotificationMessage('Item dihapus dari riwayat');
      setShowNotification(true);
      setIsLoading(false);
      setTimeout(() => setShowNotification(false), 3000);
    }, 1000);
  };

  const handleClearHistory = (category) => {
    setIsLoading(true);
    setTimeout(() => {
      setHistory({ ...history, [category]: [] });
      setNotificationMessage(`Semua riwayat ${category} dihapus`);
      setShowNotification(true);
      setShowConfirm(false);
      setIsLoading(false);
      setTimeout(() => setShowNotification(false), 3000);
    }, 1000);
  };

  const renderHistory = (category) => {
    const items = history[category];
    if (!items || items.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Icon icon="mdi:history" className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>Belum ada riwayat {category}.</p>
        </div>
      );
    }

    // Sort items: "Selesai" items at the bottom in mobile, to the right in desktop
    const sortedItems = [...items].sort((a, b) => {
      if (a.status === 'Selesai' && b.status !== 'Selesai') return 1;
      if (a.status !== 'Selesai' && b.status === 'Selesai') return -1;
      return a.id - b.id;
    });

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedItems.map(item => (
          <div
            key={item.id}
            className={`relative p-4 rounded-xl shadow-md hover:shadow-lg transition-all ${item.status === 'Selesai' ? 'bg-gray-50 opacity-50' : 'bg-white'
              }`}
          >
            <div className="flex items-center justify-between">
              <h4 className={`text-base font-semibold ${item.status === 'Selesai' ? 'text-gray-500' : 'text-gray-800'}`}>
                {item.name}
              </h4>
              <button
                onClick={() => handleRemoveHistory(category, item.id)}
                className="text-red-500 hover:text-red-600"
                aria-label={`Hapus ${item.name} dari riwayat`}
                title="Hapus dari riwayat"
                disabled={isLoading}
              >
                <Icon icon="mdi:delete" className="w-5 h-5" />
              </button>
            </div>
            {category === 'transaksi' ? (
              <>
                <p className={`text-sm mt-1 ${item.status === 'Selesai' ? 'text-gray-500' : 'text-gray-600'}`}>
                  No. Invoice: {item.invoiceNumber}
                </p>
                <p className={`text-sm ${item.status === 'Selesai' ? 'text-gray-500' : 'text-gray-600'}`}>
                  Jumlah: {item.amount}
                </p>
                <p className={`text-sm ${item.status === 'Selesai' ? 'text-gray-500' : 'text-gray-600'}`}>
                  Metode: {item.paymentMethod}
                </p>
              </>
            ) : (
              <p className={`text-sm mt-1 ${item.status === 'Selesai' ? 'text-gray-500' : 'text-gray-600'}`}>
                {category === 'kursus' ? `Pengajar: ${item.instructor}` :
                  category === 'jasa' ? `Penyedia: ${item.provider}` :
                    `Tipe: ${item.type}`}
              </p>
            )}
            <p className={`text-sm ${item.status === 'Selesai' ? 'text-gray-500' : 'text-gray-600'}`}>
              Tanggal: {item.date}
            </p>
            <p className={`text-sm ${item.status === 'Selesai' ? 'text-gray-500' : 'text-gray-600'}`}>
              Status: {item.status}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => navigate(`/${category}/${item.id}${category === 'transaksi' ? '/invoice' : ''}`)}
                className="text-sm text-blue-600 hover:underline"
                aria-label={category === 'transaksi' ? `Lihat invoice ${item.name}` : `Lihat detail ${item.name}`}
                title={category === 'transaksi' ? 'Lihat invoice' : 'Lihat detail'}
              >
                {category === 'transaksi' ? 'Lihat Invoice' : 'Lihat Detail'}
              </button>
            </div>
            {/* Status Badge */}
            <span
              className={`absolute bottom-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Selesai' ? 'bg-gray-200 text-gray-700' :
                  item.status === 'Sedang Berlangsung' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                }`}
            >
              {item.status}
            </span>
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
            <p className="text-gray-800 mb-4">Hapus semua riwayat {activeTab}?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
                aria-label="Batal"
              >
                Batal
              </button>
              <button
                onClick={() => handleClearHistory(activeTab)}
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
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Riwayat Saya</h1>
              <p className="text-blue-100 text-sm sm:text-base mt-1">Lihat riwayat kursus, jasa, sewa, dan transaksi Anda</p>
            </div>
            <div className="hidden sm:flex gap-3">
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
                className={`flex-1 py-3 px-4 text-sm sm:text-base font-semibold text-center transition-all ${activeTab === 'sewa' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('sewa')}
                aria-label="Tab Sewa Alat Musik"
              >
                Sewa
              </button>
              <button
                className={`flex-1 py-3 px-4 text-sm sm:text-base font-semibold text-center transition-all ${activeTab === 'transaksi' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('transaksi')}
                aria-label="Tab Transaksi"
              >
                Transaksi
              </button>
            </div>

            {/* History Content */}
            <div className="mb-6">
              {renderHistory(activeTab)}
            </div>

            {/* Clear History Button */}
            {history[activeTab].length > 0 && (
              <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all font-semibold"
                aria-label={`Hapus semua riwayat ${activeTab}`}
                title="Hapus semua riwayat"
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

export default RiwayatPage;