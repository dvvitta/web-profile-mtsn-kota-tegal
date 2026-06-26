import { Outlet, Link, NavLink } from 'react-router-dom';
import Footer from './Footer';
import useUIStore from '../store/IUStore';

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
    const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
        `transition-colors duration-300 font-medium ${isActive
            ? "text-green-700 border-b-2 border-green-700 pb-1"
            : "text-gray-600 hover:text-green-700"
        }`;

    return (
        <div className="font-sans text-gray-800 min-h-screen flex flex-col relative">

            {/* --- Bagian Navbar --- */}
            <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50 transition-all duration-300">

                {/* Logo */}
                <Link to="/" className="font-bold text-green-800 text-xl tracking-wide hover:opacity-80 transition-opacity">
                    MTsN Kota Tegal
                </Link>

                {/* Desktop Menu (Menggunakan NavLink untuk indikator aktif) */}
                <ul className="hidden md:flex space-x-8 text-sm">
                    <li><NavLink to="/" className={navLinkStyle} end>Beranda</NavLink></li>
                    <li><NavLink to="/profil" className={navLinkStyle}>Profil</NavLink></li>
                    <li><NavLink to="/Akademik" className={navLinkStyle}>Akademik</NavLink></li>
                    <li><NavLink to="/Kontak" className={navLinkStyle}>Kontak</NavLink></li>
                </ul>

                {/* Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Search Button dengan efek hover membulat */}
                    <button className="text-gray-500 hover:bg-gray-100 hover:text-green-700 p-2 rounded-full transition-all duration-200">
                        🔍
                    </button>

                    {/* CTA Button dengan efek taktil (membesar saat di-hover, mengecil saat diklik) */}
                    <button className="bg-green-700 text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-green-800 hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200">
                        <NavLink to="/Admin">Daftar Sekarang</NavLink>

                    </button>
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
                    <NavLink to="/" onClick={handleMobileLinkClick} className={navLinkStyle} end>Beranda</NavLink>
                    <NavLink to="/profil" onClick={handleMobileLinkClick} className={navLinkStyle}>Profil</NavLink>
                    <NavLink to="/Akademik" onClick={handleMobileLinkClick} className={navLinkStyle}>Akademik</NavLink>
                    <NavLink to="/berita" onClick={handleMobileLinkClick} className={navLinkStyle}>Berita</NavLink>

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