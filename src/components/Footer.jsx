import React from 'react';
import { Icon } from '@iconify/react';

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white font-exo">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Auditoria</h2>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            Platform kursus musik modern. Tingkatkan skill vokal, alat musik, dan produksi musik dari para ahli industri kreatif.
          </p>

          {/* Social Media */}
          <div className="flex items-center gap-3 mt-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              <Icon icon="mdi:instagram" className="text-xl text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              <Icon icon="ic:baseline-tiktok" className="text-xl text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              <Icon icon="mdi:youtube" className="text-xl text-white" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><a href="#kursus" className="hover:text-white transition">Kursus Populer</a></li>
            <li><a href="#mengapa" className="hover:text-white transition">Mengapa Auditoria</a></li>
            <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
            <li><a href="#kontak" className="hover:text-white transition">Hubungi Kami</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Kontak</h3>
          <ul className="text-sm space-y-2 text-white/80">
            <li className="flex items-center gap-2">
              <Icon icon="mdi:email-outline" className="text-lg" />
              support@auditoria.com
            </li>
            <li className="flex items-center gap-2">
              <Icon icon="mdi:phone-outline" className="text-lg" />
              +62 812-3456-7890
            </li>
            <li className="flex items-center gap-2">
              <Icon icon="mdi:map-marker-outline" className="text-lg" />
              Kudus, Indonesia
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-6 text-center text-white/50 text-xs">
        © {new Date().getFullYear()} Auditoria. All rights reserved.
      </div>
    </footer>
  );
}
