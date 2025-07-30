import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottowNav';

const vocalTypes = [
    { id: 1, name: 'Pop', category: 'Modern', icon: 'mdi:microphone-variant' },
    { id: 2, name: 'Jazz', category: 'Modern', icon: 'fa6-solid:music' },
    { id: 3, name: 'Klasik', category: 'Classical', icon: 'mdi:music-clef-treble' },
    { id: 4, name: 'Rock', category: 'Modern', icon: 'mdi:guitar-electric' },
    { id: 5, name: 'Opera', category: 'Classical', icon: 'tabler:microphone-2' },
    { id: 6, name: 'R&B', category: 'Modern', icon: 'mdi:microphone-outline' },
    { id: 7, name: 'Musikal', category: 'Theatrical', icon: 'mdi:drama-masks' },
    { id: 8, name: 'Gospel', category: 'Spiritual', icon: 'fa6-solid:cross' },
];

export default function KursusVokal() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedVocal, setSelectedVocal] = useState(null);
    const navigate = useNavigate();
    const popupRef = useRef(null);

    const categories = ['All', 'Modern', 'Classical', 'Theatrical', 'Spiritual'];

    const filteredVocalTypes = vocalTypes.filter((vocal) => {
        const matchesSearch = vocal.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || vocal.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleDaftarKursus = (vocal) => {
        setSelectedVocal(vocal);
        setShowPopup(true);
    };

    return (
        <section className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-exo">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    Kursus{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Vokal
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
                        placeholder="Cari jenis vokal..."
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

            {/* Vocal Type List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredVocalTypes.length > 0 ? (
                    filteredVocalTypes.map((vocal) => (
                        <div
                            key={vocal.id}
                            className="border border-slate-200 rounded-2xl p-4 sm:p-6 bg-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Icon icon={vocal.icon} className="text-2xl sm:text-3xl text-blue-600" />
                                <h3 className="text-base sm:text-lg font-semibold text-slate-800">{vocal.name}</h3>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700">Kategori: {vocal.category}</p>
                            <button
                                onClick={() => handleDaftarKursus(vocal)}
                                className="mt-4 w-full py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                            >
                                Daftar Kursus
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-slate-700 text-sm sm:text-base col-span-full py-4">
                        Tidak ada jenis vokal yang sesuai dengan pencarian.
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
                            Pilih Jenis Kursus {selectedVocal?.name}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div
                                onClick={() => navigate(`/kursus/offline/${selectedVocal?.name.toLowerCase()}`)}
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
                                onClick={() => navigate(`/kursus/online/${selectedVocal?.name.toLowerCase()}`)}
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