import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/layout';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Akademik from './pages/Akademik';
import Kontak from './pages/Kontak';
import AdminBeritaPage from './pages/Admin';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import BeritaDetail from './pages/DetailBerita';
import BeritaList from './pages/AllBerita';
import SambutanKepalaSekolah from './pages/KepalaSekolah';
import DewanGurudankaryawan from './pages/DewanGuru';
import PersonDetail from './pages/PersonDetail';
import GuruManager from './pages/GuruManager'; // Pastikan path ini sesuai dengan lokasi file GuruManager.tsx

// Konfigurasi routing
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout HANYA membungkus halaman di dalam children ini
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'profil',
        element: <Profil />,
      },
      {
        path: 'SambutanKepalaSekolah',
        element: <SambutanKepalaSekolah />,
      },
      {
        path: 'Akademik',
        element: <Akademik />,
      },
      {
        path: 'Kontak',
        element: <Kontak />,
      },
      {
        path: 'berita/:slug',
        element: <BeritaDetail />
      },
      {
        path: 'AllBerita',
        element: <BeritaList />
      },
      {
        path: 'guru/:id',
        element: <PersonDetail jenis="guru" />
      },
      {
        path: 'karyawan/:id',
        element: <PersonDetail jenis="karyawan" />
      },
      {
        path: 'DewanGurudankaryawan',
        element: <DewanGurudankaryawan />
      },
      {
        path: 'Berita',
        element: <BeritaList />
      }
    ],
  },
  // ==========================================
  // HALAMAN TANPA LAYOUT DITULIS DI SINI
  // ==========================================
  {
    path: '/LoginPage', // Tambahkan '/' di awal karena sekarang ada di root level
    element: <LoginPage />,
  },
  {
    path: '/RegisterPage', // Biasanya Register juga tidak menggunakan Layout utama
    element: <RegisterPage />,
  },
  {
    path: '/AdminBeritaPage', // Saya asumsikan halaman Admin juga memiliki layout tersendiri nantinya
    element: <AdminBeritaPage />
  },
  {
    path: '/GuruManager',
    element: <GuruManager token={''} />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;