import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const CategoryNavbar = ({ isMobileSidebarOpen, setIsMobileSidebarOpen }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
        if (activeDropdown !== categoryId) {
            setSelectedSubcategory(null);
        }
    };

    const handleSubcategoryClick = (subcategoryName) => {
        setSelectedSubcategory(subcategoryName === selectedSubcategory ? null : subcategoryName);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileSidebarOpen && !event.target.closest('.mobile-sidebar') && !event.target.closest('.hamburger-btn')) {
                setIsMobileSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileSidebarOpen, setIsMobileSidebarOpen]);

    useEffect(() => {
        document.body.style.overflow = (isMobileSidebarOpen || activeDropdown) ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileSidebarOpen, activeDropdown]);

    const categories = [
        {
            id: 'kategori',
            name: 'Kategori',
            icon: 'mdi:view-grid',
            subcategories: [
                {
                    name: 'Kursus Musik',
                    labelPopular: 'Kursus Terpopuler',
                    labelQuality: 'Kursus Berkualitas',
                    items: [
                        { name: 'Vokal Pop', icon: '🎤', popular: true },
                        { name: 'Vokal Rock', icon: '🎸', popular: true },
                        { name: 'Piano', icon: '🎹', popular: true },
                        { name: 'Gitar', icon: '🎸', popular: true },
                        { name: 'Vokal Jazz', icon: '🎵' },
                        { name: 'Drum', icon: '🥁' },
                    ]
                },
                {
                    name: 'Jasa Pembuatan Lagu',
                    labelPopular: 'Jasa Favorit',
                    labelQuality: 'Jasa Profesional',
                    items: [
                        { name: 'Komposisi Lagu', icon: '🎼', popular: true },
                        { name: 'Aransemen', icon: '🎵', popular: true },
                        { name: 'Lirik Writing', icon: '✍️' },
                        { name: 'Mixing & Mastering', icon: '🎚️' },
                        { name: 'Recording', icon: '🎙️' },
                        { name: 'Produksi Beat', icon: '🎛️' }
                    ]
                },
                {
                    name: 'Sewa Alat Musik',
                    labelPopular: 'Alat Paling Disewa',
                    labelQuality: 'Alat Berkualitas',
                    items: [
                        { name: 'Sewa Piano', icon: '🎹', popular: true },
                        { name: 'Sewa Gitar', icon: '🎸', popular: true },
                        { name: 'Sewa Drum', icon: '🥁' },
                        { name: 'Sewa Bass', icon: '🎸' },
                        { name: 'Sewa Violin', icon: '🎻' },
                        { name: 'Sewa Saxophone', icon: '🎷' }
                    ]
                },
            ]
        }
    ];

    const menuItems = [
        'Instruktur Terbaik',
        'Kursus Online',
        'Sertifikat',
        'Paket Belajar',
    ];

    const MobileCategoryContent = () => (
        <div className="p-4 pb-20"> {/* Padding-bottom untuk BottomNav */}
            {categories[0].subcategories.map((subcat, index) => (
                <div key={index} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{subcat.name}</h3>
                    <div className="space-y-2">
                        {subcat.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm ${item.popular
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                            : 'bg-gradient-to-r from-green-500 to-blue-500'
                                        }`}
                                >
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                                    <p className="text-xs text-gray-500">
                                        {item.popular ? subcat.labelPopular : subcat.labelQuality}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="border-t pt-4 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Menu Lainnya</h3>
                <div className="space-y-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className="w-full text-left p-2 hover:bg-gray-50 rounded text-gray-700 font-medium"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="font-exo fixed top-16 left-0 right-0 z-50">
            <div className="hidden md:block bg-blue-800 text-white px-6 py-3">
                <div className="max-w-6xl mx-auto flex items-center space-x-8">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
                        >
                            <Icon icon={category.icon} className="w-5 h-5" />
                            <span className="font-medium">{category.name}</span>
                        </button>
                    ))}

                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className="hover:text-blue-200 transition-colors font-medium"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`md:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out mobile-sidebar ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 bg-blue-800 text-white">
                    <h2 className="text-lg font-semibold">Menu Kategori</h2>
                    <button onClick={() => setIsMobileSidebarOpen(false)}>
                        <Icon icon="mdi:close" className="w-6 h-6" />
                    </button>
                </div>
                <div className="overflow-y-auto h-full pb-20">
                    <MobileCategoryContent />
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Desktop Dropdown Menu */}
            {activeDropdown === 'kategori' && (
                <div className="hidden md:block absolute top-full left-0 w-full bg-white shadow-lg z-50 border-t">
                    <div className="max-w-6xl mx-auto flex" style={{ maxHeight: '70vh' }}>
                        {/* Sidebar Kiri (Tab Subkategori) */}
                        <div className="w-1/4 pr-6 py-6">
                            {categories[0].subcategories.map((subcat, index) => (
                                <div key={index} className="mb-4">
                                    <button
                                        className={`flex items-center justify-between w-full text-left py-2 px-3 rounded ${selectedSubcategory === subcat.name
                                            ? 'bg-gray-100 text-blue-600'
                                            : 'hover:bg-gray-50 text-gray-800'
                                            }`}
                                        onClick={() => handleSubcategoryClick(subcat.name)}
                                    >
                                        <span>{subcat.name}</span>
                                        <Icon icon="mdi:chevron-right" className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Konten Kanan (Scroll hanya di sini) */}
                        <div className="flex-1 pl-6 py-6 pr-4 border-l overflow-y-auto">
                            {(() => {
                                const subcat = categories[0].subcategories.find(
                                    (s) => s.name === selectedSubcategory
                                ) || categories[0].subcategories[0];

                                return (
                                    <>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                            {subcat.name}
                                        </h3>

                                        {/* Popular */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            {subcat.items
                                                .filter((item) => item.popular)
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                                    >
                                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-lg">
                                                            {item.icon}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                                                            <p className="text-sm text-gray-500">{subcat.labelPopular}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>

                                        {/* Berkualitas */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {subcat.items
                                                .filter((item) => !item.popular)
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                                    >
                                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-lg">
                                                            {item.icon}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                                                            <p className="text-sm text-gray-500">{subcat.labelQuality}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>

                                        <div className="mt-6">
                                            <button className="w-full py-3 px-4 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors border border-blue-200">
                                                Lihat Semua {subcat.name} →
                                            </button>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Overlay */}
            {activeDropdown && (
                <div
                    className="hidden md:block fixed inset-0 bg-black bg-opacity-20 z-40"
                    onClick={() => setActiveDropdown(null)}
                />
            )}
        </div>
    );
};

export default CategoryNavbar;