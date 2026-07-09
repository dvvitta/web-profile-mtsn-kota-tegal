import { useEffect, useState } from 'react';
import {
    School,
    Users,
    Trophy,
    Music4,
    ShieldCheck,
    Compass,
} from 'lucide-react';

// 1. Import gambar lokal dari folder assets
import gedungImg from '../assets/gedung.jpg';
// Catatan: Sesuaikan "../assets/gedung.jpg" jika posisi folder komponen ini berbeda tingkat kedalamannya.

const Akademik = () => {
    const [activeSection, setActiveSection] = useState('fasilitas');

    const menuItems = [
        { id: 'fasilitas', label: 'Fasilitas Utama', icon: School },
        { id: 'ekskul', label: 'Ekstrakurikuler', icon: Users },
    ];

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

                {/* SIDEBAR NAVIGATION */}
                <aside className="md:col-span-3 z-30">
                    <div className="sticky top-20 md:top-28 bg-white/90 backdrop-blur-md md:bg-white p-4 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 md:shadow-none">

                        <div className="hidden md:block mb-6 pl-2">
                            <h3 className="text-sm font-extrabold text-slate-900 tracking-wider uppercase">Layanan Academic</h3>
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

                {/* KONTEN UTAMA */}
                <main className="md:col-span-9 flex flex-col space-y-16">

                    {/* --- 1. FASILITAS SEKOLAH --- */}
                    <div id="fasilitas" className="pt-4 md:pt-6 scroll-mt-36 md:scroll-mt-24">
                        <div className="border-l-4 border-emerald-700 pl-4 mb-8">
                            <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Fasilitas Sekolah</h2>
                            <p className="text-xs md:text-sm text-slate-500 font-medium">Infrastruktur dan sarana prasarana penunjang kenyamanan belajar mengajar.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                            {/* Card 1 */}
                            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 group">
                                <div className="h-44 md:h-48 overflow-hidden bg-slate-100 relative">
                                    <img
                                        src={gedungImg}
                                        alt="Laboratorium Komputer & AI"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-5 md:p-6">
                                    <h4 className="font-extrabold text-slate-900 mb-2 text-base group-hover:text-emerald-800 transition-colors">Laboratorium Komputer</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-normal">Dilengkapi komputer spesifikasi tinggi, jaringan internet stabil, dan perangkat penunjang pembelajaran.</p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 group">
                                <div className="h-44 md:h-48 overflow-hidden bg-slate-100 relative">
                                    <img
                                        src={gedungImg}
                                        alt="Smart Classroom"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-5 md:p-6">
                                    <h4 className="font-extrabold text-slate-900 mb-2 text-base group-hover:text-emerald-800 transition-colors">Perpustakaan</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-normal">Menyediakan ratusan koleksi buku fisik, serta area membaca yang nyaman.</p>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 group">
                                <div className="h-44 md:h-48 overflow-hidden bg-slate-100 relative">
                                    <img
                                        src={gedungImg}
                                        alt="Laboratorium IPA Terintegrasi"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-5 md:p-6">
                                    <h4 className="font-extrabold text-slate-900 mb-2 text-base group-hover:text-emerald-800 transition-colors">Laboratorium IPA</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-normal">Fasilitas praktikum Fisika, Kimia, dan Biologi, alat peraga modern.</p>
                                </div>
                            </div>

                        </div>
                    </div>


                            
                            <div id="ekskul" className="bg-gradient-to-br from-emerald-950 to-emerald-900 rounded-3xl p-6 md:p-10 text-white shadow-xl shadow-emerald-950/20 scroll-mt-36 md:scroll-mt-24 relative overflow-hidden group">

                        {/* Dekorasi Background Minimalis */}
                        <div className="absolute right-[-20px] bottom-[-20px] text-emerald-400 opacity-[0.03] pointer-events-none select-none">
                            <Users className="w-64 h-64" />
                        </div>

                        {/* Header Section */}
                        <div className="mb-8 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
                                <Trophy className="w-3.5 h-3.5" /> Pengembangan Diri
                            </div>
                            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight mb-2">Bakat, Minat & Organisasi</h2>
                            <p className="text-xs md:text-sm text-emerald-100/70 font-medium max-w-xl leading-relaxed">
                                Mengasah softskills, jiwa kepemimpinan, dan kecerdasan emosional siswa di luar jam belajar formal.
                            </p>
                        </div>

                        {/* Grid Container */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10">

                            {/* Card 1: Futsal & Sepak Bola */}
                            <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 group/card flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 bg-emerald-500/20 text-emerald-300 rounded-xl flex items-center justify-center mb-4 group-hover/card:bg-emerald-500 group-hover/card:text-emerald-950 transition-all duration-300 shadow-inner">
                                        <Trophy className="w-5 h-5" strokeWidth={2.2} />
                                    </div>
                                    <h5 className="text-sm font-bold mb-1.5 text-emerald-50 tracking-wide">Sepak Bola & Futsal</h5>
                                    <p className="text-[11px] text-emerald-100/60 leading-relaxed font-normal">
                                        Fokus pada pengembangan teknik, taktik tim, dan kesiapan kompetisi turnamen antar pelajar.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2: Hadroh & Seni Musik */}
                            <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 group/card flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 bg-emerald-500/20 text-emerald-300 rounded-xl flex items-center justify-center mb-4 group-hover/card:bg-emerald-500 group-hover/card:text-emerald-950 transition-all duration-300 shadow-inner">
                                        <Music4 className="w-5 h-5" strokeWidth={2.2} />
                                    </div>
                                    <h5 className="text-sm font-bold mb-1.5 text-emerald-50 tracking-wide">Seni Musik & Hadroh</h5>
                                    <p className="text-[11px] text-emerald-100/60 leading-relaxed font-normal">
                                        Wadah kreativitas olah vokal, instrumen modern, serta pelestarian seni religi islami.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3: OSIS (Diberi aksen Amber/Emas khusus Organisasi Utama) */}
                            <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-300 group/card flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 bg-amber-500/20 text-amber-300 rounded-xl flex items-center justify-center mb-4 group-hover/card:bg-amber-500 group-hover/card:text-amber-950 transition-all duration-300 shadow-inner">
                                        <ShieldCheck className="w-5 h-5" strokeWidth={2.2} />
                                    </div>
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <h5 className="text-sm font-bold text-amber-50 tracking-wide">OSIS</h5>
                                    </div>
                                    <p className="text-[11px] text-emerald-100/60 leading-relaxed font-normal">
                                        Manajemen aspirasi siswa, perancangan event sekolah, dan simulasi nyata dunia organisasi.
                                    </p>
                                </div>
                            </div>

                            {/* Card 4: Pramuka */}
                            <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 group/card flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 bg-emerald-500/20 text-emerald-300 rounded-xl flex items-center justify-center mb-4 group-hover/card:bg-emerald-500 group-hover/card:text-emerald-950 transition-all duration-300 shadow-inner">
                                        <Compass className="w-5 h-5" strokeWidth={2.2} />
                                    </div>
                                    <h5 className="text-sm font-bold mb-1.5 text-emerald-50 tracking-wide">Pramuka Inti</h5>
                                    <p className="text-[11px] text-emerald-100/60 leading-relaxed font-normal">
                                        Pembentukan karakter mental tangguh, kemandirian lapangan, dan kepedulian sosial.
                                    </p>
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