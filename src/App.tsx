import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/layout';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Akademik from './pages/Akademik';
import Kontak from './pages/Kontak';

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
        path: 'Akademik',
        element: <Akademik />,
      },
      {
        path: 'Kontak',
        element: <Kontak />,
      },
      // Anda bisa menambahkan route lain di sini...
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;