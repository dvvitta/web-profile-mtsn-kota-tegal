import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';

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
    user: { id: number; nama: string };
}

function formatTanggal(dateString: string) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long', 
        year: 'numeric',
    });
}

function fallbackImage(id: number) {
    return `https://picsum.photos/800/600?random=${id}`;
}

// 1. Pindahkan daftar gambar ke luar komponen agar tidak dirender ulang
const backgrounds = [
    'src/assets/background2.png',
    'src/assets/background1.png',
    'src/assets/background3.png',
];

const Home = () => {
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loadingBerita, setLoadingBerita] = useState(true);
    const [errorBerita, setErrorBerita] = useState<string | null>(null);

    // 2. State untuk menyimpan indeks gambar yang sedang tampil
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                setLoadingBerita(true);
                setErrorBerita(null);

                const res = await api.get('/berita');
                const allBerita: Berita[] = res.data?.data ?? [];
                const published = allBerita.filter((item) => item.published);

                setBerita(published);
            } catch (error) {
                console.error(error);
                setErrorBerita('Gagal memuat berita. Mohon muat ulang halaman.');
            } finally {
                setLoadingBerita(false);
            }
        };

        fetchBerita();
    }, []);
    
    // 3. Timer otomatis untuk mengganti slide (contoh: setiap 5 detik)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
        }, 5000); 

        // Bersihkan interval saat komponen dilepas untuk mencegah memory leak
        return () => clearInterval(interval);
    }, []); // Dependency dikosongkan karena backgrounds sudah ada di luar komponen
    
    const unggulan = berita.slice(0, 3);
    const utama = berita[0];
    const sampingan = berita.slice(1, 4);

    return (
        <div className="w-full font-sans text-gray-800 bg-white selection:bg-emerald-200 selection:text-emerald-900">

            {/* HERO SECTION */}
            {/* RETURN GANDA DIHAPUS DARI SINI */}
            <section className="relative h-[85vh] min-h-150 flex items-center bg-emerald-950 overflow-hidden">
                
                {/* 4. Looping array gambar untuk membuat efek sliding */}
                {backgrounds.map((bg, index) => (
                    <div
                        key={index}
                        // Transisi durasi 1000ms (1 detik) agar pergeseran mulus
                        className="absolute inset-0 z-0 transition-transform duration-1000 ease-in-out"
                        style={{ 
                            // Menggeser posisi div: 0% (tengah), 100% (kanan), -100% (kiri)
                            transform: `translateX(${(index - currentIndex) * 100}%)` 
                        }}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105 animate-pulse-slow"
                            style={{ backgroundImage: `url('${bg}')` }}
                        ></div>
                    </div>
                ))}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-black/30 z-10"></div>

                {/* Konten Hero */}
                <div className="relative z-20 px-6 md:px-20 max-w-5xl text-white w-full mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-800/50 border border-emerald-500/30 text-emerald-100 text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-sm">
                        Madrasah Tsanawiyah Negeri Kota Tegal
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
                        Mewujudkan Generasi <br />
                        <span className="text-emerald-400">Qur'ani & Berprestasi</span>
                    </h1>
                    
                    <p className="mb-10 text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed font-light drop-shadow-md">
                        Mendedikasikan diri pada pendidikan Islam yang holistik. Memadukan keluhuran akhlak, kedalaman spiritual, dan keunggulan sains demi mencetak kader peradaban masa depan.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Link 
                            to="https://docs.google.com/forms/d/e/1FAIpQLSca4d7YFeugR0_YkOEORy0EP86jstJy5O5fpv94s_fyxVQRmg/viewform"
                            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-emerald-950 bg-emerald-500 rounded-full overflow-hidden transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                        >
                            <span>Daftar Sekarang</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SAMBUTAN & STATISTIK SECTION */}
            <section className="px-6 md:px-20 py-28 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-12 bg-emerald-600"></div>
                        <span className="text-sm font-bold tracking-widest text-emerald-700 uppercase">
                            Muqaddimah Kepala Madrasah
                        </span>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                        Ilmu Pengetahuan sebagai <br/> Pelita Kehidupan & Peradaban
                    </h2>
                    
                    <div className="relative">
                        <svg className="absolute -top-4 -left-6 w-12 h-12 text-emerald-100 -z-10" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p className="text-gray-600 text-lg leading-relaxed italic z-10 relative">
                            "Assalamu'alaikum Warahmatullahi Wabarakatuh. Segala puji bagi Allah SWT. Di era disrupsi digital ini, MTsN Kota Tegal terus bermetamorfosis menjadi institusi pendidikan terdepan. Kami tidak hanya menempa kecerdasan intelektual, namun juga menanamkan akar spiritual yang kuat agar setiap siswa tumbuh menjadi insan kamil yang berprestasi dan berakhlakul karimah."
                        </p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex items-center gap-4">
                        <div>
                            <p className="font-serif text-2xl font-medium text-emerald-900">Dra. Hj. Siti Fasikha, MM</p>
                            <p className="text-sm font-semibold text-emerald-600 tracking-wide mt-1">KEPALA MTSN KOTA TEGAL</p>
                        </div>
                    </div>
                </div>
                
                {/* Kolase Foto Bergaya Grid/Masonry Aesthetic */}
                <div className="flex-1 grid grid-cols-2 gap-4 relative">
                    {/* Hiasan background kotak */}
                    <div className="absolute -inset-4 bg-emerald-50 rounded-3xl -z-10 transform rotate-3"></div>
                    
                    <div className="col-span-1 rounded-2xl overflow-hidden shadow-xl shadow-emerald-900/10 h-[420px]">
                        <img
                            src="src/assets/1_Dra.Hj.Siti Fasikha, MM.jpg"
                            alt="Kepala Madrasah"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="col-span-1 flex flex-col gap-4">
                        <div className="rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 h-[200px]">
                            <img
                                src="src/assets/background2.png"
                                alt="Kegiatan Religius Siswa"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 h-[204px]">
                            <img
                                src="src/assets/background3.png"
                                alt="Kelas Interaktif"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* PRESTASI / BERITA UNGGULAN SECTION */}
            <section className="px-6 md:px-20 py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                        <div>
                            <span className="text-sm font-bold tracking-widest text-emerald-600 uppercase flex items-center gap-2">
                                <span className="w-8 h-px bg-emerald-600"></span>
                                Sorotan Utama
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">Kabar Madrasah</h2>
                        </div>
                        <Link 
                            to="/berita" 
                            className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:text-emerald-700 hover:border-emerald-200 hover:shadow-sm transition-all"
                        >
                            Lihat Semua Kabar 
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </Link>
                    </div>

                    {loadingBerita ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="rounded-3xl border border-gray-100 bg-white overflow-hidden animate-pulse">
                                    <div className="h-56 bg-gray-200" />
                                    <div className="p-6 space-y-4">
                                        <div className="h-4 w-24 bg-gray-200 rounded-full" />
                                        <div className="h-6 w-full bg-gray-200 rounded-md" />
                                        <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : errorBerita ? (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center border border-red-100">{errorBerita}</div>
                    ) : unggulan.length === 0 ? (
                        <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-200 rounded-2xl">Belum ada publikasi berita saat ini.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {unggulan.map((item) => (
                                <Link
                                    to={`/berita/${item.slug}`}
                                    key={item.id}
                                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-emerald-200 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="relative h-56 bg-gray-100 overflow-hidden">
                                        <img
                                            src={item.thumbnail || fallbackImage(item.id)}
                                            alt={item.judul}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm text-emerald-800 px-3 py-1 text-xs font-bold rounded-full shadow-sm">
                                                {item.kategori?.nama || 'Berita'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <span className="text-xs text-gray-500 font-medium mb-3 flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            {formatTanggal(item.createdAt)}
                                        </span>
                                        <h3 className="font-bold text-xl mb-3 text-gray-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                                            {item.judul}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                                            {item.ringkasan || item.isi}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-emerald-600 text-sm font-semibold group-hover:text-emerald-700">
                                            Baca Selengkapnya
                                            <svg className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* BERITA & ARTIKEL TERBARU */}
            <section className="px-6 md:px-20 py-24 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold tracking-widest text-emerald-600 uppercase">Pusat Informasi</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
                            Artikel & Edukasi Terbaru
                        </h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
                    </div>

                    {loadingBerita ? (
                        <div className="text-center text-gray-400">Mengambil data terbaru...</div>
                    ) : errorBerita ? (
                        <div className="text-center text-red-500">{errorBerita}</div>
                    ) : berita.length === 0 ? (
                        <div className="text-center text-gray-500">Belum ada informasi terbaru.</div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            {/* Berita Utama (Kiri - Porsi Lebih Besar) */}
                            {utama && (
                                <Link
                                    to={`/berita/${utama.slug}`}
                                    className="lg:col-span-7 relative rounded-3xl overflow-hidden h-[500px] group cursor-pointer shadow-lg block"
                                >
                                    <img
                                        src={utama.thumbnail || fallbackImage(utama.id)}
                                        alt={utama.judul}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 p-8 md:p-10 text-white w-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                                                {utama.kategori?.nama || 'Edukasi'}
                                            </span>
                                            <span className="text-sm text-gray-300 font-medium">
                                                {formatTanggal(utama.createdAt)}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold mb-4 leading-tight group-hover:text-emerald-300 transition-colors">
                                            {utama.judul}
                                        </h3>
                                        <p className="text-base text-gray-200 line-clamp-2 w-11/12">
                                            {utama.ringkasan || utama.isi}
                                        </p>
                                    </div>
                                </Link>
                            )}

                            {/* List Berita (Kanan) */}
                            <div className="lg:col-span-5 flex flex-col gap-5">
                                {sampingan.map((item) => (
                                    <Link
                                        to={`/berita/${item.slug}`}
                                        key={item.id}
                                        className="flex gap-5 group cursor-pointer bg-white p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
                                    >
                                        <div className="w-32 h-32 md:w-40 md:h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0 relative">
                                            <img
                                                src={item.thumbnail || fallbackImage(item.id)}
                                                alt={item.judul}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="flex flex-col justify-center py-1 flex-1">
                                            <span className="text-xs text-emerald-600 font-semibold mb-2 uppercase tracking-wide">
                                                {formatTanggal(item.createdAt)}
                                            </span>
                                            <h4 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                                                {item.judul}
                                            </h4>
                                            <p className="text-sm text-gray-500 line-clamp-2">
                                                {item.ringkasan || item.isi}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                        </div>
                    )}
                </div>
            </section>

        </div>
    );
};

export default Home;