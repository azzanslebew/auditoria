import React from 'react';
import { Icon } from '@iconify/react';

const reasons = [
  {
    icon: 'fluent:person-star-24-regular',
    title: 'Pengajar Profesional',
    desc: 'Mentor berpengalaman di bidang musik dan industri kreatif.',
  },
  {
    icon: 'mdi:clock-outline',
    title: 'Fleksibel & Online',
    desc: 'Belajar dari mana saja dan kapan saja tanpa batasan.',
  },
  {
    icon: 'mdi:star-check-outline',
    title: 'Rating 4.9+',
    desc: 'Ribuan pengguna puas dengan layanan Auditoria.',
  },
];

export default function WhyAuditoria() {
  return (
    <div
      className="relative bg-cover bg-center py-20 px-4 sm:px-6 md:px-8 font-exo"
      style={{
        backgroundImage: "url('/assets/images/background_beranda.jpg')",
      }}
    >
      {/* Overlay Blur */}
      <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-md" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto text-white z-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Mengapa Harus{' '}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Auditoria
          </span>
          ?
        </h2>
        <p className="text-white/80 text-base sm:text-lg mb-12">
          Karena kami hadir dengan kualitas dan pengalaman terbaik untuk perkembangan musikmu.
        </p>

        {/* Card Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-purple-500/20 hover:scale-[1.03] transition-all duration-300 group text-center"
            >
              <div className="text-4xl mb-4 transition-transform group-hover:scale-110 text-white">
                <Icon icon={item.icon} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                {item.title}
              </h3>
              <p className="text-sm text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
