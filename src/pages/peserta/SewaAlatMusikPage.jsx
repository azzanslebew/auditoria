import React, { useState } from 'react';
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

const rentalProviders = {
    'Gitar': [
        {
            id: 1,
            name: 'Melody Haven',
            days: 'Senin - Minggu',
            hours: '09:00 - 21:00',
            price: '50.000',
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D',
        },
        {
            id: 2,
            name: 'Rhythm Studio',
            days: 'Senin - Sabtu',
            hours: '10:00 - 20:00',
            price: '45.000',
            image: 'https://plus.unsplash.com/premium_photo-1682125853703-896a05629709?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWN8ZW58MHx8MHx8fDA%3D',
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
        },
    ],
};

export default function SewaAlatMusikPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const navigate = useNavigate();

    const categories = ['All', 'String', 'Keyboard', 'Percussion', 'Wind'];

    const filteredInstruments = instruments.filter((instrument) => {
        const matchesSearch = instrument.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || instrument.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-exo">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    Sewa{' '}
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
            {filteredInstruments.map((instrument) => (
                <div key={instrument.id} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Icon icon={instrument.icon} className="text-2xl sm:text-3xl text-blue-600" />
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800">{instrument.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {rentalProviders[instrument.name]?.length > 0 ? (
                            rentalProviders[instrument.name].map((provider) => (
                                <div
                                    key={provider.id}
                                    className="border border-slate-200 rounded-2xl p-4 sm:p-6 bg-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="relative h-32 sm:h-40 overflow-hidden rounded-lg mb-4">
                                        <img
                                            src={provider.image}
                                            alt={provider.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                                {instrument.category}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3">
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
                                        <span>Mulai dari Rp {provider.price}</span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/sewa/${instrument.name.toLowerCase()}/${provider.id}`)}
                                        className="w-full py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                                    >
                                        Sewa Sekarang
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-700 text-sm sm:text-base col-span-full py-4">
                                Tidak ada penyedia sewa untuk {instrument.name}.
                            </p>
                        )}
                    </div>
                </div>
            ))}

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

            <BottomNav />
        </section>
    );
}