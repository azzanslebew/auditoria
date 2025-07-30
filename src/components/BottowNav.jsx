import React from 'react';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Beranda', icon: 'mdi:home-outline', path: '/' },
  { label: 'Riwayat', icon: 'mdi:history', path: '/peserta/riwayat' },
  { label: 'Favorit', icon: 'mdi:heart-outline', path: '/peserta/favorit' },
  { label: 'Akun', icon: 'mdi:account-circle-outline', path: '/peserta/akun' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white text-white border-t border-black/10 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center text-xs font-medium transition-all"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full mb-1 transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-md shadow-purple-500/30'
                    : 'text-black'
                  }`}
              >
                <Icon icon={item.icon} className="text-xl" />
              </div>
              <span className={isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : 'text-black'}>
                {item.label}
              </span>            </button>
          );
        })}
      </div>
    </nav>
  );
}
