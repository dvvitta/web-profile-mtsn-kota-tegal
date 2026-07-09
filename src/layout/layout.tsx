import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import Footer from './Footer';
import { useUIStore } from '../store/IUStore';
import logoMadrasah from '../assets/logo.png';

const Layout = () => {
    // cast to any to avoid 'unknown' store return type issues
    const { isMobileMenuOpen, toggleMobileMenu } = useUIStore() as any;

    // Fungsi pembantu agar menu tertutup otomatis saat link di versi mobile diklik
    const handleMobileLinkClick = () => {
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    };


    // Fungsi untuk mengatur gaya NavLink agar berubah saat halaman sedang aktif
    const [isAkademikOpen, setIsAkademikOpen] = useState(false);
    const toggleDropdown = () => setIsAkademikOpen(!isAkademikOpen);

    const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
        `transition-colors duration-300 font-medium ${isActive
            ? "text-green-700 border-b-2 border-green-700 pb-1"
            : "text-gray-600 hover:text-green-700"
        }`;

    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        // Jika ada timeout yang berjalan (akan menutup), batalkan
        if (timeoutId) clearTimeout(timeoutId);
        setIsAkademikOpen(true);
    };

    const handleMouseLeave = () => {
        // Berikan jeda 300ms sebelum menutup menu
        const id = setTimeout(() => {
            setIsAkademikOpen(false);
        }, 300);
        setTimeoutId(id);
    };

    return (
        <div className="font-sans text-gray-800 min-h-screen flex flex-col relative">

            {/* --- Bagian Navbar --- */}
            <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50 transition-all duration-300">

                {/* Logo */}
                <Link to="/" className="font-bold text-green-800 text-xl tracking-wide hover:opacity-80 transition-opacity">
                    <img src={logoMadrasah} alt="Logo" className="h-10 w-auto" />
                </Link>

                {/* Desktop Menu (Menggunakan NavLink untuk indikator aktif) */}
                <ul className="hidden md:flex space-x-8 text-sm items-center">
                    <li><NavLink to="/" className={navLinkStyle} end>BERANDA</NavLink></li>


                    {/* Dropdown Akademik */}
                    {/* Desktop Menu */}
                    <li
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            onClick={toggleDropdown}
                            className={`transition-colors duration-300 font-medium flex items-center gap-1 ${isAkademikOpen ? "text-green-700" : "text-gray-600 hover:text-green-700"
                                }`}
                        >
                            MADRASAH
                            <span className={`text-[10px] transition-transform duration-300 ${isAkademikOpen ? 'rotate-180' : ''}`}></span>
                        </button>

                        {isAkademikOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50">
                                <NavLink to="/Profil" onClick={() => setIsAkademikOpen(false)} className="block px-4 py-2 hover:bg-green-50 text-gray-700">PROFIL MADRASAH</NavLink>
                                <NavLink to="/SambutanKepalaSekolah" onClick={() => setIsAkademikOpen(false)} className="block px-4 py-2 hover:bg-green-50 text-gray-700">KEPALA MADRASAH</NavLink>
                                <NavLink to="/DewanGurudankaryawan" onClick={() => setIsAkademikOpen(false)} className="block px-4 py-2 hover:bg-green-50 text-gray-700">DEWAN GURU DAN KARYAWAN</NavLink>
                            </div>
                        )}
                    </li>
                    <li><NavLink to="/akademik" className={navLinkStyle}>AKADEMIK</NavLink></li>
                    <li><NavLink to="/Kontak" className={navLinkStyle}>KONTAK</NavLink></li>
                </ul>

                {/* Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Search Button dengan efek hover membulat */}
                    

                    {/* CTA Button dengan efek taktil (membesar saat di-hover, mengecil saat diklik) */}
                    {/* <button className="bg-green-700 text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-green-800 hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200">
                        <NavLink to="/LoginPage">Masuk</NavLink>

                    </button> */}
                </div>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden text-2xl text-green-800 p-2 focus:outline-none hover:bg-green-50 rounded-lg transition-colors"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            </nav>

            {/* --- Mobile Menu Dropdown (Muncul hanya di HP saat state true) --- */}
            <div
                className={`md:hidden fixed top-18 left-0 w-full bg-white shadow-lg border-t border-gray-100 z-40 transform transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col px-8 py-6 space-y-6 text-center">
                    <NavLink to="/" onClick={handleMobileLinkClick} className={navLinkStyle} end>BERANDA</NavLink>
                    {/* Mobile Menu Dropdown */}
                    <div className={`md:hidden fixed top-18 left-0 w-full bg-white ...`}>
                        <div className="flex flex-col px-8 py-6 space-y-4 text-center">
                            <NavLink to="/" onClick={handleMobileLinkClick} className={navLinkStyle} end>BERANDA</NavLink>

                            {/* Dropdown Mobile */}
                            <div className="flex flex-col">
                                <button onClick={toggleDropdown} className="text-gray-600 font-medium py-2">MADRASAH</button>
                                {isAkademikOpen && (
                                    <div className="bg-gray-50 py-2 rounded-lg my-1">
                                        <NavLink to="/Profil" onClick={handleMobileLinkClick} className="block py-2 text-sm text-gray-600">PROFIL MADRASAH</NavLink>
                                        <NavLink to="/SambutanKepalaSekolah" onClick={handleMobileLinkClick} className="block py-2 text-sm text-gray-600">KEPALA MADRASAH</NavLink>
                                        <NavLink to="/DewanGurudankaryawan" onClick={handleMobileLinkClick} className="block py-2 text-sm text-gray-600">DEWAN GURU DAN KARYAWAN</NavLink>
                                    </div>
                                )}
                            </div>

                            <NavLink to="/Akademik" onClick={handleMobileLinkClick} className={navLinkStyle}>AKADEMIK</NavLink>
                            {/* ... sisa menu lainnya */}
                        </div>
                    </div>
                    <NavLink to="/Akademik" onClick={handleMobileLinkClick} className={navLinkStyle}>AKADEMIK</NavLink>
                    <NavLink to="/berita" onClick={handleMobileLinkClick} className={navLinkStyle}>BERITA</NavLink>

                    <hr className="border-gray-100" />

                    <button className="bg-green-700 text-white px-4 py-3 rounded-md text-sm font-semibold hover:bg-green-800 active:scale-95 transition-all">
                        Daftar Sekarang
                    </button>
                </div>
            </div>
            {/* --- Akhir bagian Navbar --- */}

            <main className="grow flex flex-col">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;