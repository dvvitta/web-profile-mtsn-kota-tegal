import { useState, useMemo } from "react";

// ─── Data ────────────────────────────────────────────────────

const GURU = [
    { nama: "Drs. H. Saefudin", mapel: "Al Qur'an Hadits" },
    { nama: "Dra. Hj. Alfiyah", mapel: "Fikih" },
    { nama: "Drs. H. Alif Sarifudin, M.Hum", mapel: "Bhs Indonesia" },
    { nama: "Drs. H. M. Muslihin", mapel: "IPA" },
    { nama: "Zuamah, S.Pd", mapel: "IPA" },
    { nama: "Hj. Siti Fatimah, S.Pd", mapel: "IPS" },
    { nama: "Efi Juaeni, S.Pd", mapel: "PPKn" },
    { nama: "Khairun Nadirin, S.Ag", mapel: "Bhs Arab" },
    { nama: "Titi Sunarti, S.Pd", mapel: "IPA" },
    { nama: "H. Ghusni Darodjatun, M.Pd", mapel: "Matematika" },
    { nama: "Moh. Subhan, S.Ag", mapel: "Bhs Arab" },
    { nama: "Hj. Nahdhiyatul Ummah, S.Pd", mapel: "Bhs Inggris" },
    { nama: "Sri Salamah, S.Ag", mapel: "SKI" },
    { nama: "Dra. Hj. Misbahul Jannah", mapel: "PPKn" },
    { nama: "Slamet Saefurochman, S.Ag", mapel: "Bhs Inggris" },
    { nama: "Hatin Azaz Asih, S.Pd", mapel: "Penjaskes" },
    { nama: "Lilis Sulistiyowati, S.Pd", mapel: "Bhs Indonesia" },
    { nama: "Any Wahyuni, S.Pd", mapel: "Bimbingan Konseling" },
    { nama: "Farida Shabani, S.Ag", mapel: "IPS" },
    { nama: "Akhmad Tolkhan, S.Pd", mapel: "IPS" },
    { nama: "Heru Wakhyuni, S.Ag", mapel: "Matematika" },
    { nama: "Sri Pramono, S.Pd", mapel: "Bhs Indonesia" },
    { nama: "Tatiek Sulistiorini, S.Pd", mapel: "Bhs Inggris" },
    { nama: "Sachabudin, S.Pd", mapel: "Matematika" },
    { nama: "Hj. Cartimah, S.Pd", mapel: "Bhs Indonesia" },
    { nama: "Trisniyanti, SE", mapel: "IPS" },
    { nama: "Taryuni, S.Ag", mapel: "Fikih" },
    { nama: "Misri Awaliyah, S.Ag", mapel: "Fikih" },
    { nama: "Khozinat ul Asrori, S.Pd.I", mapel: "Aqidah Aklaq" },
    { nama: "Beny Dwi Setyoko, S.Pd", mapel: "Penjaskes" },
    { nama: "Yani Susyanti, S.Pd", mapel: "Penjaskes" },
    { nama: "Moh. Arif Budiarto, S.Pd.I", mapel: "TIK" },
    { nama: "Siswanto, S.Pd.I", mapel: "IPS" },
    { nama: "Zuzun Herawati, S.Pd", mapel: "Bhs Jawa" },
    { nama: "Susiyani, S.Pd", mapel: "Bhs Indonesia" },
    { nama: "Moh. Evan Afrodin, S.Pd", mapel: "Bimbingan Konseling" },
    { nama: "Erni, S.Pd", mapel: "Bimbingan Konseling" },
    { nama: "Setyo Ahmadi, S.Pd", mapel: "Seni Budaya" },
    { nama: "Yusnita, S.Pd", mapel: "Bimbingan Konseling" },
    { nama: "Siti Zubaedah, S.Pd", mapel: "Bhs Inggris" },
    { nama: "Djaenal Abidin, S.Pd", mapel: "Bimbingan Konseling" },
    { nama: "Nunung Khumaidah, S.Pd", mapel: "Bhs Inggris" },
    { nama: "Gunawan, S.Si", mapel: "IPA" },
    { nama: "Dessy Wijayanti, S.Pd", mapel: "Matematika" },
    { nama: "Afti Yuni Asminingsih, S.Pd", mapel: "IPA" },
    { nama: "Akh. Taufik Robih Fauzan, S.Si", mapel: "Matematika" },
    { nama: "Tajudin, S.Pd.I", mapel: "Al Qur'an Hadits" },
    { nama: "Masyhuri, S.Pd.I", mapel: "SKI" },
    { nama: "Solikhatun, S.Pd", mapel: "Bhs Indonesia" },
    { nama: "Dina Yaniari, S.Pd", mapel: "Matematika" },
    { nama: "Azwar Anas, S.Pd", mapel: "Bhs Indonesia" },
    { nama: "Erlin Zuhaida, S.Pd.I", mapel: "BTQ & Prakarya" },
    { nama: "Hazairin Sikti, S.Pd", mapel: "Prakarya & Seni Budaya" },
    { nama: "Novia Dwi Ayuningtyas, S.Sn", mapel: "Prakarya & Seni Budaya" },
    { nama: "Rizky Oktafiani Putri, S.Pd", mapel: "Bhs Indonesia" },
    { nama: "Silfiyya Rohmah, S.Pd", mapel: "Bimbingan Konseling" },
    { nama: "Muji", mapel: "PPKn" },
    { nama: "Naelal Amami, S.Ag", mapel: "Tahfidz" },
    { nama: "Saefurrohman Wahid, S.Ag", mapel: "Al Qur'an Hadits" },
    { nama: "Berlian Muyasari Aulia, S.Pd", mapel: "Tahfidz" },
    { nama: "M. Bagus Ainun Najib, S.Pd. M.Pd", mapel: "Bhs Arab" },
];

