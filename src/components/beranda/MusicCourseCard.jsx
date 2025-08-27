import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const MusicCourseCards = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef(null);
    const popupRef = useRef(null);
    const navigate = useNavigate();

    const courseData = [
        {
            id: 1,
            title: "Kursus Musik",
            description:
                "Pilihan kursus vokal dan alat musik untuk mengembangkan bakat bermusik Anda",
            image: "/assets/images/kursus_musik.jpg",
            category: "Music Course",
            buttonText: "Lihat Semua",
        },
        {
            id: 2,
            title: "Jasa Pembuatan Lagu",
            description:
                "Layanan profesional untuk mewujudkan ide musik Anda menjadi karya nyata",
            image: "/assets/images/jasa_pembuatan_lagu.jpg",
            category: "Music Production",
            buttonText: "Lihat Semua",
        },
        {
            id: 3,
            title: "Sewa Alat Musik",
            description:
                "Solusi lengkap penyewaan beragam alat musik untuk keperluan Anda",
            image: "/assets/images/sewa_alat_musik.jpg",
            category: "Musical Instrument Rental",
            buttonText: "Lihat Semua",
        },
    ];

    // 🔹 Update dots sesuai scroll
    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const width = scrollRef.current.clientWidth;
            const index = Math.round(scrollLeft / width);
            setActiveIndex(index);
        }
    };

    // 🔹 Klik dots buat pindah card
    const scrollToIndex = (index) => {
        if (scrollRef.current) {
            const width = scrollRef.current.clientWidth;
            scrollRef.current.scrollTo({
                left: width * index,
                behavior: "smooth",
            });
            setActiveIndex(index);
        }
    };

    // Close popup ketika klik di luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setShowPopup(false);
            }
        };
        if (showPopup) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showPopup]);

    return (
        <div className="relative w-full overflow-hidden font-exo mt-20">
            {/* Background */}
            <div
                className="lg:block absolute inset-0"
                style={{
                    backgroundImage: `url('assets/images/background_beranda.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    clipPath: "polygon(0 0, 100% 0, 85% 100%, 100%)",
                    zIndex: 0,
                }}
            />
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
            </div>

            {/* Cards */}
            <div className="relative max-w-6xl mx-auto px-4 py-16 z-10">
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="
            flex space-x-4 overflow-x-auto snap-x snap-mandatory pb-6
            sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-x-0 sm:overflow-visible
          "
                >
                    {courseData.map((course) => (
                        <div
                            key={course.id}
                            className="min-w-full sm:min-w-0 snap-center group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
                        >
                            <div className="relative h-48 sm:h-56 overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
                                        {course.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 sm:p-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors duration-300">
                                    {course.title}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4 sm:mb-6">
                                    {course.description}
                                </p>

                                <button
                                    onClick={() => {
                                        if (course.id === 1) {
                                            setShowPopup(true);
                                        } else if (course.id === 2) {
                                            navigate("/peserta/jasa-buat-lagu");
                                        } else if (course.id === 3) {
                                            navigate("/peserta/sewa-alat-musik");
                                        }
                                    }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 sm:py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
                                >
                                    {course.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🔹 Dots Navigation */}
                <div className="flex justify-center mt-4 sm:hidden">
                    {courseData.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => scrollToIndex(index)}
                            className={`mx-1 w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${activeIndex === index
                                    ? "bg-blue-600 scale-125"
                                    : "bg-white hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
                    <div
                        ref={popupRef}
                        className="relative bg-white text-slate-900 max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-300"
                    >
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
                        >
                            <Icon icon="mdi:close" className="text-lg" />
                        </button>

                        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
                            Pilih Jenis Kursus
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div
                                onClick={() => navigate("/peserta/alatmusik")}
                                className="cursor-pointer bg-gray-100 hover:bg-blue-100 border border-gray-300 rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-lg"
                            >
                                <img
                                    src="/assets/images/alat_musik.jpg"
                                    alt="Kursus Alat Musik"
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-3 text-center">
                                    <p className="text-slate-800 font-semibold">
                                        Kursus Alat Musik
                                    </p>
                                </div>
                            </div>
                            <div
                                onClick={() => navigate("/peserta/vokal")}
                                className="cursor-pointer bg-gray-100 hover:bg-purple-100 border border-gray-300 rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-lg"
                            >
                                <img
                                    src="/assets/images/vokal.jpg"
                                    alt="Kursus Vokal"
                                    className="w-full h-32 object-cover"
                                />
                                <div className="p-3 text-center">
                                    <p className="text-slate-800 font-semibold">Kursus Vokal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicCourseCards;
