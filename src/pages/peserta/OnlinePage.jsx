import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../../components/BottowNav';

const tutors = [
    { id: 1, name: 'Budi Santoso', skill: 'Gitar', location: 'Jakarta', icon: 'mdi:guitar-acoustic', rating: 4.8, sessions: 120 },
    { id: 2, name: 'Ani Wijaya', skill: 'Piano', location: 'Bandung', icon: 'mdi:piano', rating: 4.9, sessions: 95 },
    { id: 3, name: 'Cindy Lestari', skill: 'Pop', location: 'Surabaya', icon: 'mdi:microphone-variant', rating: 4.7, sessions: 80 },
    { id: 4, name: 'Dedi Pratama', skill: 'Jazz', location: 'Yogyakarta', icon: 'fa6-solid:music', rating: 4.6, sessions: 65 },
    { id: 5, name: 'Eka Putri', skill: 'Biola', location: 'Bali', icon: 'mdi:violin', rating: 4.8, sessions: 110 },
    { id: 6, name: 'Fajar Nugroho', skill: 'Drum', location: 'Medan', icon: 'mdi:drum', rating: 4.5, sessions: 75 },
];

const schedules = [
    { id: 1, day: 'Senin', time: '10:00 - 11:00' },
    { id: 2, day: 'Rabu', time: '14:00 - 15:00' },
    { id: 3, day: 'Jumat', time: '16:00 - 17:00' },
];

export default function OnlinePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [skillFilter, setSkillFilter] = useState('All');
    const [showSchedulePopup, setShowSchedulePopup] = useState(false);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const navigate = useNavigate();
    const { instrument, vocal } = useParams();
    const popupRef = useRef(null);

    const skills = ['All', 'Gitar', 'Piano', 'Pop', 'Jazz', 'Biola', 'Drum'];

    const filteredTutors = tutors.filter((tutor) => {
        const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tutor.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSkill = skillFilter === 'All' || tutor.skill === skillFilter;
        const matchesParam = !instrument && !vocal || tutor.skill.toLowerCase() === (instrument || vocal || '').toLowerCase();
        return matchesSearch && matchesSkill && matchesParam;
    });

    const handlePilihTutor = (tutor) => {
        setSelectedTutor(tutor);
        setShowSchedulePopup(true);
    };

    const handleConfirmSchedule = () => {
        if (selectedSchedule) {
            setShowSchedulePopup(false);
            setShowPaymentPopup(true);
        } else {
            alert('Harap pilih jadwal terlebih dahulu.');
        }
    };

    const handleConfirmPayment = (method) => {
        alert(`Pemesanan berhasil untuk ${selectedTutor.name} (${selectedTutor.skill}) pada ${selectedSchedule} dengan pembayaran ${method}`);
        setShowPaymentPopup(false);
        navigate('/kursus/online/confirm');
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

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Cari tutor atau lokasi..."
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
                    {skills.map((skill) => (
                        <button
                            key={skill}
                            onClick={() => setSkillFilter(skill)}
                            className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 ${skillFilter === skill
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                }`}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tutor List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredTutors.length > 0 ? (
                    filteredTutors.map((tutor) => (
                        <div
                            key={tutor.id}
                            className="border border-slate-200 rounded-2xl p-4 sm:p-6 bg-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Icon icon={tutor.icon} className="text-2xl sm:text-3xl text-blue-600" />
                                <h3 className="text-base sm:text-lg font-semibold text-slate-800">{tutor.name}</h3>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700">Keahlian: {tutor.skill}</p>
                            <p className="text-xs sm:text-sm text-slate-700">Lokasi: {tutor.location}</p>
                            <p className="text-xs sm:text-sm text-slate-700">Rating: {tutor.rating} ★ ({tutor.sessions} sesi)</p>
                            <button
                                onClick={() => handlePilihTutor(tutor)}
                                className="mt-4 w-full py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                            >
                                Pilih Tutor
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-slate-700 text-sm sm:text-base col-span-full py-4">
                        Tidak ada tutor yang sesuai dengan pencarian.
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

            {/* Schedule Popup */}
            {showSchedulePopup && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 animate-fadeIn">
                    <div
                        ref={popupRef}
                        className="relative bg-white text-slate-900 max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-300"
                    >
                        <button
                            onClick={() => setShowSchedulePopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
                        >
                            <Icon icon="mdi:close" className="text-lg" />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
                            Pilih Jadwal untuk {selectedTutor?.name}
                        </h2>
                        <div className="space-y-4">
                            {schedules.map((schedule) => (
                                <div
                                    key={schedule.id}
                                    onClick={() => setSelectedSchedule(`${schedule.day}, ${schedule.time}`)}
                                    className={`cursor-pointer p-3 border rounded-lg transition-all ${selectedSchedule === `${schedule.day}, ${schedule.time}`
                                        ? 'border-blue-600 bg-blue-100'
                                        : 'border-slate-300 hover:bg-blue-50'
                                        }`}
                                >
                                    <p className="text-sm font-semibold text-slate-800">
                                        {schedule.day}, {schedule.time}
                                    </p>
                                </div>
                            ))}
                            <button
                                onClick={handleConfirmSchedule}
                                className="w-full py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                            >
                                Konfirmasi Jadwal
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