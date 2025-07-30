import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryNavbar from '../components/beranda/CategoryNavbar';
import MusicCourseCards from '../components/beranda/MusicCourseCard';
import PopularCourse from '../components/beranda/PopularCourse';
import WhyAuditoria from '../components/beranda/WhyAuditoria';
import FaqSection from '../components/beranda/FaqSection';
import Footer from '../components/Footer';
import BottomNav from '../components/BottowNav';
import ContactUs from '../components/beranda/ContactUs';

const BerandaPage = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleMobileSidebarToggle = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };
    return (
        <div>
            <Navbar onMobileSidebarToggle={handleMobileSidebarToggle} />
            <CategoryNavbar
                isMobileSidebarOpen={isMobileSidebarOpen}
                setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
            <MusicCourseCards />
            <PopularCourse />
            <WhyAuditoria />
            <FaqSection />
            <ContactUs />
            <Footer />
            <BottomNav />
        </div>
    );
};

export default BerandaPage;