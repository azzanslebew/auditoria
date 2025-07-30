import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BottomNav from '../../components/BottowNav';

const AkunPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Nama Peserta',
        email: 'peserta@auditoria.com',
        phone: '+62 123 456 7890',
        interests: 'Gitar, Piano, Vokal',
        profileImage: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D'
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const validateInputs = () => {
        const newErrors = {};
        if (!profileData.name.trim()) newErrors.name = 'Nama tidak boleh kosong';
        if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = 'Email tidak valid';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEditToggle = () => {
        if (isEditing) {
            if (validateInputs()) {
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                    setPreviewImage(null);
                    setShowNotification(true);
                    setIsEditing(false);
                    setTimeout(() => setShowNotification(false), 3000);
                }, 1000);
            }
        } else {
            setIsEditing(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setProfileData({ ...profileData, profileImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-exo pt-16 pb-20 md:pb-8">
            {showNotification && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all z-50">
                    Perubahan berhasil disimpan!
                </div>
            )}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 sm:pb-4 pb-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">Akun Peserta</h1>
                            <p className="text-blue-100 text-sm sm:text-base mt-1">Kelola profil dan aktivitas Anda</p>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="hidden sm:flex items-center bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-all"
                            aria-label="Kembali ke beranda"
                            title="Kembali ke Beranda"
                        >
                            <Icon icon="mdi:home" className="w-5 h-5 mr-2" />
                            Beranda
                        </button>
                    </div>

                    {/* Profile Section */}
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 group">
                                <img
                                    src={previewImage || profileData.profileImage}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover border-4 border-blue-200 shadow-lg transition-transform group-hover:scale-105"
                                />
                                {isEditing && (
                                    <label
                                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-all"
                                        aria-label="Ubah foto profil"
                                        title="Ubah foto profil"
                                    >
                                        <Icon icon="mdi:camera" className="w-5 h-5" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                            ref={fileInputRef}
                                        />
                                    </label>
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{profileData.name}</h2>
                                <p className="text-gray-600 text-sm sm:text-base">{profileData.email}</p>
                                <p className="text-gray-500 text-sm mt-1">Bergabung sejak Juli 2025</p>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                {isEditing ? (
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleInputChange}
                                            className={`w-full py-2.5 px-3 text-sm border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
                                            placeholder="Masukkan nama lengkap"
                                            aria-required="true"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                ) : (
                                    <p className="text-gray-800 text-sm">{profileData.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                {isEditing ? (
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleInputChange}
                                            className={`w-full py-2.5 px-3 text-sm border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
                                            placeholder="Masukkan email"
                                            aria-required="true"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                ) : (
                                    <p className="text-gray-800 text-sm">{profileData.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleInputChange}
                                        className="w-full py-2.5 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                        placeholder="Masukkan nomor telepon"
                                    />
                                ) : (
                                    <p className="text-gray-800 text-sm">{profileData.phone}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Minat Musik</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="interests"
                                        value={profileData.interests}
                                        onChange={handleInputChange}
                                        className="w-full py-2.5 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                        placeholder="Masukkan minat musik"
                                    />
                                ) : (
                                    <p className="text-gray-800 text-sm">{profileData.interests}</p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                            <button
                                onClick={handleEditToggle}
                                className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md"
                                aria-label={isEditing ? 'Simpan perubahan' : 'Edit profil'}
                                title={isEditing ? 'Simpan perubahan' : 'Edit profil'}
                                disabled={isLoading}
                            >
                                <Icon icon={isEditing ? 'mdi:content-save' : 'mdi:pencil'} className="w-5 h-5 mr-2" />
                                {isEditing ? (isLoading ? 'Menyimpan...' : 'Simpan Perubahan') : 'Edit Profil'}
                            </button>
                            {isEditing && (
                                <button
                                    onClick={handleEditToggle}
                                    className="flex items-center justify-center bg-gray-200 text-gray-700 py-2.5 px-6 rounded-lg hover:bg-gray-300 transition-all font-semibold"
                                    aria-label="Batalkan pengeditan"
                                    title="Batalkan pengeditan"
                                >
                                    <Icon icon="mdi:close" className="w-5 h-5 mr-2" />
                                    Batal
                                </button>
                            )}
                            <button
                                onClick={() => navigate('/ganti-password')}
                                className="flex items-center justify-center bg-gray-200 text-gray-700 py-2.5 px-6 rounded-lg hover:bg-gray-300 transition-all font-semibold"
                                aria-label="Ganti password"
                                title="Ganti password"
                            >
                                <Icon icon="mdi:lock-reset" className="w-5 h-5 mr-2" />
                                Ganti Password
                            </button>
                            <button
                                onClick={() => navigate('/logout')}
                                className="flex items-center justify-center bg-red-500 text-white py-2.5 px-6 rounded-lg hover:bg-red-600 transition-all font-semibold"
                                aria-label="Logout"
                                title="Logout"
                            >
                                <Icon icon="mdi:logout" className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            <button
                                onClick={() => navigate('/peserta/riwayat')}
                                className="flex items-center justify-center bg-blue-600 text-white py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-all font-semibold"
                                aria-label="Lihat riwayat"
                                title="Lihat riwayat"
                            >
                                <Icon icon="mdi:history" className="w-5 h-5 mr-2" />
                                Riwayat
                            </button>
                            <button
                                onClick={() => navigate('/peserta/favorit')}
                                className="flex items-center justify-center bg-purple-600 text-white py-2.5 px-6 rounded-lg hover:bg-purple-700 transition-all font-semibold"
                                aria-label="Lihat favorit"
                                title="Lihat favorit"
                            >
                                <Icon icon="mdi:heart" className="w-5 h-5 mr-2" />
                                Favorit
                            </button>
                        </div>
                    </div>

                    {/* Kursus Section */}
                    <div className="p-6 sm:p-8 bg-gray-50">
                        <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-4">Kursus yang Diikuti</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-base font-semibold text-gray-800">Kursus Gitar Pemula</h4>
                                    <Icon icon="mdi:play-circle" className="w-5 h-5 text-blue-600" title="Sedang Berlangsung" />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Pengajar: Budi Santoso</p>
                                <p className="text-sm text-gray-600">Status: Sedang Berlangsung</p>
                                <div className="mt-2">
                                    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                                        <div className="bg-blue-600 h-full w-3/4 rounded-full"></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Progres: 75%</p>
                                </div>
                                <button
                                    onClick={() => navigate('/kursus/gitar-pemula')}
                                    className="mt-2 text-sm text-blue-600 hover:underline"
                                    aria-label="Lihat detail kursus gitar pemula"
                                    title="Lihat detail"
                                >
                                    Lihat Detail
                                </button>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-base font-semibold text-gray-800">Kursus Vokal Dasar</h4>
                                    <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600" title="Selesai" />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Pengajar: Siti Aminah</p>
                                <p className="text-sm text-gray-600">Status: Selesai</p>
                                <div className="mt-2">
                                    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                                        <div className="bg-blue-600 h-full w-full rounded-full"></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Progres: 100%</p>
                                </div>
                                <button
                                    onClick={() => navigate('/kursus/vokal-dasar')}
                                    className="mt-2 text-sm text-blue-600 hover:underline"
                                    aria-label="Lihat detail kursus vokal dasar"
                                    title="Lihat detail"
                                >
                                    Lihat Detail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    );
};

export default AkunPage;