import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottowNav';

const instruments = [
    { id: 1, name: 'Gitar', category: 'String', icon: 'mdi:guitar-acoustic' },
    { id: 2, name: 'Piano', category: 'Keyboard', icon: 'mdi:piano' },
    { id: 3, name: 'Biola', category: 'String', icon: 'mdi:violin' },
    { id: 4, name: 'Drum', category: 'Percussion', icon: 'game-icons:drum-kit' },
    { id: 5, name: 'Saxophone', category: 'Wind', icon: 'mdi:saxophone' },
    { id: 6, name: 'Ukulele', category: 'String', icon: 'mdi:guitar-acoustic' },
    { id: 7, name: 'Keyboard', category: 'Keyboard', icon: 'mdi:keyboard-variant' },
    { id: 8, name: 'Flute', category: 'Wind', icon: 'game-icons:flute' },
];

export default function KursusAlatMusik() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedInstrument, setSelectedInstrument] = useState(null);
    const navigate = useNavigate();
    const popupRef = useRef(null);

    const categories = ['All', 'String', 'Keyboard', 'Percussion', 'Wind'];

    const filteredInstruments = instruments.filter((instrument) => {
        const matchesSearch = instrument.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || instrument.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleDaftarKursus = (instrument) => {
        setSelectedInstrument(instrument);
        setShowPopup(true);
    };

    return (
        <section className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-exo">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    Kursus{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Alat Musik
                    </span>
                </h2>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 sm:mt-0 hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                >
                    <Icon icon="mdi:arrow-left" className="text-lg" />
                    Kembali ke Beranda
                </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Cari alat musik..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none pl-10 transition-all duration-300"
                    />
                    <Icon
                        icon="mdi:magnify"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-lg"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setCategoryFilter(category)}
                            className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 ${categoryFilter === category
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Instrument List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredInstruments.length > 0 ? (
                    filteredInstruments.map((instrument) => (
                        <div
                            key={instrument.id}
                            className="border border-slate-200 rounded-2xl p-4 sm:p-6 bg-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Icon icon={instrument.icon} className="text-2xl sm:text-3xl text-blue-600" />
                                <h3 className="text-base sm:text-lg font-semibold text-slate-800">{instrument.name}</h3>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700">Kategori: {instrument.category}</p>
                            <button
                                onClick={() => handleDaftarKursus(instrument)}
                                className="mt-4 w-full py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                            >
                                Daftar Kursus
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-slate-700 text-sm sm:text-base col-span-full py-4">
                        Tidak ada alat musik yang sesuai dengan pencarian.
                    </p>
                )}
            </div>

            {/* Show More Button */}
            <div className="flex justify-center mt-8 mb-12 sm:mb-0">
                <a
                    href="#"
                    className="px-6 py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300 flex items-center gap-2"
                >
                    Show More
                    <Icon icon="mdi:arrow-right" className="text-lg" />
                </a>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
                    <div
                        ref={popupRef}
                        className="relative bg-white text-slate-900 max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-300"
                    >
                        {/* Tombol Tutup */}
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
                        >
                            x
                        </button>

                        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
                            Pilih Jenis Kursus {selectedInstrument?.name}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div
                                onClick={() => navigate(`/kursus/offline/${selectedInstrument?.name.toLowerCase()}`)}
                                className="cursor-pointer bg-gray-100 hover:bg-blue-100 border border-gray-300 rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-lg"
                            >
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1661761077411-d50cba031848?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Kursus Offline"
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-3 text-center">
                                    <p className="text-slate-800 font-semibold">Kursus Offline</p>
                                </div>
                            </div>
                            <div
                                onClick={() => navigate(`/kursus/online/${selectedInstrument?.name.toLowerCase()}`)}
                                className="cursor-pointer bg-gray-100 hover:bg-purple-100 border border-gray-300 rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-lg"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1616531770192-6eaea74c2456?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG9ubGluZXxlbnwwfHwwfHx8MA%3D%3D"
                                    alt="Kursus Online"
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-3 text-center">
                                    <p className="text-slate-800 font-semibold">Kursus Online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav />
        </section>
    );
}