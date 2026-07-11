import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import Footer from './Footer';
import { useUIStore } from '../store/IUStore';
import logoMadrasah from '../assets/logo.png';

const Layout = () => {
    // Mengambil state toggle menu mobile dari store global Anda
    const { isMobileMenuOpen, toggleMobileMenu } = useUIStore() as any;

    // State untuk mengontrol dropdown menu "MADRASAH"
    const [isMadrasahOpen, setIsMadrasahOpen] = useState(false);
    const toggleDropdown = () => setIsMadrasahOpen(!isMadrasahOpen);

    // Fungsi pembantu agar menu mobile otomatis tertutup saat salah satu link diklik
    const handleMobileLinkClick = () => {
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    };

    // Style NavLink desktop yang responsif dan estetik saat halaman aktif
    const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
        `transition-colors duration-300 font-semibold text-xs tracking-wider ${isActive
            ? "text-green-700 border-b-2 border-green-700 pb-1"
            : "text-gray-600 hover:text-green-700"
        }`;

    // Logika jeda (delay) hover dropdown khusus untuk pengguna Laptop/Desktop
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsMadrasahOpen(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            setIsMadrasahOpen(false);
        }, 200);
        setTimeoutId(id);
    };

    return (
        <div className="font-sans text-gray-800 min-h-screen flex flex-col relative bg-slate-50/20">

            {/* --- 1. NAVBAR UTAMA (Sudah Dikunci ke Tengah untuk Laptop & HP) --- */}
            <nav className="flex justify-between md:justify-center items-center px-6 md:px-12 py-4 bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300 w-full h-16 border-b border-gray-100 relative">

                {/* Logo Madrasah (Tetap di kiri, dikunci pakai absolute agar tidak mendorong menu tengah) */}
                <Link to="/" onClick={handleMobileLinkClick} className="font-bold text-green-800 hover:opacity-80 transition-opacity flex items-center shrink-0 md:absolute md:left-12">
                    <img src={logoMadrasah} alt="Logo MTsN Tegal" className="h-9 w-auto md:h-10 object-contain" />
                </Link>

                {/* MENU DESKTOP (Sekarang dipaksa berada tepat di TENGAH layar laptop) */}
                <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm mx-auto">
                    <li><NavLink to="/" className={navLinkStyle} end>BERANDA</NavLink></li>

                    {/* Dropdown Menu Desktop */}
                    <li
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            onClick={toggleDropdown}
                            className={`transition-colors duration-300 font-semibold text-xs tracking-wider flex items-center gap-1.5 uppercase ${isMadrasahOpen ? "text-green-700" : "text-gray-600 hover:text-green-700"}`}
                        >
                            MADRASAH
                            <svg className={`w-3 h-3 transition-transform duration-300 ${isMadrasahOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Kotak Dropdown List Desktop */}
                        {isMadrasahOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <NavLink to="/Profil" onClick={() => setIsMadrasahOpen(false)} className="block px-4 py-2 text-xs font-medium hover:bg-green-50 text-gray-700 transition-colors">PROFIL MADRASAH</NavLink>
                                <NavLink to="/SambutanKepalaSekolah" onClick={() => setIsMadrasahOpen(false)} className="block px-4 py-2 text-xs font-medium hover:bg-green-50 text-gray-700 transition-colors">KEPALA MADRASAH</NavLink>
                                <NavLink to="/DewanGurudankaryawan" onClick={() => setIsMadrasahOpen(false)} className="block px-4 py-2 text-xs font-medium hover:bg-green-50 text-gray-700 transition-colors">DEWAN GURU & KARYAWAN</NavLink>
                            </div>
                        )}
                    </li>

                    <li><NavLink to="/Akademik" className={navLinkStyle}>AKADEMIK</NavLink></li>
                    <li><NavLink to="/Kontak" className={navLinkStyle}>KONTAK</NavLink></li>
                </ul>

                {/* TOMBOL TOGGLE MENU MOBILE */}
                <button
                    className="md:hidden text-xl text-green-800 p-2 focus:outline-none hover:bg-green-50 rounded-xl transition-colors shrink-0"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle Menu Mobile"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    )}
                </button>
            </nav>

            {/* --- 2. MENU MOBILE DROPDOWN (Posisinya Tengah / text-center untuk HP) --- */}
            <div
                className={`md:hidden fixed top-16 left-0 w-full bg-white shadow-xl border-t border-gray-100 z-45 transform transition-all duration-300 ease-in-out origin-top max-h-[calc(100vh-4rem)] overflow-y-auto ${
                    isMobileMenuOpen ? "scale-y-100 opacity-100 visible" : "scale-y-0 opacity-0 invisible pointer-events-none"
                }`}
            >
                <div className="flex flex-col px-8 py-6 space-y-4 text-center items-center justify-center">
                    <NavLink to="/" onClick={handleMobileLinkClick} className="w-full text-sm font-bold text-gray-700 hover:text-green-700 py-2 border-b border-gray-50 block">BERANDA</NavLink>

                    {/* Akordion Dropdown Mobile Tengah */}
                    <div className="flex flex-col border-b border-gray-50 pb-2 w-full items-center">
                        <button 
                            onClick={toggleDropdown} 
                            className="text-gray-700 text-sm font-bold py-2 flex items-center justify-center gap-2 w-full text-center"
                        >
                            <span className="pl-4">MADRASAH</span>
                            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isMadrasahOpen ? 'rotate-180 text-green-700' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {isMadrasahOpen && (
                            <div className="w-full bg-slate-50 rounded-xl px-4 py-2 mt-1 flex flex-col space-y-3 border border-slate-100/60 animate-in fade-in duration-200">
                                <NavLink to="/Profil" onClick={handleMobileLinkClick} className="block py-1.5 text-xs font-semibold text-gray-600 hover:text-green-700 text-center">PROFIL MADRASAH</NavLink>
                                <NavLink to="/SambutanKepalaSekolah" onClick={handleMobileLinkClick} className="block py-1.5 text-xs font-semibold text-gray-600 hover:text-green-700 text-center">KEPALA MADRASAH</NavLink>
                                <NavLink to="/DewanGurudankaryawan" onClick={handleMobileLinkClick} className="block py-1.5 text-xs font-semibold text-gray-600 hover:text-green-700 text-center">DEWAN GURU DAN KARYAWAN</NavLink>
                            </div>
                        )}
                    </div>

                    <NavLink to="/Akademik" onClick={handleMobileLinkClick} className="w-full text-sm font-bold text-gray-700 hover:text-green-700 py-2 border-b border-gray-50 block">AKADEMIK</NavLink>
                    <NavLink to="/Kontak" onClick={handleMobileLinkClick} className="w-full text-sm font-bold text-gray-700 hover:text-green-700 py-2 block">KONTAK</NavLink>
                </div>
            </div>

            {/* --- 3. KONTEN UTAMA --- */}
            <main className="grow flex flex-col z-10">
                <Outlet />
            </main>

            {/* --- 4. FOOTER --- */}
            <Footer />
        </div>
    );
};

export default Layout;