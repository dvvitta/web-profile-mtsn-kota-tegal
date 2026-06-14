// import { Link } from 'react-router-dom';
// import useUIStore from '../store/IUStore';
// import Profil from '../pages/Profil';




// const Navbar = () => {
//     // cast to any to avoid 'unknown' store return type issues
//     const { isMobileMenuOpen, toggleMobileMenu } = useUIStore() as any;

//     return (
//         <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
//             <Link to="/" className="font-bold text-green-800 text-xl">
//                 MTsN Kota Tegal
//             </Link>

//             {/* Desktop Menu */}
//             <ul className="hidden md:flex space-x-6 text-sm font-medium">
//                 <li><Link to="/" className="text-green-700 hover:text-green-900">Beranda</Link></li>
//                 <li><Link to="/Profil" className="hover:text-green-700">Profil</Link></li>
//                 <li><Link to="/akademik" className="hover:text-green-700">Akademik</Link></li>
//                 <li><Link to="/berita" className="hover:text-green-700">Berita</Link></li>
//             </ul>

//             {/* Actions */}
//             <div className="hidden md:flex items-center space-x-4">
//                 <button className="text-gray-500">🔍</button>
//                 <button className="bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800">
//                     Daftar Sekarang
//                 </button>
//             </div>

//             {/* Mobile Toggle Button */}
//             <button className="md:hidden text-2xl" onClick={toggleMobileMenu}>
//                 {isMobileMenuOpen ? '✕' : '☰'}
//             </button>
//         </nav>
//     );
// };

// export default Navbar;