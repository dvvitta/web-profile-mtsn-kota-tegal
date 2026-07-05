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
import StrukturOrganisasi from './pages/StrukturOrganisasi';  
import DewanGurudankaryawan from './pages/DewanGUru';

// Konfigurasi routing
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout membungkus semua halaman di children
    children: [
      {
        index: true, // Menandakan ini adalah halaman default ("/")
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
      //halaman baru
      {
        path: 'LoginPage',
        element: <LoginPage />,
      },
      {
        path: 'RegisterPage',
        element: <RegisterPage />,
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
        path: 'StrukturOrganisasi',
        element: <StrukturOrganisasi />
      },
      {
        path: 'DewanGurudankaryawan',
        element: <DewanGurudankaryawan />
      },
      {
        path: 'AdminBeritaPage',
        element: <AdminBeritaPage />
      },
      {
        path: '/Berita',
        element: <BeritaList />
      }
      // Anda bisa menambahkan route lain di sini...
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;