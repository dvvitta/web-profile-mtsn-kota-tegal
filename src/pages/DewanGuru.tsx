import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://be-mtsn.vercel.app/api";

// ─── Types ────────────────────────────────────────────────────

export interface Guru {
    id: number;
    nama: string;
    foto: string | null;
    mapel: string;
    biografi: string | null;
    tglLahir: string | null;
    gender: string;
}

export interface Karyawan {
    id: number;
    nama: string;
    foto: string | null;
    jabatan: string;
    biografi: string | null;
    tglLahir: string | null;
    gender: string;
}

// ─── Mapel color system ───────────────────────────────────────

type MapelGroup = "Islam" | "Sains" | "Bahasa" | "Sosial" | "Jaskes & Seni" | "BK" | "TIK" | "Lainnya";

const MAPEL_KEYWORDS: [string, MapelGroup][] = [
    ["Qur'an", "Islam"], ["Hadits", "Islam"], ["Fikih", "Islam"], ["SKI", "Islam"],
    ["Aqidah", "Islam"], ["Tahfidz", "Islam"], ["BTQ", "Islam"], ["Arab", "Islam"],
    ["IPA", "Sains"], ["Matematika", "Sains"], ["Fisika", "Sains"], ["Kimia", "Sains"],
    ["TIK", "TIK"], ["Komputer", "TIK"],
    ["Indonesia", "Bahasa"], ["Inggris", "Bahasa"], ["Jawa", "Bahasa"],
    ["IPS", "Sosial"], ["PPKn", "Sosial"], ["Sejarah", "Sosial"],
    ["Penjaskes", "Jaskes & Seni"], ["Seni", "Jaskes & Seni"], ["Prakarya", "Jaskes & Seni"],
    ["Bimbingan", "BK"], ["Konseling", "BK"],
];

