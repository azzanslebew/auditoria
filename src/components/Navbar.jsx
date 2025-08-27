import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import logoAuditoria from '/assets/logo/logo_auditoria.png'; // Sesuaikan path dengan struktur proyek Senpai

const Navbar = ({ onMobileSidebarToggle }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [role, setRole] = useState(null); // null, 'learner', 'teacher', 'serviceProvider'
    const [isRegister, setIsRegister] = useState(false); // Untuk beralih antara login dan daftar
    const navigate = useNavigate();

    const handleLoginClick = () => {
        setIsPopupOpen(true);
        setRole(null);
        setIsRegister(false);
    };

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setRole(null);
        setIsRegister(false);
    };

    const handleLoginSubmit = () => {
        if (role === 'learner' && !isRegister) {
            navigate('/peserta/akun');
            handleClosePopup();
        }
    };

    return (
        <nav className="bg-blue-800 text-white p-4 font-exo fixed top-0 left-0 right-0 z-50">
            {/* Desktop Layout */}
            <div className="hidden md:flex max-w-6xl mx-auto justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={logoAuditoria} alt="Auditoria Logo" className="h-10 w-auto object-contain max-w-[150px]" />
                </div>

                {/* Desktop Search Bar */}
                <div className="flex-1 mx-4">
                    <div className="relative w-full max-w-xl mx-auto">
                        <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Coba cari Kursus"
                            className="w-full py-2.5 pl-10 pr-16 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                            ENTER ↵
                        </span>
                    </div>
                </div>

                {/* Desktop Right Section */}
                <div className="flex items-center space-x-4">
                    {/* Cart Icon */}
                    <div className="p-2">
                        <Icon icon="mdi:cart-outline" className="w-6 h-6 text-white" />
                    </div>

                    {/* Divider */}
                    <div className="h-8 w-px bg-white"></div>

                    {/* Login Button */}
                    <button
                        onClick={handleLoginClick}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-md text-white font-semibold transition-colors"
                    >
                        Masuk
                    </button>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden max-w-6xl mx-auto">
                {/* Top Row - Hamburger, Logo, Cart & Login */}
                <div className="flex justify-between items-center mb-3">
                    {/* Left Side - Hamburger + Logo */}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={onMobileSidebarToggle}
                            className="p-2"
                        >
                            <Icon icon="mdi:menu" className="w-6 h-6 text-white" />
                        </button>
                        <img src={logoAuditoria} alt="Auditoria Logo" className="h-8 w-auto object-contain max-w-[120px]" />
                    </div>

                    {/* Right Side - Cart + Login */}
                    <div className="flex items-center space-x-2">
                        <button className="p-2">
                            <Icon icon="mdi:cart-outline" className="w-6 h-6 text-white" />
                        </button>
                        <button
                            onClick={handleLoginClick}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-md text-white font-semibold transition-colors text-sm"
                        >
                            Masuk
                        </button>
                    </div>
                </div>

                {/* Bottom Row - Search Bar */}
                <div className="relative">
                    <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Coba cari Kursus"
                        className="w-full py-2.5 pl-10 pr-4 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
            </div>

            {isPopupOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-[100] p-4 overflow-y-auto mt-16 text-black"
                    onClick={handleClosePopup}
                >
                    <div
                        className="bg-white rounded-lg shadow-xl w-full max-w-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl relative my-8 min-h-fit"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxHeight: 'calc(100vh - 64px)',
                            marginTop: '80px'
                        }}
                    >
                        {/* Content dengan scroll internal */}
                        <div className="p-4 sm:p-6 lg:p-8 max-h-full overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold text-black flex items-center gap-2">
                                    <span role="img" aria-label="welcome">👋</span> Welcome
                                </h2>
                                <button onClick={handleClosePopup} className="text-gray-500 hover:text-gray-700">
                                    <Icon icon="mdi:close" className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Role Selection */}
                            {!role && (
                                <div className="mb-4 sm:mb-6">
                                    <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">Pilih peran Anda:</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                                        <button
                                            onClick={() => handleRoleSelect('learner')}
                                            className="w-full py-2.5 px-3 sm:px-4 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm sm:text-base font-medium"
                                        >
                                            Peserta
                                        </button>
                                        <button
                                            onClick={() => handleRoleSelect('teacher')}
                                            className="w-full py-2.5 px-3 sm:px-4 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors text-sm sm:text-base font-medium"
                                        >
                                            Pengajar
                                        </button>
                                        <button
                                            onClick={() => handleRoleSelect('serviceProvider')}
                                            className="w-full py-2.5 px-3 sm:px-4 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm sm:text-base font-medium"
                                        >
                                            Penyedia Jasa
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Login/Register Form */}
                            {role && (
                                <div className="space-y-4">
                                    {/* Form fields dalam grid untuk desktop */}
                                    <div className={`grid ${isRegister ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-4`}>
                                        <div>
                                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                                                {isRegister ? 'Nama Lengkap' : 'Email'}
                                            </label>
                                            <input
                                                type={isRegister ? 'text' : 'email'}
                                                placeholder={isRegister ? 'Nama Lengkap Anda' : 'example@gmail.com'}
                                                className="w-full py-2.5 px-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            />
                                        </div>

                                        {isRegister && (
                                            <div>
                                                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    placeholder="example@gmail.com"
                                                    className="w-full py-2.5 px-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Password fields */}
                                    <div className={`grid ${isRegister ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-4`}>
                                        <div>
                                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Password</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full py-2.5 px-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            />
                                        </div>

                                        {isRegister && (
                                            <div>
                                                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="w-full py-2.5 px-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Spesialisasi field untuk teacher/serviceProvider */}
                                    {(role === 'teacher' || role === 'serviceProvider') && isRegister && (
                                        <div>
                                            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Spesialisasi</label>
                                            <input
                                                type="text"
                                                placeholder={role === 'teacher' ? 'Misal: Gitar, Vokal' : 'Misal: Mixing, Sewa Piano'}
                                                className="w-full py-2.5 px-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            />
                                        </div>
                                    )}

                                    {/* Action buttons */}
                                    <div className="space-y-3 pt-2">
                                        <button
                                            onClick={handleLoginSubmit}
                                            className="w-full bg-blue-600 text-white py-2.5 text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            {isRegister ? 'Daftar' : 'Masuk'}
                                        </button>
                                        <button className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 text-sm sm:text-base rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 font-medium">
                                            <Icon icon="flat-color-icons:google" className="w-5 h-5" />
                                            Continue with Google
                                        </button>
                                        <p className="text-center text-xs sm:text-sm text-gray-500">
                                            {isRegister
                                                ? 'Sudah punya akun? '
                                                : 'Belum punya akun? '}
                                            <button
                                                onClick={() => setIsRegister(!isRegister)}
                                                className="text-blue-600 hover:underline font-medium"
                                            >
                                                {isRegister ? 'Masuk' : 'Daftar'}
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;