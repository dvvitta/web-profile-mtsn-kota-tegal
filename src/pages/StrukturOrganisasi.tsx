import React from 'react';

// --- Tipe Data & Interface ---
interface CardProps {
    role: string;
    name: string;
    nip?: string;
    isKomite?: boolean;
}

// --- Komponen Kartu Profil Ultra-Modern ---
const OrgCard: React.FC<CardProps> = ({ role, name, nip, isKomite = false }) => (
    <div className="w-[280px] bg-white/80 backdrop-blur-md rounded-2xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 flex flex-col gap-3 z-10 shrink-0 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400 hover:shadow-[0_10px_40px_rgba(16,185,129,0.08)] group">

        {/* Badge Peran (Pill Style) */}
        <div className="align-self-start">
            <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase border border-emerald-200/50 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-transparent transition-colors duration-300">
                {role}
            </span>
        </div>

        {/* Info Profil */}
        <div className="flex items-center gap-3">
            

            <div className="text-left overflow-hidden">
                <h4 className="text-sm font-semibold text-zinc-800 tracking-tight leading-tight group-hover:text-zinc-900 transition-colors truncate">
                    {name}
                </h4>
                {nip && (
                    <p className="text-[10px] font-medium text-zinc-400 mt-0.5 truncate tracking-normal">
                        {nip}
                    </p>
                )}
            </div>
        </div>
    </div>
);

// --- Komponen Kotak Minimalis (Wali Kelas / Dewan Guru) ---
const SimpleBox = ({ text }: { text: string }) => (
    <div className="w-[240px] bg-white rounded-xl border border-zinc-200 shadow-sm text-center py-3 font-semibold text-xs text-zinc-700 tracking-widest z-10 transition-all hover:border-emerald-400 hover:text-emerald-700">
        {text}
    </div>
);

// --- Komponen Utama Halaman ---
const HalamanStrukturOrganisasi: React.FC = () => {
    return (
        <div className="min-h-screen bg-zinc-50 font-sans pb-16 antialiased">

            {/* --- HEADER NAVBAR (Minimalis & Clean) --- */}
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2 py-10">
                    Struktur Organisasi MAN Kota Tegal
                </h1>
            </div>

            {/* --- AREA UTAMA / KANVAS (Figma/Notion Canvas Style) --- */}
            <div className="max-w-[1440px] mx-auto px-4 mt-8">

                {/* Container Utama dengan Pola Titik (Dot Matrix Background) */}
                <div className="w-full overflow-x-auto bg-zinc-50 rounded-3xl border border-zinc-200/80 shadow-sm relative p-12 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:20px_20px]">

                    <div className="min-w-[1240px] flex flex-col items-center relative pb-8">

                        {/* Judul Besar Kontemporer */}
                        <div className="text-center mb-20 relative z-10">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/30">
                                Manajemen Internal
                            </span>
                            <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight mt-3">
                                Struktur Organisasi
                            </h2>
                            <p className="text-sm text-zinc-400 font-medium mt-1">
                                Madrasah Aliyah Negeri Kota Tegal
                            </p>
                        </div>

                        {/* --- LEVEL 1: Kepala Madrasah --- */}
                        <div className="relative flex justify-center">
                            {/* Jalur ke Komite (Kiri) */}
                            <div className="absolute right-full top-1/2 flex items-center -translate-y-1/2">
                                <OrgCard role="Komite Madrasah" name="H. Ali Shobiri, S.Ag., M.Pd.I" isKomite />
                                <div className="w-12 h-[2px] bg-zinc-300"></div>
                            </div>

                            <OrgCard role="Kepala Madrasah" name="Dr. Drs. H. Tobari, M.Ag." nip="NIP. 19660626 199203 1 002" />
                        </div>

                        {/* --- BATANG VERTIKAL UTAMA (Trunk) --- */}
                        <div className="flex flex-col items-center relative">
                            <div className="w-[2px] h-10 bg-zinc-300"></div>

                            {/* Jalur ke Kepala TU (Kanan) */}
                            <div className="absolute top-full left-[50%] flex items-center -translate-y-11/12">
                                <div className="w-12 h-0.5 bg-zinc-300"></div>
                                <OrgCard role="Kepala UR. TU" name="Arief Sardjono, S.Pd.I." nip="NIP. 19710408 199203 1 002" />
                            </div>

                            <div className="w-0.5 h-16 bg-zinc-300"></div>
                        </div>

                        {/* --- LEVEL 2: Barisan Wakil Kepala Urusan (WAKAUR) --- */}
                        <div className="flex flex-col items-center w-full relative z-10">

                            {/* Garis Horizontal Pembagi */}
                            {/* Rumus Presisi Jarak Tengah: (4 kartu * 280px) + (3 jarak * 32px) - 280px = 936px */}
                            <div className="w-234 h-0.5 bg-zinc-300 absolute top-5"></div>

                            {/* Tembusan Garis Batang Utama Kebawah */}
                            <div className="absolute left-1/2 top-0 w-0.5 h-[calc(100%+2.5rem)] bg-zinc-300 -translate-x-1/2 -z-10"></div>

                            {/* Susunan Kartu WAKAUR */}
                            <div className="flex gap-8 mt-5">
                                <div className="flex flex-col items-center">
                                    <div className="w-0.5 h-8 bg-zinc-300"></div>
                                    <OrgCard role="Wakaur Kurikulum" name="Titin Supriyatin, S.Pd." nip="NIP. 19761125 200901 2 004" />
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-0.5 h-8 bg-zinc-300"></div>
                                    <OrgCard role="Wakaur Kesiswaan" name="Eti Purwatiningsih, S.Pd" nip="NIP. 19800406 200501 2 005" />
                                </div>

                                {/* Celah Tengah untuk Batang Utama */}

                                <div className="flex flex-col items-center">
                                    <div className="w-[2px] h-8 bg-zinc-300"></div>
                                    <OrgCard role="Wakaur Humas" name="Satori, S.Pd." nip="NIP. 19890907 202321 1 023" />
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-[2px] h-8 bg-zinc-300"></div>
                                    <OrgCard role="Wakaur Sarpas" name="Ropi'i, M.Pd.I" nip="NIP. 19730803 200701 1 025" />
                                </div>
                            </div>
                        </div>

                        {/* --- JALUR VERTIKAL KE LEVEL BAWAH --- */}
                        <div className="flex flex-col items-center relative mt-10">
                            <div className="w-[2px] h-12 bg-zinc-300"></div>

                            {/* Jalur ke Koordinator BK (Kanan) */}
                            <div className="absolute top-1/2 left-[50%] flex items-center -translate-y-1/2">
                                <div className="w-[180px] h-[2px] bg-zinc-300"></div>
                                <OrgCard role="Koordinator BK" name="Sri Rejeki, SE" nip="NIP. 19730922 200501 2 002" />
                            </div>
                        </div>

                        {/* --- LEVEL 3 & 4: Wali Kelas & Dewan Guru --- */}
                        <SimpleBox text="WALI KELAS" />
                        <div className="w-[2px] h-10 bg-zinc-300"></div>
                        <SimpleBox text="DEWAN GURU" />

                    </div>
                </div>
            </div>

            {/* --- FOOTER HALAMAN --- */}
            <footer className="max-w-[1440px] mx-auto px-6 mt-8 flex flex-col sm:flex-row justify-between items-center text-zinc-400 text-[11px] font-medium gap-2">
                <div className="flex items-center gap-4">
                    
                </div>
                
            </footer>
        </div>
    );
};

export default HalamanStrukturOrganisasi;