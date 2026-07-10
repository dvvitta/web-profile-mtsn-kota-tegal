import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// Import ikon yang diperlukan dari lucide-react
import {
    BookOpen,
    Briefcase,
    Calendar,
    User,
    ArrowLeft,
    GraduationCap,
    Users,
    Quote
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://be-mtsn.vercel.app/";

// ─── Types ────────────────────────────────────────────────────

interface Guru {
    id: number;
    nama: string;
    foto: string | null;
    mapel: string;
    biografi: string | null;
    tglLahir: string | null;
    gender: string;
    createdAt: string;
}

interface Karyawan {
    id: number;
    nama: string;
    foto: string | null;
    jabatan: string;
    biografi: string | null;
    tglLahir: string | null;
    gender: string;
    createdAt: string;
}

type Jenis = "guru" | "karyawan";
type Person = Guru | Karyawan;

// ─── Helpers ─────────────────────────────────────────────────

type MapelGroup =
    | "Islam" | "Sains" | "Bahasa" | "Sosial"
    | "Jaskes & Seni" | "BK" | "TIK" | "Lainnya";

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

// GROUP_STYLE sekarang menyimpan komponen ikon Lucide, bukan emoji string
const GROUP_STYLE: Record<MapelGroup, { badge: string; icon: React.ComponentType<any> }> = {
    Islam: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200/60", icon: GraduationCap },
    Sains: { badge: "bg-blue-50 text-blue-700 border-blue-200/60", icon: BookOpen },
    Bahasa: { badge: "bg-amber-50 text-amber-700 border-amber-200/60", icon: BookOpen },
    Sosial: { badge: "bg-violet-50 text-violet-700 border-violet-200/60", icon: BookOpen },
    "Jaskes & Seni": { badge: "bg-rose-50 text-rose-700 border-rose-200/60", icon: BookOpen },
    BK: { badge: "bg-teal-50 text-teal-700 border-teal-200/60", icon: Users },
    TIK: { badge: "bg-indigo-50 text-indigo-700 border-indigo-200/60", icon: BookOpen },
    Lainnya: { badge: "bg-gray-50 text-gray-600 border-gray-200/60", icon: Briefcase },
};

function getGroup(label: string): MapelGroup {
    for (const [kw, group] of MAPEL_KEYWORDS) {
        if (label.toLowerCase().includes(kw.toLowerCase())) return group;
    }
    return "Lainnya";
}

function formatTglLengkap(iso: string | null) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString("id-ID", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
}

function hitungUsia(iso: string | null) {
    if (!iso) return null;
    const diff = Date.now() - new Date(iso).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function initials(nama: string) {
    return nama
        .replace(/^(Drs\.|Dra\.|Hj\.|H\.|Dr\.|Prof\.)\s*/gi, "")
        .split(" ").filter(Boolean).slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "").join("");
}

// ─── Skeleton ─────────────────────────────────────────────────

function Skeleton() {
    return (
        <div className="min-h-screen bg-slate-50/50 animate-pulse">
            <div className="h-64 bg-slate-200 w-full" />
            <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-10">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-slate-200 border-4 border-white shadow-xl mb-6" />
                <div className="h-8 bg-slate-200 rounded-lg w-72 mb-4" />
                <div className="h-4 bg-slate-200 rounded-md w-40 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <div className="h-4 bg-slate-200 rounded w-full" />
                        <div className="h-4 bg-slate-200 rounded w-5/6" />
                        <div className="h-4 bg-slate-200 rounded w-4/6" />
                    </div>
                    <div className="h-40 bg-slate-200 rounded-2xl" />
                </div>
            </div>
        </div>
    );
}

// ─── Info Row (Interaktif & Menggunakan Lucide Icon) ─────────────────────────────────────────────────

interface InfoRowProps {
    icon: React.ComponentType<any>;
    label: string;
    value: string;
}

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
    return (
        <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0 group/row">
            {/* Box Icon interaktif: sedikit berotasi dan membesar saat row di-hover */}
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover/row:bg-emerald-600 group-hover/row:text-white group-hover/row:scale-110 group-hover/row:rotate-3 shadow-sm shadow-emerald-600/5">
                <Icon className="w-5 h-5 transition-transform duration-300" strokeWidth={2.2} />
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-slate-800 group-hover/row:text-emerald-700 transition-colors duration-200">{value}</p>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────

export default function PersonDetail({ jenis }: { jenis: Jenis }) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [person, setPerson] = useState<Person | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isGuru = jenis === "guru";

    useEffect(() => {
        if (!id) return;
        const fetch_ = async () => {
            setLoading(true);
            setError(null);
            setNotFound(false);
            try {
                const res = await fetch(`${API_BASE_URL}/api/${jenis}/${id}`);
                const data = await res.json();
                if (res.status === 404 || !data.success) { setNotFound(true); return; }
                setPerson(data.data);
            } catch {
                setError("Tidak dapat terhubung ke server.");
            } finally {
                setLoading(false);
            }
        };
        fetch_();
    }, [id, jenis]);

    if (loading) return <Skeleton />;

    if (notFound) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
                <div className="text-center max-w-sm bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100">
                    <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <User className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">
                        {isGuru ? "Guru" : "Karyawan"} Tidak Ditemukan
                    </h1>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                        Data yang kamu cari mungkin sudah dihapus atau ID-nya salah.
                    </p>
                    <Link
                        to="/guru"
                        className="inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all duration-200"
                    >
                        Kembali ke Daftar
                    </Link>
                </div>
            </div>
        );
    }

    if (error || !person) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
                <div className="text-center max-w-sm bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-semibold text-red-600 mb-6">{error || "Terjadi kesalahan."}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 justify-center w-full"
                    >
                        <ArrowLeft className="w-4 h-4" /> Kembali
                    </button>
                </div>
            </div>
        );
    }

    // ── Computed ──
    const label = isGuru ? (person as Guru).mapel : (person as Karyawan).jabatan;
    const group = isGuru ? getGroup(label) : "Lainnya";
    const style = GROUP_STYLE[group];
    const BadgeIcon = style.icon; // Komponen ikon dinamis untuk badge luar
    const MainIcon = isGuru ? BookOpen : Briefcase; // Penentu ikon dasar kategori utama

    const usia = hitungUsia(person.tglLahir);
    const tglFmt = formatTglLengkap(person.tglLahir);
    const genderLabel = person.gender === "L" ? "Laki-laki" : "Perempuan";

    const infoRows = [
        isGuru
            ? { icon: BookOpen, label: "Mata Pelajaran", value: label }
            : { icon: Briefcase, label: "Jabatan / Tugas", value: label },
        { icon: User, label: "Gender", value: genderLabel },
        tglFmt
            ? { icon: Calendar, label: "Tanggal Lahir", value: `${tglFmt}${usia ? ` (${usia} tahun)` : ""}` }
            : null,
    ].filter(Boolean) as { icon: React.ComponentType<any>; label: string; value: string }[];

    return (
        <div className="min-h-screen bg-slate-50/60 font-sans antialiased text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">

            {/* ── Cover Banner (Modern Gradient Emerald Theme) ── */}
            <div className="relative h-64 md:h-80 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 overflow-hidden group">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[100%] rounded-full bg-teal-400/15 blur-[100px]" />

                {/* Floating Large Vector Icon (Berputar pelan secara interaktif saat cover dilewati cursor) */}
                <div className="absolute top-12 right-12 text-white opacity-[0.04] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 pointer-events-none select-none">
                    <MainIcon className="w-52 h-52" strokeWidth={1} />
                </div>

                {/* Back button */}
                <div className="absolute top-6 left-6 md:left-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 border border-white/10 shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Kembali
                    </button>
                </div>

                {/* Label chip kanan atas */}
                <div className="absolute top-6 right-6 md:right-10">
                    <span className="text-[11px] font-extrabold tracking-wider uppercase bg-emerald-500/20 backdrop-blur-md text-emerald-200 border border-emerald-400/20 px-3.5 py-2 rounded-xl">
                        {isGuru ? "Tenaga Pendidik" : "Tenaga Kependidikan"}
                    </span>
                </div>
            </div>

            {/* ── Content Container ── */}
            <div className="max-w-4xl mx-auto px-6 md:px-10">

                {/* ── Profile Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-20 md:-mt-24 mb-10 relative z-10">
                    <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl border-4 border-white shadow-2xl overflow-hidden shrink-0 bg-white transition-transform duration-300 hover:scale-[1.02]">
                        {person.foto ? (
                            <img src={person.foto} alt={person.nama} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center">
                                <span className="text-4xl md:text-5xl font-extrabold text-white tracking-wider">{initials(person.nama)}</span>
                            </div>
                        )}
                    </div>

                    {/* Nama + Badge */}
                    <div className="pb-2 flex-1">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border mb-3 shadow-sm ${style.badge}`}>
                            <BadgeIcon className="w-3.5 h-3.5" strokeWidth={2.5} /> {label}
                        </span>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">{person.nama}</h1>
                        <p className={`text-sm font-bold mt-1.5 ${person.gender === "L" ? "text-blue-600" : "text-rose-600"}`}>
                            {genderLabel}
                            {usia && <span className="text-slate-400 font-normal"> · {usia} tahun</span>}
                        </p>
                    </div>
                </div>

                {/* ── Grid Layout ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-24">

                    {/* ── Bagian Kiri (Biografi & Quote) ── */}
                    <div className="md:col-span-2 space-y-6">
                        {/* <section className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
                            <h2 className="text-sm font-extrabold text-slate-900 mb-5 flex items-center gap-2.5 tracking-wide uppercase">
                                <span className="w-1.5 h-4 bg-emerald-600 rounded-full inline-block" />
                                Biografi Lengkap
                            </h2>
                            {person.biografi ? (
                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
                                    {person.biografi}
                                </p>
                            ) : (
                                <p className="text-sm text-slate-400 italic font-medium py-2">Belum ada biografi yang ditambahkan untuk profil ini.</p>
                            )}
                        </section> */}

                        {/* Quote Dekoratif Estetik */}
                        {person.biografi && (
                            <div className="relative bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-emerald-900/10 overflow-hidden group/quote">
                                <div className="absolute right-6 bottom-[-10px] text-white opacity-[0.03] pointer-events-none select-none transition-transform duration-500 group-hover/quote:translate-x-[-10px]">
                                    <Quote className="w-32 h-32 rotate-180" />
                                </div>
                                <div className="text-emerald-300 opacity-60 mb-2">
                                    <Quote className="w-6 h-6" fill="currentColor" />
                                </div>
                                <p className="text-sm leading-relaxed font-medium text-emerald-50/90 italic pl-2 line-clamp-3">
                                    {person.biografi}
                                </p>
                                <p className="text-xs font-bold mt-5 tracking-wide text-emerald-300 flex items-center gap-2 pl-2">
                                    <span className="w-4 h-[1px] bg-emerald-400" /> {person.nama.split(" ").slice(0, 2).join(" ")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ── Bagian Kanan (Info Card) ── */}
                    <div className="space-y-5">
                        <section className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                            <h2 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Detail Informasi</h2>
                            <div className="divide-y divide-slate-50">
                                {infoRows.map((row) => (
                                    <InfoRow key={row.label} icon={row.icon} label={row.label} value={row.value} />
                                ))}
                            </div>
                        </section>

                        <Link
                            to="/DewanGurudankaryawan"
                            className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 shadow-md shadow-emerald-700/10 hover:shadow-lg hover:shadow-emerald-600/20 transition-all duration-200 active:scale-[0.99]"
                        >
                            Lihat Semua {isGuru ? "Guru" : "Karyawan"}
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}