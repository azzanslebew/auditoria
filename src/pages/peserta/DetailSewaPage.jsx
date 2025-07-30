import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottowNav';

const rentalProviders = {
    'Gitar': [
        {
            id: 1,
            name: 'Melody Haven',
            days: 'Senin - Minggu',
            hours: '09:00 - 21:00',
            price: '50.000',
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D',
            category: 'String',
        },
        {
            id: 2,
            name: 'Rhythm Studio',
            days: 'Senin - Sabtu',
            hours: '10:00 - 20:00',
            price: '45.000',
            image: 'https://plus.unsplash.com/premium_photo-1682125853703-896a05629709?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWN8ZW58MHx8MHx8fDA%3D',
            category: 'String',
        },
    ],
    'Piano': [
        {
            id: 3,
            name: 'Harmony Music',
            days: 'Senin - Jumat',
            hours: '08:00 - 20:00',
            price: '100.000',
            image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWN8ZW58MHx8MHx8fDA%3D',
            category: 'Keyboard',
        },
    ],
    'Biola': [
        {
            id: 4,
            name: 'String Serenade',
            days: 'Selasa - Minggu',
            hours: '09:00 - 18:00',
            price: '75.000',
            image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljfGVufDB8fDB8fHww',
            category: 'String',
        },
    ],
    'Drum': [
        {
            id: 5,
            name: 'Beat Box',
            days: 'Senin - Minggu',
            hours: '10:00 - 22:00',
            price: '80.000',
            image: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG11c2ljfGVufDB8fDB8fHww',
            category: 'Percussion',
        },
    ],
    'Saxophone': [
        {
            id: 6,
            name: 'Wind Notes',
            days: 'Rabu - Minggu',
            hours: '09:00 - 19:00',
            price: '90.000',
            image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG11c2ljfGVufDB8fDB8fHww',
            category: 'Wind',
        },
    ],
    'Ukulele': [
        {
            id: 7,
            name: 'Island Vibes',
            days: 'Senin - Sabtu',
            hours: '10:00 - 20:00',
            price: '40.000',
            image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fG11c2ljfGVufDB8fDB8fHww',
            category: 'String',
        },
    ],
    'Keyboard': [
        {
            id: 8,
            name: 'Key Tunes',
            days: 'Senin - Jumat',
            hours: '09:00 - 18:00',
            price: '70.000',
            image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fG11c2ljfGVufDB8fDB8fHww',
            category: 'Keyboard',
        },
    ],
    'Flute': [
        {
            id: 9,
            name: 'Melody Winds',
            days: 'Selasa - Minggu',
            hours: '08:00 - 18:00',
            price: '60.000',
            image: 'https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fG11c2ljfGVufDB8fDB8fHww',
            category: 'Wind',
        },
    ],
};

