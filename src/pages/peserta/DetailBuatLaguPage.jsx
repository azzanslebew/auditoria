import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNav from '../../components/BottowNav';

const serviceProviders = {
    'Komposisi Lagu': [
        {
            id: 1,
            name: 'Melody Craft Studio',
            days: 'Senin - Sabtu',
            hours: '09:00 - 18:00',
            price: '500.000',
            image: 'https://images.unsplash.com/photo-1460667262436-cf19894f4774?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM2fHxtdXNpY3xlbnwwfHwwfHx8MA%3D%3D',
            category: 'Komposisi',
        },
        {
            id: 2,
            name: 'Harmony Creators',
            days: 'Senin - Minggu',
            hours: '10:00 - 20:00',
            price: '450.000',
            image: 'https://images.unsplash.com/photo-1510577956525-69bd3c29339e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxtdXNpY3xlbnwwfHwwfHx8MA%3D%3D',
            category: 'Komposisi',
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
            category: 'Aransemen',
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
            category: 'Lirik',
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
            category: 'Audio',
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
            category: 'Recording',
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
            category: 'Beat',
        },
    ],
};

export default function DetailBuatLaguPage() {
    const { service, providerId } = useParams();
    const navigate = useNavigate();
    const [projectDate, setProjectDate] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [songDuration, setSongDuration] = useState(''); // Komposisi Lagu
    const [arrangementType, setArrangementType] = useState(''); // Aransemen
    const [lyricTheme, setLyricTheme] = useState(''); // Lirik Writing
    const [format, setFormat] = useState(''); // Mixing & Mastering
    const [trackCount, setTrackCount] = useState(''); // Mixing & Mastering
    const [recordingDuration, setRecordingDuration] = useState(''); // Recording
    const [recordingType, setRecordingType] = useState(''); // Recording
    const [tempo, setTempo] = useState(''); // Produksi Beat
    const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState('');
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const popupRef = useRef(null);

    // Capitalize service name to match serviceProviders keys
    const capitalizedService = service
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const provider = serviceProviders[capitalizedService]?.find(
        (p) => p.id === parseInt(providerId)
    );

    if (!provider) {
        return (
            <section className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-exo">
                <p className="text-center text-slate-700 text-sm sm:text-base">
                    Penyedia jasa tidak ditemukan.
                </p>
            </section>
        );
    }

    const handleConfirm = () => {
        let isValid = true;
        if (!projectDate || !description) isValid = false;

        if (capitalizedService === 'Komposisi Lagu' && (!genre || !songDuration)) isValid = false;
        if (capitalizedService === 'Aransemen' && (!genre || !arrangementType)) isValid = false;
        if (capitalizedService === 'Lirik Writing' && (!genre || !lyricTheme)) isValid = false;
        if (capitalizedService === 'Mixing & Mastering' && (!format || !trackCount)) isValid = false;
        if (capitalizedService === 'Recording' && (!recordingDuration || !recordingType)) isValid = false;
        if (capitalizedService === 'Produksi Beat' && (!genre || !tempo)) isValid = false;

        if (!isValid) {
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
        alert(`Pemesanan berhasil untuk ${provider.name} (${capitalizedService}) pada ${projectDate} dengan pembayaran ${method}`);
        setShowPaymentPopup(false);
        navigate('/kursus/offline/confirm', {
            state: {
                service: capitalizedService,
                provider,
                projectDate,
                description,
                genre,
                songDuration,
                arrangementType,
                lyricTheme,
                format,
                trackCount,
                recordingDuration,
                recordingType,
                tempo,
                deliveryOption: selectedDelivery,
                paymentMethod: method,
            },
        });
    };

    return (
        <section className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-exo">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center sm:hidden">
                    <button
                        onClick={() => navigate('/peserta/jasa-buat-lagu')}
                        className="p-2 mr-3 text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                    >
                        <Icon icon="mdi:arrow-left" className="text-xl" />
                    </button>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Detail Jasa{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {capitalizedService}
                        </span>
                    </h2>
                </div>

                <div className="hidden sm:flex items-center justify-between w-full">
                    <h2 className="text-3xl font-bold text-slate-800">
                        Detail Jasa{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {capitalizedService}
                        </span>
                    </h2>
                    <button
                        onClick={() => navigate('/peserta/jasa-buat-lagu')}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                    >
                        <Icon icon="mdi:arrow-left" className="text-lg" />
                        Kembali ke Jasa Pembuatan Lagu
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
                            <span>Mulai dari Rp {provider.price}</span>
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
                                Tanggal Mulai Proyek
                            </label>
                            <input
                                type="date"
                                value={projectDate}
                                onChange={(e) => setProjectDate(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                Deskripsi Proyek
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Jelaskan kebutuhan proyek Anda..."
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                                rows="4"
                            />
                        </div>
                        {(capitalizedService === 'Komposisi Lagu' || capitalizedService === 'Aransemen' || capitalizedService === 'Lirik Writing' || capitalizedService === 'Produksi Beat') && (
                            <div>
                                <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                    Genre Musik
                                </label>
                                <select
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                                >
                                    <option value="">Pilih Genre</option>
                                    <option value="Pop">Pop</option>
                                    <option value="Rock">Rock</option>
                                    <option value="Jazz">Jazz</option>
                                    <option value="Klasik">Klasik</option>
                                    <option value="Hip-Hop">Hip-Hop</option>
                                    <option value="Dangdut">Dangdut</option>
                                </select>
                            </div>
                        )}
                        {capitalizedService === 'Komposisi Lagu' && (
                            <div>
                                <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                    Durasi Lagu (Menit)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={songDuration}
                                    onChange={(e) => setSongDuration(e.target.value)}
                                    placeholder="Contoh: 3"
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                                />
                            </div>
                        )}
                        {capitalizedService === 'Aransemen' && (
                            <div>
                                <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                    Jenis Aransemen
                                </label>
                                <select
                                    value={arrangementType}
                                    onChange={(e) => setArrangementType(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                                >
                                    <option value="">Pilih Jenis</option>
                                    <option value="Akustik">Akustik</option>
                                    <option value="Orkestra">Orkestra</option>
                                    <option value="Elektronik">Elektronik</option>
                                    <option value="Pop">Pop</option>
                                    <option value="Rock">Rock</option>
                                </select>
                            </div>
                        )}
                        {capitalizedService === 'Lirik Writing' && (
                            <div>
                                <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                    Tema Lirik
                                </label>
                                <input
                                    type="text"
                                    value={lyricTheme}
                                    onChange={(e) => setLyricTheme(e.target.value)}
                                    placeholder="Contoh: Cinta, Motivasi, Kehilangan"
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                                />
                            </div>
                        )}
                        {capitalizedService === 'Mixing & Mastering' && (
                            <>
                                <div>
                                    <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                        Format Output
                                    </label>
                                    <select
                                        value={format}
                                        onChange={(e) => setFormat(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                                    >
                                        <option value="">Pilih Format</option>
                                        <option value="WAV">WAV</option>
                                        <option value="MP3">MP3</option>
                                        <option value="FLAC">FLAC</option>
                                        <option value="AAC">AAC</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                        Jumlah Track
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={trackCount}
                                        onChange={(e) => setTrackCount(e.target.value)}
                                        placeholder="Contoh: 8"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                                    />
                                </div>
                            </>
                        )}
                        {capitalizedService === 'Recording' && (
                            <>
                                <div>
                                    <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                        Durasi Rekaman (Jam)
                                    </label>
                                    <select
                                        value={recordingDuration}
                                        onChange={(e) => setRecordingDuration(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                                    >
                                        <option value="">Pilih Durasi</option>
                                        <option value="1">1 Jam</option>
                                        <option value="2">2 Jam</option>
                                        <option value="3">3 Jam</option>
                                        <option value="4">4 Jam</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                        Jenis Rekaman
                                    </label>
                                    <select
                                        value={recordingType}
                                        onChange={(e) => setRecordingType(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                                    >
                                        <option value="">Pilih Jenis</option>
                                        <option value="Vokal">Vokal</option>
                                        <option value="Instrumen">Instrumen</option>
                                        <option value="Live">Live</option>
                                    </select>
                                </div>
                            </>
                        )}
                        {capitalizedService === 'Produksi Beat' && (
                            <div>
                                <label className="block text-xs sm:text-sm text-slate-700 mb-1">
                                    Tempo (BPM)
                                </label>
                                <input
                                    type="number"
                                    min="60"
                                    max="200"
                                    value={tempo}
                                    onChange={(e) => setTempo(e.target.value)}
                                    placeholder="Contoh: 120"
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all duration-300"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-3">
                        Syarat dan Ketentuan
                    </h4>
                    <ul className="text-xs sm:text-sm text-slate-700 list-disc pl-5">
                        <li>Deposit diperlukan sebesar 50% dari total biaya jasa.</li>
                        <li>Revisi maksimal 2 kali untuk layanan komposisi, aransemen, dan lirik.</li>
                        <li>Pembatalan dikenakan biaya 25% jika kurang dari 48 jam.</li>
                        <li>File proyek akan dikirim dalam format digital sesuai kesepakatan.</li>
                    </ul>
                </div>

                <button
                    onClick={handleConfirm}
                    className="mt-6 w-full py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                    disabled={
                        !projectDate ||
                        !description ||
                        (capitalizedService === 'Komposisi Lagu' && (!genre || !songDuration)) ||
                        (capitalizedService === 'Aransemen' && (!genre || !arrangementType)) ||
                        (capitalizedService === 'Lirik Writing' && (!genre || !lyricTheme)) ||
                        (capitalizedService === 'Mixing & Mastering' && (!format || !trackCount)) ||
                        (capitalizedService === 'Recording' && (!recordingDuration || !recordingType)) ||
                        (capitalizedService === 'Produksi Beat' && (!genre || !tempo))
                    }
                >
                    Konfirmasi Pemesanan
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
                                <Icon icon="mdi:download" className="text-lg text-blue-600" />
                                <p className="text-sm font-semibold text-slate-800">Dikirim Via WA (File Digital)</p>
                            </div>
                            <div
                                onClick={() => setSelectedDelivery('Ambil Sendiri')}
                                className={`cursor-pointer p-3 border rounded-lg transition-all flex items-center gap-2 ${selectedDelivery === 'Ambil Sendiri'
                                    ? 'border-blue-600 bg-blue-100'
                                    : 'border-slate-300 hover:bg-blue-50'
                                    }`}
                            >
                                <Icon icon="mdi:store" className="text-lg text-blue-600" />
                                <p className="text-sm font-semibold text-slate-800">Ambil Sendiri (Studio)</p>
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