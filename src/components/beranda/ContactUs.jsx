import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        service: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for form submission (e.g., send to API or email) can be added here
        console.log('Form submitted:', formData);
        alert('Pesan Anda telah dikirim! Kami akan segera menghubungi Anda.');
        setFormData({ name: '', email: '', message: '', service: '' });
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-20 font-exo">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
                Hubungi{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Kami
                </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Music Image from Unsplash */}
                <div className="hidden md:block">
                    <img
                        src="https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG11c2ljfGVufDB8fDB8fHww"
                        alt="Musical instruments"
                        className="w-full h-full object-cover rounded-2xl shadow-md shadow-blue-500/20"
                    />
                </div>

                {/* Contact Form */}
                <div className="border border-slate-200 rounded-2xl p-6 shadow-md shadow-blue-500/20 bg-white">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                        Kirim Pesan
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                                Nama
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                placeholder="Masukkan nama Anda"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                placeholder="Masukkan email Anda"
                            />
                        </div>
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-slate-700">
                                Layanan yang Anda Minati
                            </label>
                            <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                            >
                                <option value="" disabled>
                                    Pilih layanan
                                </option>
                                <option value="kursus">Kursus Musik</option>
                                <option value="pembuatan-lagu">Jasa Pembuatan Lagu</option>
                                <option value="sewa-alat">Sewa Alat Musik</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                                Pesan
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full mt-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                                placeholder="Tulis pesan Anda di sini"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
                        >
                            Kirim Pesan
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}