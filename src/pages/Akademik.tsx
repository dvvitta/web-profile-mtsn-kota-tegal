import { useEffect, useState } from 'react';
import {
    School,
    Users,
    Trophy,
    Music4,
    Compass,
    BookOpen,
    Computer,
    FlaskConical,
    Home,
    Coffee,
    Briefcase,
    HeartPulse,
    UserCheck,
    Languages,
    Palette,
    Sparkles,
    Flame
} from 'lucide-react';

const Akademik = () => {
    const [activeSection, setActiveSection] = useState('fasilitas');

    const menuItems = [
        { id: 'fasilitas', label: 'Sarana & Prasarana', icon: School },
        { id: 'ekskul', label: 'Ekstrakurikuler', icon: Users },
    ];

    // Data Sarana Prasarana hasil ekstrak gambar
    const fasilitasData = [
        { nama: 'Ruang Belajar', detail: '20 Kelas Reguler, 10 Kelas Full Day', icon: School, color: 'text-emerald-600 bg-emerald-50' },
        { nama: 'Ruang Laboratorium Computer', detail: '3 Ruang', icon: Computer, color: 'text-blue-600 bg-blue-50' },
        { nama: 'Ruang Perpustakaan', detail: '3 Ruang', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
        { nama: 'Masjid', detail: '1 Unit', icon: Home, color: 'text-teal-600 bg-teal-50' },
        { nama: 'Ruang Laboratorium IPA', detail: '1 Ruang', icon: FlaskConical, color: 'text-purple-600 bg-purple-50' },
        { nama: 'Ruang UKS', detail: '1 Ruang', icon: HeartPulse, color: 'text-rose-600 bg-rose-50' },
        { nama: 'Ruang Guru', detail: '1 Ruang Besar', icon: Briefcase, color: 'text-amber-600 bg-amber-50' },
        { nama: 'Ruang Kepala Madrasah', detail: '1 Ruang', icon: UserCheck, color: 'text-cyan-600 bg-cyan-50' },
        { nama: 'Ruang Tata Usaha', detail: '2 Ruang', icon: Briefcase, color: 'text-slate-600 bg-slate-50' },
        { nama: 'Ruang BK', detail: '1 Ruang', icon: Users, color: 'text-violet-600 bg-violet-50' },
        { nama: 'Ruang OSIS', detail: '1 Ruang', icon: Trophy, color: 'text-orange-600 bg-orange-50' },
        { nama: 'Ruang Kantin', detail: '3 Petak', icon: Coffee, color: 'text-yellow-600 bg-yellow-50' },
        { nama: 'Ruang Koperasi', detail: '1 Ruang', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50' },
        { nama: 'Kamar Mandi Siswa', detail: '13 Ruang', icon: Home, color: 'text-slate-500 bg-slate-100' },
        { nama: 'Kamar Mandi Guru & Karyawan', detail: '6 Ruang', icon: Home, color: 'text-slate-500 bg-slate-100' },
    ];

    // Data Ekstrakurikuler hasil ekstrak gambar beserta pengelompokan ikon terdekat
    const ekskulData = [
        { nama: 'Drum Band', icon: Music4 },
        { nama: 'Pramuka / Paskibra', icon: Compass },
        { nama: 'UKS', icon: HeartPulse },
        { nama: 'Bola Voli', icon: Trophy },
        { nama: 'Bulu Tangkis', icon: Trophy },
        { nama: 'Tenis Meja', icon: Trophy },
        { nama: 'Silat / Karate', icon: Flame },
        { nama: 'Futsal', icon: Trophy },
        { nama: 'Band', icon: Music4 },
        { nama: 'OSN / KSM / KIR', icon: Sparkles },
        { nama: 'Tilawah', icon: Music4 },
        { nama: 'Tahfidz', icon: BookOpen },
        { nama: 'Klub Bahasa Arab', icon: Languages },
        { nama: 'Klub Bahasa Inggris', icon: Languages },
        { nama: 'Klub Bahasa Indonesia', icon: Languages },
        { nama: 'Seni Tari', icon: Sparkles },
        { nama: 'Seni Lukis', icon: Palette },
        { nama: 'Kaligrafi', icon: Palette },
        { nama: 'Klub Bahasa Jawa', icon: Languages },
        { nama: 'Hadroh', icon: Music4 },
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
                            <h3 className="text-sm font-extrabold text-slate-900 tracking-wider uppercase">Fasilitas & Ekskul</h3>
                            <p className="text-xs text-slate-400 mt-0.5">MTs Negeri Kota Tegal</p>
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

                    {/* --- 1. FASILITAS / SARANA PRASARANA --- */}
                    <div id="fasilitas" className="pt-4 md:pt-6 scroll-mt-36 md:scroll-mt-24">
                        <div className="border-l-4 border-emerald-700 pl-4 mb-8">
                            <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Sarana & Prasarana</h2>
                            <p className="text-xs md:text-sm text-slate-500 font-medium">Infrastruktur penunjang kenyamanan lingkungan belajar mengajar MTs N Kota Tegal.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {fasilitasData.map((item, index) => {
                                const IconComp = item.icon;
                                return (
                                    <div key={index} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 group">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color} group-hover:scale-105 transition-transform`}>
                                            <IconComp className="w-6 h-6" strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm mb-0.5 group-hover:text-emerald-800 transition-colors">{item.nama}</h4>
                                            <p className="text-xs text-slate-500 font-normal leading-relaxed">{item.detail}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- 2. EKSTRAKURIKULER --- */}
                    <div id="ekskul" className="bg-gradient-to-br from-emerald-950 to-emerald-900 rounded-3xl p-6 md:p-10 text-white shadow-xl shadow-emerald-950/20 scroll-mt-36 md:scroll-mt-24 relative overflow-hidden">

                        {/* Dekorasi Background Minimalis */}
                        <div className="absolute right-[-20px] bottom-[-20px] text-emerald-400 opacity-[0.03] pointer-events-none select-none">
                            <Users className="w-64 h-64" />
                        </div>

                        {/* Header Section */}
                        <div className="mb-8 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3">
                                <Trophy className="w-3.5 h-3.5" /> Program Kesiswaan
                            </div>
                            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight mb-2">Ekstrakurikuler</h2>
                            <p className="text-xs md:text-sm text-emerald-100/70 font-medium max-w-xl leading-relaxed">
                                Wadah pengembangan bakat, minat, potensi diri, dan kecerdasan emosional siswa di luar jam pembelajaran formal.
                            </p>
                        </div>

                        {/* Grid Container Ekstrakurikuler */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 relative z-10">
                            {ekskulData.map((ekskul, index) => {
                                const EkskulIcon = ekskul.icon;
                                return (
                                    <div key={index} className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/[0.08] hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 group/card">
                                        <div className="w-8 h-8 bg-emerald-500/20 text-emerald-300 rounded-lg flex items-center justify-center group-hover/card:bg-emerald-500 group-hover/card:text-emerald-950 transition-all duration-300 shadow-inner shrink-0">
                                            <EkskulIcon className="w-4 h-4" strokeWidth={2.2} />
                                        </div>
                                        <span className="text-xs font-semibold text-emerald-50 tracking-wide">{ekskul.nama}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </main>
            </section>

        </div>
    );
};

export default Akademik;