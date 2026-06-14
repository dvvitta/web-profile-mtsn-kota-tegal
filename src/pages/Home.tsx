import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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
                                <img src="https://via.placeholder.com/400x200" alt="Akademik" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-green-800 tracking-wider">AKADEMIK</span>
                                <h3 className="font-bold text-lg mt-2 mb-3 text-gray-900">Juara 1 Olimpiade Sains Nasional Tingkat Provinsi</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">Tim Robotik MTsN Kota Tegal berhasil mengungguli 50 sekolah lainnya dalam ajang tahunan...</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="h-48 bg-gray-200 overflow-hidden">
                                <img src="https://via.placeholder.com/400x200" alt="Keagamaan" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-blue-800 tracking-wider">KEAGAMAAN</span>
                                <h3 className="font-bold text-lg mt-2 mb-3 text-gray-900">Terbaik 1 MHQ 30 Juz Tingkat Kota Tegal</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">Ananda Siti Aminah meraih predikat terbaik dalam lomba Musabaqah Hifzil Quran...</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="h-48 bg-gray-200 overflow-hidden">
                                <img src="https://via.placeholder.com/400x200" alt="Olahraga" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-orange-800 tracking-wider">OLAHRAGA</span>
                                <h3 className="font-bold text-lg mt-2 mb-3 text-gray-900">Medali Emas Pencak Silat Popda 2023</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">Prestasi gemilang diraih di bidang seni bela diri tingkat daerah...</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* BERITA & ARTIKEL TERBARU SECTION */}
            <section className="px-8 md:px-20 py-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Berita & Artikel Terbaru</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Artikel Utama (Kiri) */}
                        <div className="relative rounded-xl overflow-hidden h-112.5 group cursor-pointer shadow-sm">
                            <img src="https://via.placeholder.com/800x600" alt="Berita Utama" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                                <span className="bg-green-600 px-3 py-1 text-xs font-bold tracking-wider rounded inline-block mb-4">PENGUMUMAN</span>
                                <h3 className="text-2xl font-bold mb-3 leading-snug">Persiapan Ujian Madrasah Berbasis Komputer (UMBK) 2024</h3>
                                <p className="text-sm text-gray-300 line-clamp-2">Seluruh siswa kelas IX diharapkan mengikuti simulasi terakhir yang akan dilaksanakan pada pekan depan...</p>
                            </div>
                        </div>

                        {/* List Artikel (Kanan) */}
                        <div className="flex flex-col justify-between gap-6">

                            {/* Item List 1 */}
                            <div className="flex gap-6 group cursor-pointer bg-white p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="w-40 h-28 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                    <img src="https://via.placeholder.com/200x150" alt="Thumbnail" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-xs text-green-700 font-bold mb-1">12 Jan 2024</span>
                                    <h4 className="font-bold text-gray-900 leading-tight mb-2 group-hover:text-green-700 transition-colors">Program Kantin Sehat: Menuju Madrasah Ramah Anak</h4>
                                    <p className="text-sm text-gray-500 line-clamp-2">Pihak sekolah resmi meluncurkan inisiatif makanan bergizi gratis untuk...</p>
                                </div>
                            </div>

                            {/* Item List 2 */}
                            <div className="flex gap-6 group cursor-pointer bg-white p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="w-40 h-28 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                    <img src="https://via.placeholder.com/200x150" alt="Thumbnail" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-xs text-green-700 font-bold mb-1">05 Jan 2024</span>
                                    <h4 className="font-bold text-gray-900 leading-tight mb-2 group-hover:text-green-700 transition-colors">Wisuda Purnawiyata Angkatan 42 Berjalan Khidmat</h4>
                                    <p className="text-sm text-gray-500 line-clamp-2">Sebanyak 350 siswa resmi dilepas untuk melanjutkan ke jenjang pendidikan...</p>
                                </div>
                            </div>

                            {/* Item List 3 */}
                            <div className="flex gap-6 group cursor-pointer bg-white p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="w-40 h-28 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                    <img src="https://via.placeholder.com/200x150" alt="Thumbnail" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-xs text-green-700 font-bold mb-1">28 Des 2023</span>
                                    <h4 className="font-bold text-gray-900 leading-tight mb-2 group-hover:text-green-700 transition-colors">Peresmian Perpustakaan Digital "Baitul Hikmah"</h4>
                                    <p className="text-sm text-gray-500 line-clamp-2">Fasilitas baru ini memungkinkan siswa mengakses ribuan e-book secara...</p>
                                </div>
                            </div>

                        </div>
                    </div>
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