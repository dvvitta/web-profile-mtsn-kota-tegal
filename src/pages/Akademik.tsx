import { useEffect, useState } from 'react';
import {
    School,
    Users,
    BookOpen,
    Trophy,
    Music,
    Cpu,
    Compass,
    CheckCircle2,
    Clock,
    Layers
} from 'lucide-react';

const Akademik = () => {
    // 1. State untuk menyimpan ID menu yang sedang aktif
    const [activeSection, setActiveSection] = useState('fasilitas');

    // 2. Daftar Menu dengan Lucide Icons
    const menuItems = [
        { id: 'fasilitas', label: 'Fasilitas Utama', icon: School },
        { id: 'ekskul', label: 'Ekstrakurikuler', icon: Users },
        { id: 'perpustakaan', label: 'Perpustakaan Digital', icon: BookOpen },
    ];

    // 3. Data Dummy Lengkap
    const dummyFasilitas = [
        {
            id: 1,
            nama: "Laboratorium Komputer & AI",
            deskripsi: "Dilengkapi dengan 40 unit komputer spesifikasi tinggi, jaringan internet gigabit, dan perangkat penunjang pembelajaran pemrograman serta kecerdasan buatan.",
            image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
            tag: "Sains & Teknologi"
        },
        {
            id: 2,
            nama: "Smart Classroom",
            deskripsi: "Ruang kelas interaktif yang didukung dengan Interactive Whiteboard (IWB), proyektor laserShort-Throw, ruang ber-AC, dan konfigurasi meja belajar fleksibel.",
            image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
            tag: "Ruang Kelas"
        },
        {
            id: 3,
            nama: "Laboratorium IPA Terintegrasi",
            deskripsi: "Fasilitas praktikum Fisika, Kimia, dan Biologi dengan instrumen mikroskop digital, alat peraga anatomi modern, serta standar keamanan laboratorium yang tinggi.",
            image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80",
            tag: "Sains"
        }
    ];

    const dummyEkskul = [
        { nama: "Sepak Bola & Futsal", icon: Trophy, desc: "Fokus pada pengembangan teknik, taktik, dan kompetisi turnamen antar pelajar." },
        { nama: "Seni musik & Hadroh", icon: Music, desc: "Wadah kreativitas olah vokal, musik modern, serta pelestarian seni religi islami." },
        { nama: "Klub Robotik & Coding", icon: Cpu, desc: "Eksplorasi dasar otomasi, perakitan mikrokontroler, dan kompetisi robotika." },
        { nama: "Pramuka Inti", icon: Compass, desc: "Pembentukan karakter, kepemimpinan, kemandirian, dan kepedulian sosial dasar." }
    ];

    const dummyPerpustakaan = {
        totalBuku: "12,450+",
        pengunjungBulanIni: "1,200+",
        fitur: [
            "E-Book Access (Akses baca digital via gawai)",
            "Ruang Baca Cozy & Quiet Zone",
            "Sistem Peminjaman Otomatis RFID",
            "Koleksi Jurnal Ilmiah Terakreditasi"
        ]
    };

    // Scrollspy logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -60% 0px' }
        );

        menuItems.forEach((item) => {
            const section = document.getElementById(item.id);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full font-sans text-slate-800 bg-slate-50/40 antialiased selection:bg-emerald-100 selection:text-emerald-900">

            <section className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">

                {/* ========================================= */}
                {/* SIDEBAR NAVIGATION (Modern Active State) */}
                {/* ========================================= */}
                <aside className="md:col-span-3 z-30">
                    <div className="sticky top-20 md:top-28 bg-white/90 backdrop-blur-md md:bg-white p-4 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 md:shadow-none">

                        <div className="hidden md:block mb-6 pl-2">
                            <h3 className="text-sm font-extrabold text-slate-900 tracking-wider uppercase">Layanan Akademik</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Eksplorasi lingkungan sekolah</p>
                        </div>

                        <ul className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 snap-x hide-scrollbar">
                            {menuItems.map((item) => {
                                const isActive = activeSection === item.id;
                                const Icon = item.icon;

                                return (
                                    <li key={item.id} className="snap-start">
                                        <a
                                            href={`#${item.id}`}
                                            onClick={() => setActiveSection(item.id)}
                                            className={`whitespace-nowrap shrink-0 md:w-full text-left px-5 py-3 md:px-4 md:py-3.5 rounded-2xl text-sm font-bold flex items-center gap-3 transition-all duration-200 active:scale-[0.98] ${isActive
                                                ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-800/20'
                                                : 'text-slate-600 bg-slate-50 md:bg-transparent border md:border-none border-slate-100 hover:bg-emerald-50 hover:text-emerald-800'
                                                }`}
                                        >
                                            <Icon className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} strokeWidth={2.2} />
                                            {item.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>

                {/* ========================================= */}
                {/* KONTEN UTAMA                              */}
                {/* ========================================= */}
                <main className="md:col-span-9 flex flex-col space-y-16">

                    {/* --- 1. FASILITAS SEKOLAH --- */}
                    <div id="fasilitas" className="pt-4 md:pt-6 scroll-mt-36 md:scroll-mt-24">
                        <div className="border-l-4 border-emerald-700 pl-4 mb-8">
                            <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Fasilitas Sekolah</h2>
                            <p className="text-xs md:text-sm text-slate-500 font-medium">Infrastruktur dan sarana prasarana penunjang kenyamanan belajar mengajar.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {dummyFasilitas.map((item) => (
                                <div key={item.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 group">
                                    <div className="h-44 md:h-48 overflow-hidden bg-slate-100 relative">
                                        <img
                                            src={item.image}
                                            alt={item.nama}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-xl uppercase tracking-wider border border-white/50">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <div className="p-5 md:p-6">
                                        <h4 className="font-extrabold text-slate-900 mb-2 text-base group-hover:text-emerald-800 transition-colors">{item.nama}</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.deskripsi}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- 2. EKSTRAKURIKULER --- */}
                    <div id="ekskul" className="bg-gradient-to-br from-emerald-950 to-emerald-800 rounded-3xl p-6 md:p-10 text-white shadow-xl shadow-emerald-950/10 scroll-mt-36 md:scroll-mt-24 relative overflow-hidden group">
                        <div className="absolute right-[-20px] bottom-[-20px] text-white opacity-[0.02] pointer-events-none select-none">
                            <Users className="w-64 h-64" />
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight mb-1.5">Pengembangan Bakat & Minat</h2>
                            <p className="text-xs md:text-sm text-emerald-100/80 font-medium max-w-xl">Mengasah sofskils, kepemimpinan, dan kecerdasan emosional di luar jam belajar formal.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {dummyEkskul.map((ekskul, index) => {
                                const EkskulIcon = ekskul.icon;
                                return (
                                    <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-all duration-200">
                                        <div className="w-10 h-10 bg-emerald-500/20 text-emerald-300 rounded-xl flex items-center justify-center mb-3">
                                            <EkskulIcon className="w-5 h-5" strokeWidth={2.2} />
                                        </div>
                                        <h5 className="text-sm font-bold mb-1">{ekskul.nama}</h5>
                                        <p className="text-[11px] text-emerald-100/70 leading-relaxed font-normal">{ekskul.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- 3. PERPUSTAKAAN (Modern Info Grid) --- */}
                    <div id="perpustakaan" className="pt-4 md:pt-6 scroll-mt-36 md:scroll-mt-24 mb-20">
                        <div className="border-l-4 border-emerald-700 pl-4 mb-8">
                            <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Perpustakaan Central & Digital</h2>
                            <p className="text-xs md:text-sm text-slate-500 font-medium">Gudang ilmu literatur fisik dan gerbang akses referensi digital berskala internasional.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                            {/* Counter Informasi Ringkas */}
                            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
                                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
                                    <div className="text-emerald-700 mb-2"><Layers className="w-5 h-5" /></div>
                                    <span className="text-2xl md:text-3xl font-black text-slate-900">{dummyPerpustakaan.totalBuku}</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Koleksi Buku</span>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
                                    <div className="text-emerald-700 mb-2"><Clock className="w-5 h-5" /></div>
                                    <span className="text-2xl md:text-3xl font-black text-slate-900">{dummyPerpustakaan.pengunjungBulanIni}</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Sirkulasi Bulanan</span>
                                </div>
                            </div>

                            {/* Fitur Layanan Perpustakaan */}
                            <div className="md:col-span-8 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
                                <h4 className="text-base font-extrabold text-slate-900 mb-4">Layanan & Keunggulan Ruang Baca</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {dummyPerpustakaan.fitur.map((fitur, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                                            <span className="text-xs font-semibold text-slate-600 leading-relaxed">{fitur}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </section>

        </div>
    );
};

export default Akademik;