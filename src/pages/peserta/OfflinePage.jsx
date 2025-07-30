import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../../components/BottowNav';

const locations = {
    'Kota Kudus': {
        'Kaliwungu': {
            'Kaliwungu': ['Desa Kaliwungu', 'Desa Banget'],
            'Prambatan Kidul': ['Desa Prambatan', 'Desa Kedungsari'],
        },
        'Kota': {
            'Wergu Wetan': ['Desa Wergu', 'Desa Mlati'],
            'Demangan': ['Desa Demangan', 'Desa Sunggingan'],
        },
    },
    'Kota Semarang': {
        'Banyumanik': {
            'Srondol Wetan': ['Desa Srondol', 'Desa Pudakpayung'],
            'Gedawang': ['Desa Gedawang', 'Desa Jabungan'],
        },
        'Tembalang': {
            'Tembalang': ['Desa Tembalang', 'Desa Sendangmulyo'],
            'Kedungmundu': ['Desa Kedungmundu', 'Desa Meteseh'],
        },
    },
};

const schedules = [
    { id: 1, day: 'Senin', time: '10:00 - 11:00' },
    { id: 2, day: 'Rabu', time: '14:00 - 15:00' },
    { id: 3, day: 'Jumat', time: '16:00 - 17:00' },
];

export default function OfflinePage() {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [selectedKelurahan, setSelectedKelurahan] = useState('');
    const [selectedDesa, setSelectedDesa] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const navigate = useNavigate();
    const { instrument, vocal } = useParams();

    const cities = Object.keys(locations);
    const kecamatans = selectedCity ? Object.keys(locations[selectedCity]) : [];
    const kelurahans = selectedCity && selectedKecamatan ? Object.keys(locations[selectedCity][selectedKecamatan]) : [];
    const desas = selectedCity && selectedKecamatan && selectedKelurahan ? locations[selectedCity][selectedKecamatan][selectedKelurahan] : [];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCity && selectedKecamatan && selectedKelurahan && selectedDesa && selectedSchedule) {
            setShowPaymentPopup(true);
        } else {
            alert('Harap lengkapi semua pilihan lokasi dan jadwal.');
        }
    };

    const handleConfirmPayment = (method) => {
        alert(`Pemesanan berhasil untuk kursus ${instrument || vocal || ''} di ${selectedDesa}, ${selectedKelurahan}, ${selectedKecamatan}, ${selectedCity} pada ${selectedSchedule} dengan pembayaran ${method}`);
        setShowPaymentPopup(false);
        navigate('/kursus/offline/confirm');
    };

    return (
        <section className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-exo">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center sm:hidden">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 mr-3 text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                    >
                        <Icon icon="mdi:arrow-left" className="text-xl" />
                    </button>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Kursus{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Offline {instrument || vocal || ''}
                        </span>
                    </h2>
                </div>

                <div className="hidden sm:flex items-center justify-between w-full">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                        Kursus{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Offline {instrument || vocal || ''}
                        </span>
                    </h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 sm:mt-0 hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                    >
                        <Icon icon="mdi:arrow-left" className="text-lg" />
                        Kembali
                    </button>
                </div>
            </div>

            <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-md shadow-blue-500/20 mb-16 sm:mb-0">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 text-center">
                    Pilih Lokasi dan Jadwal Kursus
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-slate-700">
                            Kota
                        </label>
                        <select
                            id="city"
                            value={selectedCity}
                            onChange={(e) => {
                                setSelectedCity(e.target.value);
                                setSelectedKecamatan('');
                                setSelectedKelurahan('');
                                setSelectedDesa('');
                                setSelectedSchedule('');
                            }}
                            className="w-full mt-1 px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                        >
                            <option value="" disabled>
                                Pilih Kota
                            </option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="kecamatan" className="block text-sm font-medium text-slate-700">
                            Kecamatan
                        </label>
                        <select
                            id="kecamatan"
                            value={selectedKecamatan}
                            onChange={(e) => {
                                setSelectedKecamatan(e.target.value);
                                setSelectedKelurahan('');
                                setSelectedDesa('');
                                setSelectedSchedule('');
                            }}
                            disabled={!selectedCity}
                            className="w-full mt-1 px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none disabled:opacity-50"
                        >
                            <option value="" disabled>
                                Pilih Kecamatan
                            </option>
                            {kecamatans.map((kecamatan) => (
                                <option key={kecamatan} value={kecamatan}>
                                    {kecamatan}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="kelurahan" className="block text-sm font-medium text-slate-700">
                            Kelurahan
                        </label>
                        <select
                            id="kelurahan"
                            value={selectedKelurahan}
                            onChange={(e) => {
                                setSelectedKelurahan(e.target.value);
                                setSelectedDesa('');
                                setSelectedSchedule('');
                            }}
                            disabled={!selectedKecamatan}
                            className="w-full mt-1 px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none disabled:opacity-50"
                        >
                            <option value="" disabled>
                                Pilih Kelurahan
                            </option>
                            {kelurahans.map((kelurahan) => (
                                <option key={kelurahan} value={kelurahan}>
                                    {kelurahan}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="desa" className="block text-sm font-medium text-slate-700">
                            Desa
                        </label>
                        <select
                            id="desa"
                            value={selectedDesa}
                            onChange={(e) => setSelectedDesa(e.target.value)}
                            disabled={!selectedKelurahan}
                            className="w-full mt-1 px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none disabled:opacity-50"
                        >
                            <option value="" disabled>
                                Pilih Desa
                            </option>
                            {desas.map((desa) => (
                                <option key={desa} value={desa}>
                                    {desa}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="schedule" className="block text-sm font-medium text-slate-700">
                            Jadwal
                        </label>
                        <select
                            id="schedule"
                            value={selectedSchedule}
                            onChange={(e) => setSelectedSchedule(e.target.value)}
                            disabled={!selectedDesa}
                            className="w-full mt-1 px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none disabled:opacity-50"
                        >
                            <option value="" disabled>
                                Pilih Jadwal
                            </option>
                            {schedules.map((schedule) => (
                                <option key={schedule.id} value={`${schedule.day}, ${schedule.time}`}>
                                    {schedule.day}, {schedule.time}
                                </option>
                            ))}
                        </select>
                    </div>
                    <p className="text-xs text-slate-600 text-center">
                        Lokasi: Studio Musik di {selectedDesa || 'Pilih lokasi'}
                    </p>
                    <button
                        type="submit"
                        className={`w-full py-3 px-6 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ${selectedCity && selectedKecamatan && selectedKelurahan && selectedDesa && selectedSchedule
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Konfirmasi Lokasi dan Jadwal
                    </button>
                </form>
            </div>

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