const GROUP_STYLE: Record<MapelGroup, { badge: string; avatar: string; dot: string }> = {
    Islam: { badge: "bg-emerald-100 text-emerald-800 border-emerald-200", avatar: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
    Sains: { badge: "bg-blue-100 text-blue-800 border-blue-200", avatar: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
    Bahasa: { badge: "bg-amber-100 text-amber-800 border-amber-200", avatar: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
    Sosial: { badge: "bg-violet-100 text-violet-800 border-violet-200", avatar: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
    "Jaskes & Seni": { badge: "bg-rose-100 text-rose-800 border-rose-200", avatar: "bg-rose-100 text-rose-700", dot: "bg-rose-500" },
    BK: { badge: "bg-teal-100 text-teal-800 border-teal-200", avatar: "bg-teal-100 text-teal-700", dot: "bg-teal-500" },
    TIK: { badge: "bg-indigo-100 text-indigo-800 border-indigo-200", avatar: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
    Lainnya: { badge: "bg-gray-100 text-gray-700 border-gray-200", avatar: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
};

const ALL_GROUPS: MapelGroup[] = ["Islam", "Sains", "Bahasa", "Sosial", "Jaskes & Seni", "BK", "TIK", "Lainnya"];

function getGroup(mapel: string): MapelGroup {
    for (const [kw, group] of MAPEL_KEYWORDS) {
        if (mapel.toLowerCase().includes(kw.toLowerCase())) return group;
    }
    return "Lainnya";
}

function getStyle(mapel: string) { return GROUP_STYLE[getGroup(mapel)]; }

function initials(nama: string) {
    return nama
        .replace(/^(Drs\.|Dra\.|Hj\.|H\.|Dr\.|Prof\.)\s*/gi, "")
        .split(" ").filter(Boolean).slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "").join("");
}

// ─── Guru Card → navigasi ke /guru/:id ───────────────────────

function GuruCard({ guru, nomor }: { guru: Guru; nomor: number }) {
    const style = getStyle(guru.mapel);
    return (
        <Link
            to={`/guru/${guru.id}`}                   // ← navigasi ke halaman detail
            className="group bg-white border border-gray-100 rounded-2xl p-5
                       hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5
                       transition-all duration-200 flex flex-col gap-4"
        >
            <div className="flex items-start gap-3">
                {/* Foto / Avatar */}
                <div className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center
                                 ${!guru.foto ? style.avatar : ""}`}>
                    {guru.foto
                        ? <img src={guru.foto} alt={guru.nama}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        : <span className="text-sm font-bold">{initials(guru.nama)}</span>
                    }
                </div>
                <div className="ml-auto flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-bold text-gray-300 tabular-nums">
                        {String(nomor).padStart(2, "0")}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded
                                     ${guru.gender === "L" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600"}`}>
                        {guru.gender === "L" ? "L" : "P"}
                    </span>
                </div>
            </div>

            <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 leading-snug
                              group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {guru.nama}
                </p>
                {guru.biografi && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                        {guru.biografi}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                                  text-xs font-semibold border ${style.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {guru.mapel}
                </span>
                {/* Indikator navigasi */}
                <span className="text-gray-300 group-hover:text-emerald-500 transition-colors text-sm">→</span>
            </div>
        </Link>
    );
}

// ─── Skeleton ─────────────────────────────────────────────────

function SkeletonCard() {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse flex flex-col gap-4">
            <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100" />
                <div className="ml-auto w-6 h-4 bg-gray-100 rounded" />
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
            <div className="h-6 bg-gray-100 rounded-lg w-24" />
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────

export default function DewanGuru() {
    const [guru, setGuru] = useState<Guru[]>([]);
    const [karyawan, setKaryawan] = useState<Karyawan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [activeGroup, setActiveGroup] = useState<MapelGroup | "Semua">("Semua");

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            setError(null);
            try {
                const [gRes, kRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/guru`),
                    fetch(`${API_BASE_URL}/api/karyawan`),
                ]);
                const gData = await gRes.json();
                const kData = await kRes.json();
                if (gData.success) setGuru(gData.data);
                if (kData.success) setKaryawan(kData.data);
                if (!gData.success && !kData.success)
                    setError("Gagal memuat data. Pastikan backend berjalan.");
            } catch {
                setError("Tidak dapat terhubung ke server.");
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const filteredGuru = useMemo(() => {
        const q = search.toLowerCase();
        return guru.filter((g) => {
            const matchSearch =
                g.nama.toLowerCase().includes(q) || g.mapel.toLowerCase().includes(q);
            const matchGroup =
                activeGroup === "Semua" || getGroup(g.mapel) === activeGroup;
            return matchSearch && matchGroup;
        });
    }, [guru, search, activeGroup]);

    const filteredKaryawan = useMemo(() => {
        const q = search.toLowerCase();
        return karyawan.filter(
            (k) => k.nama.toLowerCase().includes(q) || k.jabatan.toLowerCase().includes(q)
        );
    }, [karyawan, search]);

    const groupCount = useMemo(() => {
        const counts: Partial<Record<MapelGroup, number>> = {};
        guru.forEach((g) => {
            const gr = getGroup(g.mapel);
            counts[gr] = (counts[gr] ?? 0) + 1;
        });
        return counts;
    }, [guru]);

    const noResult = filteredGuru.length === 0 && filteredKaryawan.length === 0;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* ── Hero ── */}
            <section className="relative bg-emerald-900 text-white overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1400&auto=format')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 to-emerald-950" />
                <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-20">
                    <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-3">
                        MTsN Kota Tegal
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 tracking-tight">
                        Dewan Guru &amp; Tenaga<br className="hidden md:block" /> Kependidikan
                    </h1>
                    <p className="text-emerald-200/80 text-base max-w-xl leading-relaxed mb-10">
                        Para pendidik berdedikasi yang membimbing generasi amanah dan berprestasi di MTsN Kota Tegal.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: "Tenaga Pendidik", value: guru.length },
                            { label: "Tenaga Kependidikan", value: karyawan.length },
                            { label: "Bidang Studi", value: new Set(guru.map((g) => g.mapel)).size },
                        ].map((s) => (
                            <div key={s.label}
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 flex items-center gap-3">
                                <span className="text-2xl font-bold">{loading ? "—" : s.value}</span>
                                <span className="text-xs text-emerald-200 leading-tight max-w-[72px]">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-6 md:px-12 py-12">

                {/* Error */}
                {error && (
                    <div className="mb-8 text-sm px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                        {error}
                    </div>
                )}

                {/* ── Search ── */}
                <div className="relative mb-6">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Cari nama guru atau mata pelajaran..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl bg-white
                                   text-gray-800 outline-none focus:border-emerald-500 focus:ring-2
                                   focus:ring-emerald-100 transition-all"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >✕</button>
                    )}
                </div>

                {/* ── Filter chips ── */}
                <div className="flex flex-wrap gap-2 mb-10">
                    <button
                        onClick={() => setActiveGroup("Semua")}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors
                                    ${activeGroup === "Semua"
                                ? "bg-emerald-700 text-white border-emerald-700"
                                : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"}`}
                    >
                        Semua ({guru.length})
                    </button>
                    {ALL_GROUPS.filter((g) => (groupCount[g] ?? 0) > 0).map((g) => {
                        const s = GROUP_STYLE[g];
                        const isActive = activeGroup === g;
                        return (
                            <button
                                key={g}
                                onClick={() => setActiveGroup(isActive ? "Semua" : g)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors
                                            ${isActive
                                        ? `${s.badge} shadow-sm`
                                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}
                            >
                                {g} ({groupCount[g] ?? 0})
                            </button>
                        );
                    })}
                </div>

                {/* ── DEWAN GURU ── */}
                <section className="mb-16">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-1">
                                Tenaga Pendidik
                            </p>
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dewan Guru</h2>
                        </div>
                        <span className="text-sm text-gray-400">
                            {loading ? "Memuat..." : `${filteredGuru.length} guru`}
                        </span>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : filteredGuru.length === 0 && !noResult ? (
                        <div className="text-center py-16 text-gray-400">
                            <p className="text-3xl mb-3">🔍</p>
                            <p className="text-sm font-medium">Tidak ada guru yang cocok dengan filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredGuru.map((g, i) => (
                                <GuruCard key={g.id} guru={g} nomor={i + 1} />
                            ))}
                        </div>
                    )}
                </section>

                {/* ── KARYAWAN ── */}
                {filteredKaryawan.length > 0 && (
                    <section>
                        <div className="mb-6">
                            <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-1">
                                Tenaga Kependidikan
                            </p>
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Staf &amp; Pegawai</h2>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/60">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nama</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jabatan</span>
                            </div>

                            {filteredKaryawan.map((k, i) => (
                                // ← Link ke halaman detail karyawan
                                <Link
                                    key={k.id}
                                    to={`/karyawan/${k.id}`}
                                    className={`flex items-center gap-4 px-5 py-3.5 hover:bg-emerald-50/40 transition-colors group
                                                ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                                >
                                    <span className="text-xs font-bold text-gray-300 w-6 tabular-nums shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className="w-9 h-9 rounded-lg overflow-hidden bg-emerald-100 text-emerald-700
                                                    flex items-center justify-center text-xs font-bold shrink-0">
                                        {k.foto
                                            ? <img src={k.foto} alt={k.nama} className="w-full h-full object-cover" />
                                            : initials(k.nama) || k.nama[0]?.toUpperCase()
                                        }
                                    </div>
                                    <p className="flex-1 text-sm font-semibold text-gray-900 truncate
                                                  group-hover:text-emerald-800 transition-colors">
                                        {k.nama}
                                    </p>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="text-xs text-gray-500 font-medium max-w-[160px] truncate">
                                            {k.jabatan}
                                        </span>
                                        <span className="text-gray-300 group-hover:text-emerald-500 transition-colors text-sm">
                                            →
                                        </span>
                                    </div>
                                </Link>
                            ))}

                            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                                <p className="text-xs text-gray-400">
                                    Total {filteredKaryawan.length} tenaga kependidikan
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* No result */}
                {!loading && noResult && (
                    <div className="text-center py-24 text-gray-400">
                        <p className="text-4xl mb-4">🔍</p>
                        <p className="text-sm font-medium">
                            Tidak ditemukan hasil untuk{" "}
                            <span className="font-bold text-gray-600">"{search}"</span>
                        </p>
                        <button
                            onClick={() => setSearch("")}
                            className="mt-4 text-xs text-emerald-600 font-semibold hover:underline"
                        >
                            Hapus pencarian
                        </button>
                    </div>
                )}
            </main>

            <footer className="border-t border-gray-200 mt-8 py-8 text-center text-xs text-gray-400">
                MTsN Kota Tegal · Data Dewan Guru &amp; Tenaga Kependidikan
            </footer>
        </div>
    );
}