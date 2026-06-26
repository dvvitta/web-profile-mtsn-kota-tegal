import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';

interface Berita {
    prestasi: string;
    id: number;
    title: string;
    content: string;
    author: string;
    imageUrl: string | null;
    status: string;
    createdAt: string;
}

const Home = () => {
    // 1. PINDAHKAN useState KE DALAM KOMPONEN
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loadingBerita, setLoadingBerita] = useState(true);

    useEffect(() => {
        // 2. PINDAHKAN fungsi fetch ke dalam useEffect (Best Practice)
        const fetchBerita = async () => {
            try {
                setLoadingBerita(true);

                const res = await api.get('/berita');

                // hanya tampilkan yang published
                const published = res.data.filter(
                    (item: Berita) => item.status === 'published'
                );

                setBerita(published);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingBerita(false);
            }
        };

        fetchBerita();
    }, []);

    return (
        <div className="w-full font-sans text-gray-800">

            {/* HERO SECTION */}
            <section className="relative h-[85vh] flex items-center bg-green-900 overflow-hidden">
                {/* Background Image Placeholder & Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop')" }}
                ></div>
                <div className="absolute inset-0 bg-green-900/70 z-10"></div>

                <div className="relative z-20 px-8 md:px-20 max-w-4xl text-white">
                    <span className="bg-green-100 text-green-800 font-bold px-3 py-1 text-xs tracking-wider rounded mb-6 inline-block">
                        TERAKREDITASI A
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                        Membangun Generasi<br />Amanah & Berprestasi
                    </h1>
                    <p className="mb-10 text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed">
                        Selamat datang di MTsN Kota Tegal. Kami berkomitmen menyelenggarakan pendidikan Islam yang berkualitas, modern, dan berwawasan global.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-green-700 hover:bg-green-600 px-8 py-3 rounded text-sm font-semibold transition-colors">
                            Jelajahi Profil
                        </button>
                        <button className="border border-white hover:bg-white/10 px-8 py-3 rounded text-sm font-semibold transition-colors">
                            Lihat Fasilitas
                        </button>
                    </div>
                </div>
            </section>

            {/* SAMBUTAN & STATISTIK SECTION */}
            <section className="px-8 md:px-20 py-16 bg-gray-50 flex justify-center">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 shadow-lg rounded-xl overflow-hidden bg-white">

                    {/* Kolom Sambutan (Kiri) */}
                    <div className="lg:col-span-2 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
                        <img
                            src="https://via.placeholder.com/150x200"
                            alt="Kepala Madrasah"
                            className="w-32 md:w-40 object-cover rounded shadow-sm shrink-0"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-green-900 mb-4">Sambutan Kepala Madrasah</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                                "Assalamu'alaikum Warahmatullahi Wabarakatuh. Puji syukur kita panjatkan kehadirat Allah SWT. Di era digital ini, MTsN Kota Tegal terus berinovasi untuk mencetak lulusan yang tidak hanya cerdas secara akademik, namun juga memiliki akhlakul karimah yang kokoh."
                            </p>
                            <div>
                                <p className="font-bold text-gray-800">Drs. H. Miftahuddin, M.Ag.</p>
                                <p className="text-sm text-gray-500">Kepala MTsN Kota Tegal</p>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Statistik (Kanan) */}
                    <div className="bg-green-800 p-8 md:p-12 text-white flex flex-col justify-center space-y-8">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-green-700 rounded-lg">👥</div>
                            <div>
                                <h3 className="text-3xl font-bold">1.200+</h3>
                                <p className="text-green-100 text-sm">Siswa Aktif</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-green-700 rounded-lg">🎓</div>
                            <div>
                                <h3 className="text-3xl font-bold">85</h3>
                                <p className="text-green-100 text-sm">Tenaga Pendidik</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-green-700 rounded-lg">🏆</div>
                            <div>
                                <h3 className="text-3xl font-bold">150+</h3>
                                <p className="text-green-100 text-sm">Prestasi Tahunan</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* PRESTASI UNGGULAN SECTION */}
            <section className="px-8 md:px-20 py-20 bg-blue-50/50">
                <div className="max-w-7xl mx-auto">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-green-900 mb-2">Prestasi Unggulan</h2>
                            <p className="text-gray-600">Dedikasi siswa dan guru dalam meraih kecemerlangan.</p>
                        </div>
                        <Link to="/prestasi" className="text-green-700 font-semibold hover:text-green-900 flex items-center gap-2">
                            Lihat Semua <span>→</span>
                        </Link>
                    </div>

                    {/* Grid 3 Kolom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Card 1 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="h-48 bg-gray-200 overflow-hidden">
                                <img
                                    src={
                                        berita[0]?.imageUrl ||
                                        `https://picsum.photos/800/600?random=${berita[0]?.id}`
                                    }
                                    alt={berita[0]?.title}
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-green-800 tracking-wider">{berita[0]?.prestasi}</span>
                                <h3 className="font-bold text-lg mt-2 mb-3 text-gray-900">{berita[0]?.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{berita[0]?.content}</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="h-48 bg-gray-200 overflow-hidden">
                                <img
                                    src={
                                        berita[1]?.imageUrl ||
                                        `https://picsum.photos/800/600?random=${berita[1]?.id}`
                                    }
                                    alt={berita[1]?.title}
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-blue-800 tracking-wider">{berita[1]?.prestasi}</span>
                                <h3 className="font-bold text-lg mt-2 mb-3 text-gray-900">{berita[1]?.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{berita[1]?.content}</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="h-48 bg-gray-200 overflow-hidden">
                                <img
                                    src={
                                        berita[2]?.imageUrl ||
                                        `https://picsum.photos/800/600?random=${berita[2]?.id}`
                                    }
                                    alt={berita[2]?.title}
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-orange-800 tracking-wider">{berita[2]?.prestasi}</span>
                                <h3 className="font-bold text-lg mt-2 mb-3 text-gray-900">{berita[2]?.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{berita[2]?.content}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* BERITA & ARTIKEL TERBARU */}
            <section className="px-8 md:px-20 py-20 bg-white">
                <div className="max-w-7xl mx-auto">

                    <h2 className="text-3xl font-bold text-center text-green-900 mb-12">
                        Berita & Artikel Terbaru
                    </h2>

                    {loadingBerita ? (
                        <div className="text-center">
                            Memuat berita...
                        </div>
                    ) : berita.length === 0 ? (
                        <div className="text-center text-gray-500">
                            Belum ada berita tersedia.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Berita Utama */}
                            <div className="relative rounded-xl overflow-hidden h-112.5 group cursor-pointer shadow-sm">

                                <img
                                    src={
                                        berita[0]?.imageUrl ||
                                        `https://picsum.photos/800/600?random=${berita[0]?.id}`
                                    }
                                    alt={berita[0]?.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 p-8 text-white w-full">

                                    <span className="bg-green-600 px-3 py-1 text-xs font-bold rounded">
                                        BERITA
                                    </span>

                                    <h3 className="text-2xl font-bold mt-4 mb-3">
                                        {berita[0]?.title}
                                    </h3>

                                    <p className="text-sm text-gray-300 line-clamp-3">
                                        {berita[0]?.content}
                                    </p>
                                </div>
                            </div>

                            {/* List Berita */}
                            <div className="flex flex-col gap-6">

                                {berita.slice(1, 4).map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-6 group cursor-pointer bg-white p-2 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="w-40 h-28 bg-gray-200 rounded-lg overflow-hidden shrink-0">

                                            <img
                                                src={
                                                    item.imageUrl ||
                                                    `https://picsum.photos/300/200?random=${item.id}`
                                                }
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />

                                        </div>

                                        <div className="flex flex-col justify-center">

                                            <span className="text-xs text-green-700 font-bold mb-1">
                                                {new Date(item.createdAt).toLocaleDateString(
                                                    'id-ID',
                                                    {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }
                                                )}
                                            </span>

                                            <h4 className="font-bold text-gray-900 leading-tight mb-2 group-hover:text-green-700 transition-colors">
                                                {item.title}
                                            </h4>

                                            <p className="text-sm text-gray-500 line-clamp-2">
                                                {item.content}
                                            </p>

                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    )}
                </div>
            </section>

            {/* CALL TO ACTION SECTION */}
            <section className="bg-green-900 text-white text-center py-24 px-8 border-t border-green-800">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6">Siap Menjadi Bagian Dari Kami?</h2>
                    <p className="text-green-100 text-lg">
                        Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2024/2025 telah dibuka. Segera amankan kursi Anda.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default Home;