const PEGAWAI = [
    { nama: "Mohammad Zakaria, S.Ag", jabatan: "Plt. Kepala TU" },
    { nama: "Siti Khonifah", jabatan: "Pengadministrasi" },
    { nama: "Mu'tasimah, S.Pd.I", jabatan: "Bendahara Pengeluaran" },
    { nama: "Rahmat Hidayat, S.Kom", jabatan: "Operator DIPA/BMN" },
    { nama: "Arman Hidayat, S.Kom", jabatan: "Operator EMIS/SIMPATIKA" },
    { nama: "Kris Agus Setiawan", jabatan: "Kepegawaian" },
    { nama: "Aryani", jabatan: "Keuangan Komite" },
    { nama: "Kusumaningsih", jabatan: "Perpustakaan" },
    { nama: "Khalimatuss Sa'diyah", jabatan: "Perpustakaan" },
    { nama: "Slamet Marzuki", jabatan: "Rumah Tangga" },
    { nama: "Tarmudi", jabatan: "Kebersihan" },
    { nama: "Rifqi Habibi", jabatan: "Satpam" },
    { nama: "Kusmin", jabatan: "Penjaga Malam" },
    { nama: "Firdos", jabatan: "Penjaga Malam" },
    { nama: "Dede", jabatan: "Keamanan" },
    { nama: "Trisno", jabatan: "Satpam" },
    { nama: "Febriani", jabatan: "Koperasi" },
    { nama: "Annisa", jabatan: "Koperasi" },
    { nama: "Kholil", jabatan: "Kebersihan" },
];

// ─── Mapel color system ───────────────────────────────────────

type MapelGroup =
    | "Islam"
    | "Sains"
    | "Bahasa"
    | "Sosial"
    | "Jaskes & Seni"
    | "BK"
    | "TIK";

