import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api'; // Pastikan path ini sesuai dengan struktur folder Anda

// --- Tipe Data ---
interface ContactDetail {
    label: string;
    value: string | React.ReactNode;
}

interface Kategori {
    id: number;
    nama: string;
    slug: string;
}

interface Berita {
    id: number;
    judul: string;
    slug: string;
    ringkasan: string | null;
    thumbnail: string | null;
    isi: string;
    published: boolean;
    createdAt: string;
    kategori: Kategori;
}

// --- Fungsi Utilitas ---
function formatTanggal(dateString: string) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function fallbackImage(id: number) {
    return `https://picsum.photos/400/300?random=${id}`;
}

// --- Komponen Baris Tabel ---
const TableRow: React.FC<{ data: ContactDetail }> = ({ data }) => (
    <tr className="border-b border-gray-200">
        <td className="py-2 px-4 w-1/3 text-sm text-gray-700 bg-white border-r border-gray-200">
            {data.label}
        </td>
        <td className="py-2 px-4 text-sm text-gray-700 bg-white">
            : {data.value}
        </td>
    </tr>
);

// --- Komponen Utama ---
const HubungiKami: React.FC = () => {
    // State untuk Berita
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loadingBerita, setLoadingBerita] = useState(true);

    // Fetch API (Sama seperti di halaman Home)
    useEffect(() => {
        const fetchBerita = async () => {
            try {
                setLoadingBerita(true);
                const res = await api.get('/berita');
                const allBerita: Berita[] = res.data?.data ?? [];
                const published = allBerita.filter((item) => item.published);

                // Urutkan berdasarkan tanggal terbaru jika dari API belum terurut (Opsional)
                // published.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                setBerita(published);
            } catch (error) {
                console.error("Gagal memuat berita:", error);
            } finally {
                setLoadingBerita(false);
            }
        };

        fetchBerita();
    }, []);

    // Membagi data berita untuk desain sidebar
    const slideArtikel = berita[0]; // 1 Artikel terbaru untuk Slide
    const latestArtikel = berita.slice(1, 4); // 3 Artikel berikutnya untuk List

    // Data Statis Kontak
    const contactData: ContactDetail[] = [
        { label: 'Nama', value: ' MTs Negeri Kota Tegal' },
        { label: 'NPSN', value: <span className="text-teal-600 font-medium">20364865</span> },
        { label: 'Alamat', value: 'JL. PENDIDIKAN' },
        { label: 'Desa/Kelurahan', value: 'PESURUNGANLOR' },
        { label: 'Kecamatan/Kota (LN)', value: 'KEC. MARGADANA' },
        { label: 'Kab.-Kota/Negara (LN)', value: 'KOTA TEGAL' },
        { label: 'Propinsi/Luar Negeri (LN)', value: 'PROV. JAWA TENGAH' },
        { label: 'Status Madrasah', value: 'NEGERI' },
        { label: 'Status Akreditasi', value: 'A' },
        { label: 'Skor Akreditasi', value: '97' },
        { label: 'Tahun Berdiri', value: '19 JULI 1993' },
        { label: 'Fax/Telepon', value: '(0283) 325352' },
        { label: 'Email', value: 'mts_margadana@yahoo.co.id' },
        {
            label: 'Website',
            value: <a href="http://www.mtsnkotategal.sch.id" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">http://www.mtsnkotategal.sch.id</a>
        },
    ];

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* Navigasi Placeholder */}
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2 py-10">
                    Kontak Kami
                </h1>
            </div>

            {/* Konten Utama */}
            <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Kolom Kiri: Tabel Kontak */}
                <section className="lg:col-span-2">
                    <div className="bg-white p-6 shadow-sm border border-gray-200">
                        <table className="w-full text-left border-collapse border border-gray-200 mb-8">
                            <tbody>
                                {contactData.map((item, index) => (
                                    <TableRow key={index} data={item} />
                                ))}

                                {/* Baris Khusus untuk Maps */}
                                <tr className="border-b border-gray-200">
                                    <td colSpan={2} className="py-4 px-4 text-sm text-gray-700">
                                        <p className="mb-2 font-semibold">Maps / Lokasi</p>
                                        <div className="w-full grow min-h-80 bg-gray-200 rounded-xl overflow-hidden shadow-inner relative">
                                            {/* Ganti dengan iframe Google Maps asli */}
                                            <iframe
                                                /* Pastikan src menggunakan link Embed dari Google Maps yang valid */
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d362.41478090064174!2d109.11352755513828!3d-6.86870755580938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb75ec713c965%3A0xebeabf230ed0e788!2sMTsN%20Margadana!5e0!3m2!1sen!2sid!4v1783499990144!5m2!1sen!2sid"
                                                className="absolute top-0 left-0"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Kolom Kanan: Sidebar dengan Data Dinamis */}
                <aside className="space-y-6">

                    {/* Widget Tab Artikel */}
                    <div className="bg-white border border-gray-200 shadow-sm p-4">
                        <div className="flex text-sm border-b border-gray-200 mb-4">
                            <button className="px-3 py-2 font-bold border-b-2 border-teal-600 text-teal-700">Latest</button>
                        
                        </div>

                        <ul className="space-y-4">
                            {loadingBerita ? (
                                <p className="text-sm text-gray-500 text-center py-4 animate-pulse">Memuat artikel...</p>
                            ) : latestArtikel.length > 0 ? (
                                latestArtikel.map((item) => (
                                    <li key={item.id} className="flex gap-3 items-center group">
                                        <Link to={`/berita/${item.slug}`} className="shrink-0">
                                            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                                <img
                                                    src={item.thumbnail || fallbackImage(item.id)}
                                                    alt={item.judul}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                        </Link>
                                        <div>
                                            <span className="text-[10px] bg-teal-600 text-white px-1.5 py-0.5 rounded uppercase font-medium tracking-wide">
                                                {item.kategori?.nama || 'UMUM'}
                                            </span>
                                            <Link to={`/berita/${item.slug}`}>
                                                <p className="text-sm font-semibold mt-1.5 leading-tight text-gray-800 group-hover:text-teal-700 transition-colors line-clamp-2">
                                                    {item.judul}
                                                </p>
                                            </Link>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">Belum ada artikel.</p>
                            )}
                        </ul>
                    </div>

                    {/* Widget Slide Artikel */}
                    <div className="bg-white border border-gray-200 shadow-sm">
                        <div className="bg-teal-700 text-white px-4 py-2 font-bold text-sm">
                            Slide Artikel
                        </div>
                        <div className="p-4">
                            {loadingBerita ? (
                                <div className="w-full h-32 bg-gray-200 animate-pulse rounded" />
                            ) : slideArtikel ? (
                                <Link to={`/berita/${slideArtikel.slug}`} className="block group">
                                    <div
                                        className="w-full h-32 bg-gray-300 flex items-end p-3 relative overflow-hidden bg-cover bg-center"
                                        style={{ backgroundImage: `url(${slideArtikel.thumbnail || fallbackImage(slideArtikel.id)})` }}
                                    >
                                        {/* Overlay gradient agar teks mudah dibaca */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all"></div>

                                        <div className="relative z-10 text-white">
                                            <h3 className="font-bold text-sm leading-tight line-clamp-2 group-hover:text-teal-300 transition-colors">
                                                {slideArtikel.judul}
                                            </h3>
                                            <p className="text-[10px] mt-1.5 text-gray-300">
                                                {formatTanggal(slideArtikel.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                                    <span className="text-xs text-gray-400">Tidak ada sorotan</span>
                                </div>
                            )}
                        </div>
                    </div>

                </aside>
            </main>
        </div>
    );
};

export default HubungiKami;