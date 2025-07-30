import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const faqs = [
  {
    question: 'Apa itu Auditoria?',
    answer:
      'Auditoria adalah platform kursus musik modern yang menawarkan pelatihan vokal, alat musik, hingga produksi musik, dibimbing oleh para ahli industri.',
  },
  {
    question: 'Apakah kursus bisa diikuti secara online?',
    answer:
      'Bisa! Semua kursus tersedia secara online dan bisa diakses fleksibel dari mana saja dan kapan saja.',
  },
  {
    question: 'Bagaimana sistem pembayarannya?',
    answer:
      'Pembayaran bisa dilakukan melalui transfer bank, e-wallet, dan kartu kredit. Kami menyediakan proses yang cepat dan aman.',
  },
  {
    question: 'Apakah saya bisa memilih pengajar sendiri?',
    answer:
      'Tentu! Kamu bisa memilih pengajar sesuai preferensi dan melihat portofolio serta ulasan mereka terlebih dahulu.',
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 font-exo">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
        Pertanyaan yang{' '}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Sering Ditanyakan
        </span>
      </h2>

      <div className="space-y-6">
        {faqs.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className={`border border-slate-200 rounded-2xl transition-shadow duration-300 overflow-hidden ${isOpen ? 'shadow-md shadow-blue-500/20' : 'hover:shadow-sm'
                }`}
            >
              <button
                onClick={() => toggle(index)}
                className={`w-full text-left flex justify-between items-center px-6 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-300`}
              >
                <span className="font-semibold text-base sm:text-lg">{item.question}</span>
                <Icon
                  icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                  className={`text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`bg-white text-slate-700 px-6 text-sm leading-relaxed transition-all duration-500 ease-in-out ${isOpen ? 'py-5 opacity-100 max-h-96' : 'max-h-0 py-0 opacity-0 overflow-hidden'
                  }`}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