const MAPEL_GROUP: Record<string, MapelGroup> = {
    "Al Qur'an Hadits": "Islam",
    "Fikih": "Islam",
    "SKI": "Islam",
    "Aqidah Aklaq": "Islam",
    "Tahfidz": "Islam",
    "BTQ & Prakarya": "Islam",
    "IPA": "Sains",
    "Matematika": "Sains",
    "TIK": "TIK",
    "Bhs Indonesia": "Bahasa",
    "Bhs Inggris": "Bahasa",
    "Bhs Arab": "Bahasa",
    "Bhs Jawa": "Bahasa",
    "IPS": "Sosial",
    "PPKn": "Sosial",
    "Penjaskes": "Jaskes & Seni",
    "Seni Budaya": "Jaskes & Seni",
    "Prakarya & Seni Budaya": "Jaskes & Seni",
    "Bimbingan Konseling": "BK",
};

const GROUP_STYLE: Record<MapelGroup, { badge: string; avatar: string; dot: string }> = {
    Islam: { badge: "bg-emerald-100 text-emerald-800 border-emerald-200", avatar: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
    Sains: { badge: "bg-blue-100 text-blue-800 border-blue-200", avatar: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
    Bahasa: { badge: "bg-amber-100 text-amber-800 border-amber-200", avatar: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
    Sosial: { badge: "bg-violet-100 text-violet-800 border-violet-200", avatar: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
    "Jaskes & Seni": { badge: "bg-rose-100 text-rose-800 border-rose-200", avatar: "bg-rose-100 text-rose-700", dot: "bg-rose-500" },
    BK: { badge: "bg-teal-100 text-teal-800 border-teal-200", avatar: "bg-teal-100 text-teal-700", dot: "bg-teal-500" },
    TIK: { badge: "bg-indigo-100 text-indigo-800 border-indigo-200", avatar: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
};

const ALL_GROUPS: MapelGroup[] = ["Islam", "Sains", "Bahasa", "Sosial", "Jaskes & Seni", "BK", "TIK"];

function getGroup(mapel: string): MapelGroup {
    for (const [key, group] of Object.entries(MAPEL_GROUP)) {
        if (mapel.includes(key) || key.includes(mapel)) return group;
    }
    return "Sains";
}

function getStyle(mapel: string) {
    return GROUP_STYLE[getGroup(mapel)];
}

function initials(nama: string) {
    return nama
        .replace(/^(Drs\.|Dra\.|Hj\.|H\.|Dr\.|Prof\.)\s*/gi, "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");
}

// ─── Components ──────────────────────────────────────────────

function GuruCard({ nama, mapel, nomor }: { nama: string; mapel: string; nomor: number }) {
    const style = getStyle(mapel);
    return (
        <div className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-200 flex flex-col gap-4">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                
                {/* Nomor urut */}
                <span className="ml-auto text-xs font-bold text-gray-300 tabular-nums">{String(nomor).padStart(2, "0")}</span>
            </div>

            <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 leading-snug group-hover:text-emerald-800 transition-colors">
                    {nama}
                </p>
            </div>

            <span className={`self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${style.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                {mapel}
            </span>
        </div>
    );
}

function PegawaiRow({ nama, jabatan, index }: { nama: string; jabatan: string; index: number }) {
    return (
        <div className={`flex items-center gap-4 px-5 py-3.5 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/60"} hover:bg-emerald-50/40 transition-colors`}>
            <span className="text-xs font-bold text-gray-300 w-6 tabular-nums shrink-0">{String(index + 1).padStart(2, "0")}</span>
            
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{nama}</p>
            </div>
            <span className="text-xs text-gray-500 font-medium shrink-0 text-right max-w-[160px] truncate">{jabatan}</span>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────

export default function DewanGurudankaryawan() {
    const [search, setSearch] = useState("");
    const [activeGroup, setActiveGroup] = useState<MapelGroup | "Semua">("Semua");

    const filteredGuru = useMemo(() => {
        const q = search.toLowerCase();
        return GURU.filter((g) => {
            const matchSearch = g.nama.toLowerCase().includes(q) || g.mapel.toLowerCase().includes(q);
            const matchGroup = activeGroup === "Semua" || getGroup(g.mapel) === activeGroup;
            return matchSearch && matchGroup;
        });
    }, [search, activeGroup]);

    const filteredPegawai = useMemo(() => {
        const q = search.toLowerCase();
        return PEGAWAI.filter(
            (p) => p.nama.toLowerCase().includes(q) || p.jabatan.toLowerCase().includes(q)
        );
    }, [search]);

    // Stats per group
    const groupCount = useMemo(() => {
        const counts: Partial<Record<MapelGroup, number>> = {};
        GURU.forEach((g) => {
            const gr = getGroup(g.mapel);
            counts[gr] = (counts[gr] ?? 0) + 1;
        });
        return counts;
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* ── Hero ── */}
            <section className="relative bg-white overflow-hidden">

                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2 py-10">
                        Guru dan Karyawan <span className="text-emerald-600">MAN Kota Tegal</span>
                    </h1>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 md:px-12 py-12">
                {/* ── Search ── */}
                <div className="relative mb-8">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Cari nama guru atau mata pelajaran..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-white text-gray-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                    {search && (
                        <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>
                    )}
                </div>

                {/* ── Filter chips ── */}
                <div className="flex flex-wrap gap-2 mb-10">
                    <button
                        onClick={() => setActiveGroup("Semua")}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${activeGroup === "Semua"
                                ? "bg-emerald-700 text-white border-emerald-700"
                                : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
                            }`}
                    >
                        Semua ({GURU.length})
                    </button>
                    {ALL_GROUPS.map((g) => {
                        const s = GROUP_STYLE[g];
                        const count = groupCount[g] ?? 0;
                        const isActive = activeGroup === g;
                        return (
                            <button
                                key={g}
                                onClick={() => setActiveGroup(isActive ? "Semua" : g)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${isActive ? `${s.badge} shadow-sm` : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                {g} ({count})
                            </button>
                        );
                    })}
                </div>

                {/* ── DEWAN GURU ── */}
                <section className="mb-16">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-1">Tenaga Pendidik</p>
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dewan Guru</h2>
                        </div>
                        <span className="text-sm text-gray-400">{filteredGuru.length} guru</span>
                    </div>

                    {filteredGuru.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <p className="text-3xl mb-3">🔍</p>
                            <p className="text-sm font-medium">Tidak ada guru yang cocok dengan pencarian.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredGuru.map((g, i) => (
                                <GuruCard key={g.nama} nama={g.nama} mapel={g.mapel} nomor={GURU.indexOf(g) + 1} />
                            ))}
                        </div>
                    )}
                </section>

                {/* ── PEGAWAI ── */}
                {filteredPegawai.length > 0 && (
                    <section>
                        <div className="mb-6">
                            <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-1"></p>
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Staf &amp; Karyawan</h2>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50/60">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nama</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jabatan / Tugas</span>
                            </div>
                            {filteredPegawai.map((p, i) => (
                                <PegawaiRow key={p.nama} nama={p.nama} jabatan={p.jabatan} index={i} />
                            ))}
                            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                                <p className="text-xs text-gray-400">Total {filteredPegawai.length} tenaga kependidikan</p>
                            </div>
                        </div>
                    </section>
                )}

                {filteredGuru.length === 0 && filteredPegawai.length === 0 && (
                    <div className="text-center py-24 text-gray-400">
                        <p className="text-4xl mb-4">🔍</p>
                        <p className="text-sm font-medium">Tidak ditemukan hasil untuk <span className="font-bold text-gray-600">"{search}"</span></p>
                        <button onClick={() => setSearch("")} className="mt-4 text-xs text-emerald-600 font-semibold hover:underline">Hapus pencarian</button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 mt-8 py-8 text-center text-xs text-gray-400">
                MTsN Kota Tegal · Data Dewan Guru &amp; Tenaga Kependidikan
            </footer>
        </div>
    );
}