export default function DetailSewaPage() {
    const { instrument, providerId } = useParams();
    const navigate = useNavigate();
    const [rentalDate, setRentalDate] = useState('');
    const [duration, setDuration] = useState('1');
    const [quantity, setQuantity] = useState('1');
    const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState('');
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const popupRef = useRef(null);

    // Capitalize first letter of instrument to match rentalProviders keys
    const capitalizedInstrument = instrument.charAt(0).toUpperCase() + instrument.slice(1);

    const provider = rentalProviders[capitalizedInstrument]?.find(
        (p) => p.id === parseInt(providerId)
    );

    if (!provider) {
        return (
            <section className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-exo">
                <p className="text-center text-slate-700 text-sm sm:text-base">
                    Penyedia sewa tidak ditemukan.
                </p>
            </section>
        );
    }

    const handleConfirm = () => {
        if (!rentalDate || !duration || !quantity) {
            alert('Harap lengkapi formulir pemesanan.');
            return;
        }
        setShowDeliveryPopup(true);
    };

    const handleConfirmDelivery = () => {
        if (!selectedDelivery) {
            alert('Harap pilih opsi pengiriman terlebih dahulu.');
            return;
        }
        setShowDeliveryPopup(false);
        setShowPaymentPopup(true);
    };

    const handleConfirmPayment = (method) => {
        alert(`Pemesanan berhasil untuk ${provider.name} (${capitalizedInstrument}) pada ${rentalDate}, durasi ${duration} hari, jumlah ${quantity} unit, pengiriman ${selectedDelivery} dengan pembayaran ${method}`);
        setShowPaymentPopup(false);
        navigate('/kursus/offline/confirm', {
            state: { instrument: capitalizedInstrument, provider, rentalDate, duration, quantity, deliveryOption: selectedDelivery, paymentMethod: method },
        });
    };

    return (
        <section className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-exo">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center sm:hidden">
                    <button
                        onClick={() => navigate('/peserta/sewa-alat-musik')}
                        className="p-2 mr-3 text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                    >
                        <Icon icon="mdi:arrow-left" className="text-xl" />
                    </button>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Detail Jasa{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {capitalizedInstrument}
                        </span>
                    </h2>
                </div>

                <div className="hidden sm:flex items-center justify-between w-full">
                    <h2 className="text-3xl font-bold text-slate-800">
                        Detail Jasa{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {capitalizedInstrument}
                        </span>
                    </h2>
                    <button
                        onClick={() => navigate('/peserta/sewa-alat-musik')}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                    >
                        <Icon icon="mdi:arrow-left" className="text-lg" />
                        Kembali ke Sewa Alat Musik
                    </button>
                </div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 sm:p-6 bg-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-shadow duration-300 mb-16 sm:mb-0">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="relative w-full sm:w-1/2 h-48 sm:h-64 overflow-hidden rounded-lg">
                        <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-2 left-2">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                {provider.category}
                            </span>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">
                            {provider.name}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm mb-2">
                            <Icon icon="mdi:calendar" className="text-base sm:text-lg" />
                            <span>Hari Buka: {provider.days}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm mb-2">
                            <Icon icon="mdi:clock" className="text-base sm:text-lg" />
                            <span>Jam Buka: {provider.hours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm mb-4">
                            <Icon icon="mdi:currency-usd" className="text-base sm:text-lg" />
                            <span>Mulai dari Rp {provider.price} / hari</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-3">
                        Formulir Pemesanan
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                Tanggal Mulai Sewa
                            </label>
                            <input
                                type="date"
                                value={rentalDate}
                                onChange={(e) => setRentalDate(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                Durasi Sewa (Hari)
                            </label>
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                            >
                                <option value="1">1 Hari</option>
                                <option value="3">3 Hari</option>
                                <option value="7">7 Hari</option>
                                <option value="14">14 Hari</option>
                                <option value="30">30 Hari</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                Jumlah Unit
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-3">
                        Syarat dan Ketentuan
                    </h4>
                    <ul className="text-xs sm:text-sm text-slate-700 list-disc pl-5">
                        <li>Deposit diperlukan sebesar 50% dari total biaya sewa.</li>
                        <li>Alat musik harus dikembalikan dalam kondisi baik.</li>
                        <li>Biaya keterlambatan pengembalian: Rp 10.000/jam.</li>
                        <li>Pembatalan sewa dikenakan biaya 25% jika kurang dari 24 jam.</li>
                    </ul>
                </div>

                <button
                    onClick={handleConfirm}
                    className="mt-6 w-full py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                    disabled={!rentalDate || !duration || !quantity}
                >
                    Konfirmasi Sewa
                </button>
            </div>

            {/* Delivery Popup */}
            {showDeliveryPopup && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 animate-fadeIn">
                    <div
                        ref={popupRef}
                        className="relative bg-white text-slate-900 max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-300"
                    >
                        <button
                            onClick={() => setShowDeliveryPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
                        >
                            <Icon icon="mdi:close" className="text-lg" />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
                            Pilih Opsi Pengiriman
                        </h2>
                        <div className="space-y-4">
                            <div
                                onClick={() => setSelectedDelivery('Diantar')}
                                className={`cursor-pointer p-3 border rounded-lg transition-all flex items-center gap-2 ${selectedDelivery === 'Diantar'
                                    ? 'border-blue-600 bg-blue-100'
                                    : 'border-slate-300 hover:bg-blue-50'
                                    }`}
                            >
                                <Icon icon="mdi:motorbike" className="text-lg text-blue-600" />
                                <p className="text-sm font-semibold text-slate-800">Diantar</p>
                            </div>
                            <div
                                onClick={() => setSelectedDelivery('Ambil Sendiri')}
                                className={`cursor-pointer p-3 border rounded-lg transition-all flex items-center gap-2 ${selectedDelivery === 'Ambil Sendiri'
                                    ? 'border-blue-600 bg-blue-100'
                                    : 'border-slate-300 hover:bg-blue-50'
                                    }`}
                            >
                                <Icon icon="mdi:store" className="text-lg text-blue-600" />
                                <p className="text-sm font-semibold text-slate-800">Ambil Sendiri</p>
                            </div>
                            <button
                                onClick={handleConfirmDelivery}
                                className="w-full py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                            >
                                Konfirmasi Pengiriman
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Popup */}
            {showPaymentPopup && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 animate-fadeIn">
                    <div
                        className="relative bg-white text-slate-900 max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-300"
                    >
                        <button
                            onClick={() => setShowPaymentPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
                        >
                            <Icon icon="mdi:close" className="text-lg" />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
                            Pilih Metode Pembayaran
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div
                                onClick={() => handleConfirmPayment('Transfer Bank')}
                                className="cursor-pointer p-3 border border-slate-300 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-2"
                            >
                                <Icon icon="mdi:bank" className="text-lg text-blue-600" />
                                <p className="text-sm font-semibold text-slate-800">Transfer Bank</p>
                            </div>
                            <div
                                onClick={() => handleConfirmPayment('E-Wallet')}
                                className="cursor-pointer p-3 border border-slate-300 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-2"
                            >
                                <Icon icon="mdi:wallet" className="text-lg text-blue-600" />
                                <p className="text-sm font-semibold text-slate-800">E-Wallet</p>
                            </div>
                            <div
                                onClick={() => handleConfirmPayment('Tunai')}
                                className="cursor-pointer p-3 border border-slate-300 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-2"
                            >
                                <Icon icon="mdi:cash" className="text-lg text-blue-600" />
                                <p className="text-sm font-semibold text-slate-800">Tunai</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav />
        </section>
    );
}