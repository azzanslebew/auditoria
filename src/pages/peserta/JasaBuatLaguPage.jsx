import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottowNav';

const services = [
    { id: 1, name: 'Komposisi Lagu', category: 'Komposisi', icon: 'mdi:music-note' },
    { id: 2, name: 'Aransemen', category: 'Aransemen', icon: 'mdi:music-box' },
    { id: 3, name: 'Lirik Writing', category: 'Lirik', icon: 'mdi:script-text' },
    { id: 4, name: 'Mixing & Mastering', category: 'Audio', icon: 'mdi:mixer' },
    { id: 5, name: 'Recording', category: 'Recording', icon: 'mdi:microphone' },
    { id: 6, name: 'Produksi Beat', category: 'Beat', icon: 'game-icons:drum-kit' },
];

const serviceProviders = {
    'Komposisi Lagu': [
        {
            id: 1,
            name: 'Melody Craft Studio',
            days: 'Senin - Sabtu',
            hours: '09:00 - 18:00',
            price: '500.000',
            image: 'https://images.unsplash.com/photo-1460667262436-cf19894f4774?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM2fHxtdXNpY3xlbnwwfHwwfHx8MA%3D%3D',
        },
        {
            id: 2,
            name: 'Harmony Creators',
            days: 'Senin - Minggu',
            hours: '10:00 - 20:00',
            price: '450.000',
            image: 'https://images.unsplash.com/photo-1510577956525-69bd3c29339e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxtdXNpY3xlbnwwfHwwfHx8MA%3D%3D',
        },
    ],
    'Aransemen': [
        {
            id: 3,
            name: 'SoundScape Arranger',
            days: 'Selasa - Minggu',
            hours: '09:00 - 19:00',
            price: '600.000',
            image: 'https://images.unsplash.com/photo-1433622070098-754fdf81c929?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxtdXNpY3xlbnwwfHwwfHx8MA%3D%3D',
        },
    ],
    'Lirik Writing': [
        {
            id: 4,
            name: 'Lyric Haven',
            days: 'Senin - Jumat',
            hours: '08:00 - 17:00',
            price: '300.000',
            image: 'https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fG11c2ljfGVufDB8fDB8fHww',
        },
    ],
    'Mixing & Mastering': [
        {
            id: 5,
            name: 'Audio Polish Pro',
            days: 'Senin - Minggu',
            hours: '10:00 - 22:00',
            price: '400.000',
            image: 'https://plus.unsplash.com/premium_photo-1682125816787-4db071ef2da8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fG11c2ljfGVufDB8fDB8fHww',
        },
    ],
    'Recording': [
        {
            id: 6,
            name: 'Studio Rekam Nusantara',
            days: 'Selasa - Minggu',
            hours: '09:00 - 21:00',
            price: '350.000',
            image: 'https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fG11c2ljfGVufDB8fDB8fHww',
        },
    ],
    'Produksi Beat': [
        {
            id: 7,
            name: 'Beat Factory',
            days: 'Senin - Sabtu',
            hours: '10:00 - 20:00',
            price: '250.000',
            image: 'https://images.unsplash.com/photo-1461784121038-f088ca1e7714?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fG11c2ljfGVufDB8fDB8fHww',
        },
    ],
};

export default function JasaBuatLaguPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const navigate = useNavigate();

    const categories = ['All', 'Komposisi', 'Aransemen', 'Lirik', 'Audio', 'Recording', 'Beat'];

    const filteredServices = services.filter((service) => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || service.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-exo">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    Jasa{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Pembuatan Lagu
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
                        placeholder="Cari jasa pembuatan lagu..."
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

            {/* Service List */}
            {filteredServices.map((service) => (
                <div key={service.id} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Icon icon={service.icon} className="text-2xl sm:text-3xl text-blue-600" />
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800">{service.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {serviceProviders[service.name]?.length > 0 ? (
                            serviceProviders[service.name].map((provider) => (
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
                                                {service.category}
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
                                        onClick={() => navigate(`/jasa-buat-lagu/${service.name.toLowerCase()}/${provider.id}`)}
                                        className="w-full py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                                    >
                                        Pesan Jasa
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-700 text-sm sm:text-base col-span-full py-4">
                                Tidak ada penyedia jasa untuk {service.name}.
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