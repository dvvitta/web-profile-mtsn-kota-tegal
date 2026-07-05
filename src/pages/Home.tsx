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
        month: 'short',
        year: 'numeric',
    });
}

function fallbackImage(id: number) {
    return `https://picsum.photos/800/600?random=${id}`;
}

const Home = () => {
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loadingBerita, setLoadingBerita] = useState(true);
    const [errorBerita, setErrorBerita] = useState<string | null>(null);

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                setLoadingBerita(true);
                setErrorBerita(null);

                // Backend membungkus hasil dalam { success, data }
                const res = await api.get('/berita');
                const allBerita: Berita[] = res.data?.data ?? [];

                // Field yang benar adalah `published` (boolean), bukan `status`
                const published = allBerita.filter((item) => item.published);

                setBerita(published);
            } catch (error) {
                console.error(error);
                setErrorBerita('Gagal memuat berita. Coba muat ulang halaman.');
            } finally {
                setLoadingBerita(false);
            }
        };

        fetchBerita();
    }, []);

    const unggulan = berita.slice(0, 3);
    const utama = berita[0];
    const sampingan = berita.slice(1, 4);

    return (
        <div className="w-full font-sans text-gray-800">

            {/* HERO SECTION */}
            <section className="relative h-[78vh] flex items-center bg-emerald-950 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{ backgroundImage: "url('src/assets/header1.png')" }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-t from-emerald-950 via-emerald-950/80 to-emerald-950/40 z-10"></div>

                <div className="relative z-20 px-8 md:px-20 max-w-4xl text-white">
                    
                    <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
                        Membangun Generasi<br />Amanah &amp; Berprestasi
                    </h1>
                    
                    <p className="mb-10 text-emerald-100/90 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
                        Selamat datang di MTsN Kota Tegal. Kami berkomitmen menyelenggarakan pendidikan Islam yang berkualitas, modern, dan berwawasan global.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <button className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-3.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/20">
                            Daftar Sekarang
                        <Link to="https://docs.google.com/forms/d/e/1FAIpQLSca4d7YFeugR0_YkOEORy0EP86jstJy5O5fpv94s_fyxVQRmg/viewform" className="absolute inset-0"></Link>
                    </button>
                    
                    </div>
                </div>
            </section>

            {/* SAMBUTAN & STATISTIK SECTION */}
            <section className="px-6 md:px-20 py-20 bg-gray-50 flex justify-center -mt-16 relative z-30">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-0 shadow-xl shadow-gray-200/60 rounded-2xl overflow-hidden bg-white">

                    <div className="lg:col-span-2 p-10 md:p-14 flex flex-col md:flex-row gap-8 items-start">
                        <img
                            src="src/assets/1_Dra.Hj.Siti Fasikha, MM (1) copy.jpg"
                            alt="Kepala Madrasah"
                            className="w-36 md:w-36 object-cover rounded-xl shadow-md shrink-0"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-emerald-900 mb-4 tracking-tight">Sambutan Kepala Madrasah</h2>
                            <p className="text-gray-500 mb-6 leading-relaxed text-sm">
                                "Assalamu'alaikum Warahmatullahi Wabarakatuh. Puji syukur kita panjatkan kehadirat Allah SWT. Di era digital ini, MTsN Kota Tegal terus berinovasi untuk mencetak lulusan yang tidak hanya cerdas secara akademik, namun juga memiliki akhlakul karimah yang kokoh."
                            </p>
                            <div>
                                <p className="font-bold text-gray-900">Dra. Hj. Siti Fasikha, MM</p>
                                <p className="text-sm text-gray-400">Kepala MTsN Kota Tegal</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-900 p-10 md:p-14 text-white flex flex-col justify-center gap-8">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-white/10 rounded-xl text-xl">👥</div>
                            <div>
                                <h3 className="text-3xl font-bold tracking-tight">1.200+</h3>
                                <p className="text-emerald-200/80 text-sm">Siswa Aktif</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-white/10 rounded-xl text-xl">🎓</div>
                            <div>
                                <h3 className="text-3xl font-bold tracking-tight">85</h3>
                                <p className="text-emerald-200/80 text-sm">Tenaga Pendidik</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-white/10 rounded-xl text-xl">🏆</div>
                            <div>
                                <h3 className="text-3xl font-bold tracking-tight">100+</h3>
                                <p className="text-emerald-200/80 text-sm">Prestasi Tahunan</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* PRESTASI / BERITA UNGGULAN SECTION */}
            <section className="px-6 md:px-20 py-20 bg-white">
                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                        <div>
                            <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Sorotan</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">Berita Unggulan</h2>
                        </div>
                        <Link to="/berita" className="text-emerald-700 font-semibold hover:text-emerald-900 flex items-center gap-2 transition-colors">
                            Lihat Semua <span>→</span>
                        </Link>
                    </div>

                    {loadingBerita ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                                    <div className="h-48 bg-gray-100" />
                                    <div className="p-6 space-y-3">
                                        <div className="h-3 w-20 bg-gray-100 rounded" />
                                        <div className="h-4 w-full bg-gray-100 rounded" />
                                        <div className="h-3 w-3/4 bg-gray-100 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : errorBerita ? (
                        <p className="text-center text-red-500 text-sm">{errorBerita}</p>
                    ) : unggulan.length === 0 ? (
                        <p className="text-center text-gray-400 text-sm">Belum ada berita tersedia.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {unggulan.map((item) => (
                                <Link
                                    to={`/berita/${item.slug}`}
                                    key={item.id}
                                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
                                >
                                    <div className="h-48 bg-gray-100 overflow-hidden">
                                        <img
                                            src={item.thumbnail || fallbackImage(item.id)}
                                            alt={item.judul}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
                                            {item.kategori?.nama}
                                        </span>
                                        <h3 className="font-bold text-lg mt-2 mb-3 text-gray-900 leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2">
                                            {item.judul}
                                        </h3>
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                            {item.ringkasan || item.isi}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* BERITA & ARTIKEL TERBARU */}
            <section className="px-6 md:px-20 py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-14">
                        <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Update Terkini</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">
                            Berita &amp; Artikel Terbaru
                        </h2>
                    </div>

                    {loadingBerita ? (
                        <div className="text-center text-gray-400 text-sm">Memuat berita...</div>
                    ) : errorBerita ? (
                        <div className="text-center text-red-500 text-sm">{errorBerita}</div>
                    ) : berita.length === 0 ? (
                        <div className="text-center text-gray-400 text-sm">Belum ada berita tersedia.</div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Berita Utama */}
                            {utama && (
                                <Link
                                    to={`/berita/${utama.slug}`}
                                    className="relative rounded-2xl overflow-hidden h-[450px] group cursor-pointer shadow-sm block"
                                >
                                    <img
                                        src={utama.thumbnail || fallbackImage(utama.id)}
                                        alt={utama.judul}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                                        <span className="bg-emerald-500 text-emerald-950 px-3 py-1 text-xs font-bold rounded-full">
                                            {utama.kategori?.nama || 'BERITA'}
                                        </span>
                                        <h3 className="text-2xl font-bold mt-4 mb-3 leading-tight">
                                            {utama.judul}
                                        </h3>
                                        <p className="text-sm text-gray-300 line-clamp-2">
                                            {utama.ringkasan || utama.isi}
                                        </p>
                                    </div>
                                </Link>
                            )}

                            {/* List Berita */}
                            <div className="flex flex-col gap-4">
                                {sampingan.map((item) => (
                                    <Link
                                        to={`/berita/${item.slug}`}
                                        key={item.id}
                                        className="flex gap-5 group cursor-pointer bg-white p-3 rounded-2xl border border-gray-100 hover:border-emerald-100 hover:shadow-md transition-all"
                                    >
                                        <div className="w-36 h-28 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                                            <img
                                                src={item.thumbnail || fallbackImage(item.id)}
                                                alt={item.judul}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="flex flex-col justify-center py-1">
                                            <span className="text-xs text-emerald-700 font-bold mb-1.5">
                                                {formatTanggal(item.createdAt)}
                                            </span>
                                            <h4 className="font-bold text-gray-900 leading-snug mb-1.5 group-hover:text-emerald-800 transition-colors line-clamp-2">
                                                {item.judul}
                                            </h4>
                                            <p className="text-sm text-gray-400 line-clamp-2">
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

            {/* CALL TO ACTION SECTION */}
        

        </div>
    );
};

export default Home;