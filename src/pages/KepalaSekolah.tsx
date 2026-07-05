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

function stripHtmlTags(str: string) {
    if (!str) return '';
    return str.replace(/<[^>]*>?/gm, '');
}

// --- Komponen Utama ---
const SambutanKepalaSekolah: React.FC = () => {
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
                    Sambutan Kepala Sekolah
                </h1>
            </div>

            {/* Konten Utama & Sidebar */}
            <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Kolom Kiri: Teks Sambutan */}
                <section className="lg:col-span-2 bg-white p-8 shadow-sm border border-gray-200">
                    
                    {/* Foto Kepala Sekolah */}
                    <div className="flex justify-center mb-8">
                        <div className="p-2 border border-gray-200 bg-gray-50 rounded shadow-sm inline-block">
                            <img src="/src/assets/1_Dra.Hj.siti Fasikha, MM (1) copy.jpg" alt="Kepala Sekolah" className="w-48 h-60 object-cover rounded" />
                        </div>
                    </div>

                    {/* Isi Sambutan */}
                    <div className="space-y-5 text-sm text-gray-700 leading-relaxed text-justify">
                        <p className="text-center font-bold mb-8">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
                        
                        <p>Puji syukur kita panjatkan ke hadirat Allah SWT atas segala rahmat, hidayah, dan karunia-Nya, sehingga Madrasah Aliyah Negeri (MAN) Kota Tegal dapat terus berdiri tegak, berkembang, dan konsisten memberikan pelayanan pendidikan terbaik bagi peserta didik serta masyarakat luas.</p>
                        
                        <p>Selamat datang di Website Resmi MAN Kota Tegal, wadah informasi dan komunikasi untuk seluruh civitas akademika, alumni, dan masyarakat luas yang ingin mengetahui lebih dekat mengenai profil, program, dan prestasi Madrasah kami.</p>
                        
                        <p>Sebagai lembaga pendidikan Islam, amanah sejarah tersebut kini kami jawab dengan komitmen penuh dalam menghadapi tantangan masa depan, pesatnya ilmu pengetahuan, teknologi, serta derasnya arus globalisasi. Kami senantiasa berupaya menghadirkan proses pembelajaran berkualitas yang mengintegrasikan kecerdasan intelektual, literasi digital, dan penguatan karakter religius demi mewujudkan visi besar kami: Menjadi Madrasah Berakhlak Mulia.</p>

                        <p>Semoga MAN Kota Tegal senantiasa menjadi madrasah yang unggul, berdaya saing, dan tetap menjadi prioritas utama masyarakat dalam melahirkan generasi pemimpin masa depan yang berakhlak mulia serta siap berkarya bagi kemajuan bangsa, negara, dan agama.</p>

                        <p>Akhir kata, semoga website ini dapat memberikan manfaat optimal sebagai media informasi dan publikasi positif bagi MAN Kota Tegal. Mari terus berkarya, berinovasi, dan berprestasi.</p>
                        
                        <div className="text-center pt-8 pb-4">
                            <p className="font-bold mb-6">Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
                            <p>Kepala Madrasah,</p>
                            <br /><br />
                            <p className="font-bold underline mt-8">Dra. Hj. Siti Fasikha, MM</p>
                            <p>NIP. 196704181993032002</p>
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

export default SambutanKepalaSekolah;