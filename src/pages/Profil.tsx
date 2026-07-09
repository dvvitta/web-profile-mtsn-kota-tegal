import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api'; // Sesuaikan path ini dengan project Anda

// --- Tipe Data ---
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

// function stripHtmlTags(str: string) {
//     if (!str) return '';
//     return str.replace(/<[^>]*>?/gm, '');
// }

// --- Komponen Utama ---
const Profil: React.FC = () => {
    // State untuk Berita
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loadingBerita, setLoadingBerita] = useState(true);

    // Fetch API
    useEffect(() => {
        const fetchBerita = async () => {
            try {
                setLoadingBerita(true);
                const res = await api.get('/berita');
                const allBerita: Berita[] = res.data?.data ?? [];
                const published = allBerita.filter((item) => item.published);

                // Opsional: Urutkan dari yang terbaru
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

    // Membagi data berita untuk berbagai seksi di desain
    const slideArtikel = berita[0]; // 1 Artikel terbaru untuk Slide
    const latestArtikel = berita.slice(1, 4); // 3 Artikel untuk List Latest
    const artikelUnggulan = berita[4] || berita[0]; // 1 Artikel untuk Widget Unggulan
    const janganLewatkan = berita.slice(0, 3); // 3 Artikel untuk seksi bawah

    return (
        <div className="min-h-screen bg-[#f4f5f7] font-sans pb-12">

            {/* Navigasi Placeholder (Menyesuaikan dengan layout global web Anda) */}


            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2 py-10">
                    Profil Madrasah
                </h1>
            </div>

            {/* Konten Utama & Sidebar */}
            <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Kolom Kiri: Teks Sambutan */}
                <section className="lg:col-span-2 bg-white p-8 shadow-sm border border-gray-200">

                    {/* Foto Kepala Sekolah */}
                    <div className="flex justify-center mb-8 ">
                        <div className="p-2 border border-gray-200 bg-gray-50 rounded shadow-sm inline-block">
                            <img
                                src="/gedung.jpg"
                                alt="Sekolah"
                                className="w-150 h-auto object-cover rounded"
                            />
                        </div>
                    </div>

                    {/* Isi Sambutan */}

                    <div className="space-y-10 text-lg text-gray-700 leading-relaxed text-justify px-0 lg:px-8">
                        <p>
                            MTs Negeri Kota Tegal merupakan lembaga pendidikan jenjang Madrasah Tsanawiyah negeri unggulan yang berlokasi strategis di Jalan Pendidikan, Kelurahan Pesurungan Lor, Kecamatan Margadana, Kota Tegal. Berdiri sejak 19 Juli 1993 sebagai MTsN Filial Slawi, madrasah ini mengalami perkembangan pesat hingga resmi menjadi MTsN Margadana pada tahun 1995 dan akhirnya menyandang nama MTs Negeri Kota Tegal pada tahun 2017 berdasarkan KMA 211 Tahun 2015. Dengan status akreditasi A dan perolehan skor 97, madrasah ini berkomitmen penuh mewujudkan visi "Menjadi Madrasah Unggul, Berprestasi dan Terpercaya"
                        </p>
                        
                        </div>


                    <hr className="my-8 border-gray-200" />

                    {/* Bagian Visi & Misi */}
                    <div className="space-y-6">
                        <div className="text-center bg-green-50 p-6 rounded-xl border border-green-100">
                            <h2 className="text-2xl font-bold text-green-800 mb-3">VISI</h2>
                            <p className="text-lg font-semibold text-gray-700 italic">
                                "Menjadi Madrasah Berakhlak Mulia"
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-800 mb-4 text-center lg:text-left">MISI MADRASAH</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Misi 1 */}
                                <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-2xs hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-green-700 mb-1">1. Islam</h3>
                                    <p className="text-sm text-gray-600">Mewujudkan warga madrasah yang berkepribadian Islami.</p>
                                </div>
                                {/* Misi 2 */}
                                <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-2xs hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-green-700 mb-1">2. Kreatif</h3>
                                    <p className="text-sm text-gray-600">Mewujudkan warga madrasah yang kreatif, inovatif, dan aplikatif dalam penguasaan ilmu pengetahuan dan teknologi.</p>
                                </div>
                                {/* Misi 3 */}
                                <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-2xs hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-green-700 mb-1">3. Hidupkan Potensi</h3>
                                    <p className="text-sm text-gray-600">Menghidupkan seluruh potensi warga madrasah untuk meraih prestasi terbaik di bidang akademik dan atau non-akademik ke tingkat nasional.</p>
                                </div>
                                {/* Misi 4 */}
                                <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-2xs hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-green-700 mb-1">4. Lintas Instansi</h3>
                                    <p className="text-sm text-gray-600">Membangun sinergi antar instansi untuk kemajuan madrasah.</p>
                                </div>
                                {/* Misi 5 */}
                                <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-2xs hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-green-700 mb-1">5. Akuntabel</h3>
                                    <p className="text-sm text-gray-600">Akuntabel dalam pelayanan pendidikan terhadap warga madrasah dan masyarakat yang terwujud dalam sistem informasi yang mudah diakses.</p>
                                </div>
                                {/* Misi 6 */}
                                <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-2xs hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-green-700 mb-1">6. Prioritas</h3>
                                    <p className="text-sm text-gray-600">Mewujudkan madrasah yang dapat menjadi prioritas utama masyarakat.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Kolom Kanan: Sidebar Dinamis */}
                <aside className="space-y-6">

                    {/* Widget Tab Artikel (Latest) */}
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
                                                {item.kategori?.nama || 'KEGIATAN'}
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
                                        className="w-full h-32 bg-gray-300 flex items-end p-3 relative overflow-hidden bg-cover bg-center rounded"
                                        style={{ backgroundImage: `url(${slideArtikel.thumbnail || fallbackImage(slideArtikel.id)})` }}
                                    >
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
                            ) : null}
                        </div>
                    </div>

                    {/* Widget Artikel Unggulan */}
                    <div className="bg-white border border-gray-200 shadow-sm">
                        <div className="bg-teal-700 text-white px-4 py-2 font-bold text-sm">
                            Artikel Unggulan
                        </div>
                        <div className="p-4">
                            {loadingBerita ? (
                                <div className="w-full h-16 bg-gray-200 animate-pulse rounded" />
                            ) : artikelUnggulan ? (
                                <Link to={`/berita/${artikelUnggulan.slug}`} className="flex gap-3 items-center group">
                                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                                        <img
                                            src={artikelUnggulan.thumbnail || fallbackImage(artikelUnggulan.id)}
                                            alt={artikelUnggulan.judul}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-[10px] bg-teal-600 text-white px-1.5 py-0.5 rounded uppercase font-medium tracking-wide">
                                            SISWA
                                        </span>
                                        <p className="text-sm font-semibold mt-1.5 leading-tight text-gray-800 group-hover:text-teal-700 transition-colors line-clamp-2">
                                            {artikelUnggulan.judul}
                                        </p>
                                    </div>
                                </Link>
                            ) : null}
                        </div>
                    </div>

                </aside>
            </main>

            {/* Seksi Bawah: Jangan Lewatkan */}
            <section className="max-w-7xl mx-auto px-4 mt-12 mb-8">
                {/* Header Section */}
                <div className="relative mb-6">
                    <div className="bg-teal-700 text-white text-sm font-bold px-4 py-2 inline-block relative z-10 clip-path-slant pr-8">
                        Jangan Lewatkan
                    </div>
                    {/* Garis horizontal pembatas */}
                    <div className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-700 z-0 border-t border-teal-700 top-1/2"></div>
                </div>

                {/* Grid Artikel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {loadingBerita ? (
                        [1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-md"></div>)
                    ) : janganLewatkan.length > 0 ? (
                        janganLewatkan.map((item) => (
                            <Link to={`/berita/${item.slug}`} key={item.id} className="group relative rounded-md overflow-hidden h-48 block shadow-sm border border-gray-200">
                                <img
                                    src={item.thumbnail || fallbackImage(item.id)}
                                    alt={item.judul}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                                    <span className="text-[10px] font-bold bg-teal-500 px-1.5 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                                        {item.kategori?.nama || 'BERITA'}
                                    </span>
                                    <h3 className="font-bold text-sm leading-snug group-hover:text-teal-300 transition-colors line-clamp-2">
                                        {item.judul}
                                    </h3>
                                    <p className="text-xs text-gray-300 mt-2 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {formatTanggal(item.createdAt)}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">Tidak ada artikel.</p>
                    )}
                </div>
            </section>

        </div>
    );
};

export default Profil;