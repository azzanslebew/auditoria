import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BerandaPage from '../pages/BerandaPage';
import RiwayatPage from '../pages/peserta/RiwayatPage';
import FavoritPage from '../pages/peserta/FavoritPage';
import AkunPage from '../pages/peserta/AkunPage';
import KursusAlatMusik from '../pages/peserta/KursusAlatMusikPage';
import KursusVokal from '../pages/peserta/KursusVokalPage';
import OfflinePage from '../pages/peserta/OfflinePage';
import OnlinePage from '../pages/peserta/OnlinePage';
import SewaAlatMusikPage from '../pages/peserta/SewaAlatMusikPage';
import DetailSewaPage from '../pages/peserta/DetailSewaPage';
import JasaBuatLaguPage from '../pages/peserta/JasaBuatLaguPage';
import DetailBuatLaguPage from '../pages/peserta/DetailBuatLaguPage';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BerandaPage />} />
                <Route path="/peserta/riwayat" element={<RiwayatPage />} />
                <Route path="/peserta/favorit" element={<FavoritPage />} />
                <Route path="/peserta/akun" element={<AkunPage />} />
                <Route path="/peserta/alatmusik" element={<KursusAlatMusik />} />
                <Route path="/peserta/vokal" element={<KursusVokal />} />
                <Route path="/kursus/offline/:instrument" element={<OfflinePage />} />
                <Route path="/kursus/online/:instrument" element={<OnlinePage />} />
                <Route path="/kursus/offline/:vocal" element={<OfflinePage />} />
                <Route path="/kursus/online/:vocal" element={<OnlinePage />} />
                <Route path="/peserta/sewa-alat-musik" element={<SewaAlatMusikPage />} />
                <Route path="/sewa/:instrument/:providerId" element={<DetailSewaPage />} />
                <Route path="/peserta/jasa-buat-lagu" element={<JasaBuatLaguPage />} />
                <Route path="/jasa-buat-lagu/:service/:providerId" element={<DetailBuatLaguPage />} />
                <Route path="/kursus/offline/confirm" element={<div>Halaman Konfirmasi Lokasi</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;