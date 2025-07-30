import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const tabs = [
    { label: 'Kursus Musik', key: 'musik' },
    { label: 'Jasa Pembuatan Lagu', key: 'jasa' },
    { label: 'Sewa Alat Musik', key: 'alat' },
];

const content = {
    musik: [
        { name: 'Vokal Dasar', icon: 'emojione-monotone:microphone', participants: 120 },
        { name: 'Vokal Pop', icon: 'mdi:music-note', participants: 85 },
        { name: 'Gitar Akustik', icon: 'mdi:guitar-acoustic', participants: 65 },
        { name: 'Piano Dasar', icon: 'mdi:piano', participants: 95 },
        { name: 'Biola', icon: 'mdi:violin', participants: 45 },
    ],
    jasa: [
        { name: 'Mixing & Mastering', icon: 'mdi:waveform', participants: 50 },
        { name: 'Buat Beat', icon: 'mdi:music-box', participants: 70 },
        { name: 'Sound Design', icon: 'mdi:speaker-wireless', participants: 30 },
        { name: 'Jingle Iklan', icon: 'mdi:bullhorn', participants: 25 },
        { name: 'Scoring Film', icon: 'mdi:movie-open-play', participants: 40 },
    ],
    alat: [
        { name: 'Sewa Gitar Akustik', icon: 'mdi:guitar-acoustic', participants: 60 },
        { name: 'Sewa Piano', icon: 'mdi:piano', participants: 80 },
        { name: 'Sewa Biola', icon: 'mdi:violin', participants: 35 },
        { name: 'Sewa Drum Elektrik', icon: 'game-icons:drum-kit', participants: 55 },
        { name: 'Sewa Saxophone', icon: 'mdi:saxophone', participants: 20 },
    ],
};

export default function PopularCourse() {
    const [activeTab, setActiveTab] = useState('musik');

    return (
        <div className="max-w-6xl mx-auto bg-white px-4 py-12 font-exo">
            {/* Header */}
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                <span className="text-yellow-500 text-4xl">⚡</span> Layanan{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Populer</span>
            </h2>
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 rounded-xl border font-medium text-sm transition-all duration-300 ${activeTab === tab.key
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-400/40'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Grid List */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
                {content[activeTab].map((item, index) => (
                    <div
                        key={index}
                        className="group relative aspect-square bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl border border-transparent hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 flex flex-col items-center justify-center p-5 sm:p-4 text-white"
                    >
                        <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                            <Icon icon={item.icon} />
                        </div>
                        <div className="text-sm sm:text-base text-center font-semibold">{item.name}</div>
                        <div className="flex items-center gap-1 mt-1 text-xs sm:text-sm text-white/80">
                            <Icon icon="mdi:account-group" className="text-sm" />
                            <span>{item.participants} peserta</span>
                        </div>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                ))}
            </div>
        </div>
    );
}