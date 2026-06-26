import { useEffect, useState } from 'react';

const Akademik = () => {
    // 1. State untuk menyimpan ID menu yang sedang aktif
    const [activeSection, setActiveSection] = useState('kurikulum');

    // 2. Daftar Menu untuk di-mapping (agar kode lebih bersih)
    const menuItems = [
        { id: 'kurikulum', label: 'Kurikulum', icon: '📖' },
        { id: 'fasilitas', label: 'Fasilitas', icon: '🏫' },
        { id: 'ekskul', label: 'Ekstrakurikuler', icon: '👥' },
        { id: 'prestasi', label: 'Prestasi', icon: '🏆' },
        { id: 'perpustakaan', label: 'Perpustakaan', icon: '📚' },
    ];

    // 3. Efek untuk mendeteksi elemen mana yang sedang tampil di layar (Scrollspy)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Jika bagian tersebut masuk ke dalam area pandang (viewport)
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            // rootMargin mengatur "kapan" deteksi terjadi (di-trigger saat elemen mendekati tengah atas layar)
            { rootMargin: '-20% 0px -60% 0px' }
        );

        // Daftarkan semua elemen yang memiliki ID sesuai menu
        menuItems.forEach((item) => {
            const section = document.getElementById(item.id);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect(); // Bersihkan observer saat komponen ditutup
    }, []);

    return (
        <div className="w-full font-sans text-gray-800 bg-white">

            <section className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">

                {/* ========================================= */}
                {/* SIDEBAR NAVIGATION (Dengan Active State)  */}
                {/* ========================================= */}
                <aside className="md:col-span-3 z-30">
                    <div className="sticky top-17.5 md:top-28 bg-[#f8fbfa]/95 backdrop-blur-sm md:bg-[#f8fbfa] p-3 md:p-6 rounded-2xl md:border border-gray-100 shadow-sm md:shadow-none -mx-4 px-4 md:mx-0 md:px-6">

                        <div className="hidden md:block mb-6">
                            <h3 className="text-sm font-bold text-gray-900">Akademik</h3>
                            <p className="text-xs text-gray-500 mt-1">Informasi Sekolah</p>
                        </div>

                        <ul className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 snap-x hide-scrollbar">
                            {menuItems.map((item) => {
                                const isActive = activeSection === item.id;

                                return (
                                    <li key={item.id} className="snap-start">
                                        <a
                                            href={`#${item.id}`}
                                            onClick={() => setActiveSection(item.id)} // Set aktif saat diklik manual
                                            className={`whitespace-nowrap shrink-0 md:w-full text-left px-5 py-2.5 md:px-4 md:py-3 rounded-full md:rounded-xl text-sm font-medium flex items-center gap-2 md:gap-3 transition-all duration-200 active:scale-95 ${isActive
                                                    ? 'bg-green-800 text-white shadow-sm'
                                                    : 'text-gray-600 bg-white md:bg-transparent border md:border-none border-gray-200 hover:bg-green-50'
                                                }`}
                                        >
                                            <span className="text-base md:text-lg">{item.icon}</span> {item.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>

                {/* ========================================= */}
                {/* KONTEN UTAMA                               */}
                {/* ========================================= */}
                <main className="md:col-span-9 flex flex-col space-y-12">

                    {/* --- 1. KURIKULUM --- */}
                    <div id="kurikulum" className="scroll-mt-32 md:scroll-mt-24 space-y-6">
                        <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[300px] flex items-center shadow-sm">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 md:from-green-950/90 to-green-900/40 z-10"></div>
                            <div className="relative z-20 p-6 md:p-12 max-w-2xl text-white">
                                <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">Kurikulum Merdeka & Islami</h1>
                                <p className="text-green-50 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
                                    Mengintegrasikan standar pendidikan nasional dengan nilai-nilai luhur keagamaan untuk mencetak generasi unggul.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <div className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-white hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-800 text-white flex items-center justify-center rounded-lg mb-4 md:mb-6 shadow-sm"><span className="text-lg md:text-xl">📚</span></div>
                                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 md:mb-3">Program Akademik</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">Fokus pada literasi, numerasi, dan sains melalui metode pembelajaran berbasis proyek yang inovatif dan partisipatif.</p>
                            </div>
                            <div className="border border-gray-200 rounded-2xl p-6 md:p-8 bg-white hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-800 text-white flex items-center justify-center rounded-lg mb-4 md:mb-6 shadow-sm"><span className="text-lg md:text-xl">🕌</span></div>
                                <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 md:mb-3">Tahfidz & Diniyah</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">Pengembangan karakter religius melalui program hafalan Al-Qur'an dan pendalaman kitab kuning secara intensif.</p>
                            </div>
                        </div>
                    </div>

                    {/* --- 2. FASILITAS SEKOLAH --- */}
                    <div id="fasilitas" className="pt-4 md:pt-8 scroll-mt-36 md:scroll-mt-24">
                        <div className="border-l-4 border-green-800 pl-4 mb-6 md:mb-8">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Fasilitas Sekolah</h2>
                            <p className="text-xs md:text-sm text-gray-500">Lingkungan belajar modern dengan fasilitas lengkap.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="h-36 md:h-40 bg-gray-200"></div>
                                    <div className="p-4 md:p-5">
                                        <h4 className="font-bold text-green-800 mb-1 md:mb-2 text-sm md:text-base">Fasilitas {item}</h4>
                                        <p className="text-xs text-gray-600 leading-relaxed">Deskripsi singkat mengenai fasilitas pendukung ini.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- 3. EKSTRAKURIKULER --- */}
                    <div id="ekskul" className="bg-[#0b5c3e] rounded-2xl p-6 md:p-10 text-white shadow-lg mt-4 scroll-mt-36 md:scroll-mt-24">
                        <h2 className="text-xl md:text-2xl font-bold mb-2">Pengembangan Diri</h2>
                        <p className="text-xs md:text-sm text-green-100 mb-6 md:mb-8 max-w-xl">Eksplorasi minat dan bakat melalui berbagai klub dan organisasi kesiswaan.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            <div className="bg-white/10 border border-white/20 rounded-xl p-3 md:p-4 text-center"><span className="text-2xl md:text-3xl mb-2">⚽</span><span className="text-xs font-semibold block mt-2">Sepak Bola</span></div>
                            <div className="bg-white/10 border border-white/20 rounded-xl p-3 md:p-4 text-center"><span className="text-2xl md:text-3xl mb-2">🎵</span><span className="text-xs font-semibold block mt-2">Hadroh</span></div>
                            <div className="bg-white/10 border border-white/20 rounded-xl p-3 md:p-4 text-center"><span className="text-2xl md:text-3xl mb-2">🤖</span><span className="text-xs font-semibold block mt-2">Robotik</span></div>
                            <div className="bg-white/10 border border-white/20 rounded-xl p-3 md:p-4 text-center"><span className="text-2xl md:text-3xl mb-2">🎖️</span><span className="text-xs font-semibold block mt-2">Pramuka</span></div>
                        </div>
                    </div>

                    {/* --- 4. PRESTASI (Placeholder) --- */}
                    <div id="prestasi" className="pt-4 md:pt-8 scroll-mt-36 md:scroll-mt-24 h-64 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-4xl">🏆</span>
                            <p className="mt-4 font-bold text-gray-500">Area Konten Prestasi</p>
                        </div>
                    </div>

                    {/* --- 5. PERPUSTAKAAN (Placeholder) --- */}
                    <div id="perpustakaan" className="pt-4 md:pt-8 scroll-mt-36 md:scroll-mt-24 h-64 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center mb-20">
                        <div className="text-center">
                            <span className="text-4xl">📚</span>
                            <p className="mt-4 font-bold text-gray-500">Area Konten Perpustakaan</p>
                        </div>
                    </div>

                </main>
            </section>

        </div>
    );
};

export default Akademik;