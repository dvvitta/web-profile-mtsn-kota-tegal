import React, { useState, useEffect, type FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ============================================================
// KONFIGURASI
// ============================================================
// Using a fallback for the sandbox environment to avoid import.meta errors
const API_BASE_URL = "http://localhost:3000";
// ============================================================

interface Kategori {
    id: number;
    nama: string;
    slug: string;
}

interface Berita {
    id: number;
    judul: string;
    slug: string;
    ringkasan: string | null;
    thumbnail: string | null;
    isi: string;
    published: boolean;
    createdAt: string;
    kategori: Kategori;
    user: { id: number; nama: string };
}

type Tab = "berita" | "kategori";

function authHeaders(token: string) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

const IconNews = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
    </svg>
);

const IconFolder = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
);

const IconTrash = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />
    </svg>
);

export default function DashboardPage() {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>("");
    const [tab, setTab] = useState<Tab>("berita");

    const [berita, setBerita] = useState<Berita[]>([]);
    const [kategori, setKategori] = useState<Kategori[]>([]);
    const [loadingList, setLoadingList] = useState(true);
    const [listError, setListError] = useState<string | null>(null);

    // Form berita
    const [judul, setJudul] = useState("");
    const [ringkasan, setRingkasan] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [isi, setIsi] = useState("");
    const [kategoriId, setKategoriId] = useState("");
    const [beritaSubmitting, setBeritaSubmitting] = useState(false);
    const [beritaAlert, setBeritaAlert] = useState<{ type: "error" | "success"; message: string } | null>(null);

    // Form kategori
    const [namaKategori, setNamaKategori] = useState("");
    const [kategoriSubmitting, setKategoriSubmitting] = useState(false);
    const [kategoriAlert, setKategoriAlert] = useState<{ type: "error" | "success"; message: string } | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!storedToken) {
            navigate("/login");
            return;
        }

        setToken(storedToken);
        if (storedUser) {
            try {
                setUserName(JSON.parse(storedUser).nama ?? "");
            } catch {
                // abaikan jika parsing gagal
            }
        }

        fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.success) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                }
            })
            .catch(() => { });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const fetchData = useCallback(async () => {
        setLoadingList(true);
        setListError(null);
        try {
            const [beritaRes, kategoriRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/berita`),
                fetch(`${API_BASE_URL}/api/kategori`),
            ]);
            const beritaData = await beritaRes.json();
            const kategoriData = await kategoriRes.json();

            if (beritaData.success) setBerita(beritaData.data);
            if (kategoriData.success) setKategori(kategoriData.data);

            if (!beritaData.success || !kategoriData.success) {
                setListError("Sebagian data gagal dimuat.");
            }
        } catch (err) {
            console.error(err);
            setListError("Tidak dapat terhubung ke server.");
        } finally {
            setLoadingList(false);
        }
    }, []);

    useEffect(() => {
        if (token) fetchData();
    }, [token, fetchData]);

    const handleCreateBerita = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setBeritaAlert(null);

        if (!judul.trim() || !isi.trim() || !kategoriId) {
            setBeritaAlert({ type: "error", message: "Judul, isi, dan kategori wajib diisi." });
            return;
        }
        if (!token) return;

        setBeritaSubmitting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/berita`, {
                method: "POST",
                headers: authHeaders(token),
                body: JSON.stringify({
                    judul: judul.trim(),
                    ringkasan: ringkasan.trim() || undefined,
                    thumbnail: thumbnail.trim() || undefined,
                    isi: isi.trim(),
                    kategoriId,
                }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                setBeritaAlert({ type: "error", message: data.message || "Gagal membuat berita." });
                return;
            }

            setBeritaAlert({ type: "success", message: "Berita berhasil dipublikasikan." });
            setJudul("");
            setRingkasan("");
            setThumbnail("");
            setIsi("");
            setKategoriId("");
            fetchData();
        } catch (err) {
            console.error(err);
            setBeritaAlert({ type: "error", message: "Tidak dapat terhubung ke server." });
        } finally {
            setBeritaSubmitting(false);
        }
    };

    const handleDeleteBerita = async (id: number) => {
        if (!token) return;
        if (!confirm("Hapus berita ini?")) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/berita/${id}`, {
                method: "DELETE",
                headers: authHeaders(token),
            });
            const data = await res.json();
            if (data.success) fetchData();
            else alert(data.message || "Gagal menghapus berita.");
        } catch (err) {
            console.error(err);
            alert("Tidak dapat terhubung ke server.");
        }
    };

    const handleCreateKategori = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setKategoriAlert(null);

        if (!namaKategori.trim()) {
            setKategoriAlert({ type: "error", message: "Nama kategori wajib diisi." });
            return;
        }
        if (!token) return;

        setKategoriSubmitting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/kategori`, {
                method: "POST",
                headers: authHeaders(token),
                body: JSON.stringify({ nama: namaKategori.trim() }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                setKategoriAlert({ type: "error", message: data.message || "Gagal membuat kategori." });
                return;
            }

            setKategoriAlert({ type: "success", message: "Kategori berhasil dibuat." });
            setNamaKategori("");
            fetchData();
        } catch (err) {
            console.error(err);
            setKategoriAlert({ type: "error", message: "Tidak dapat terhubung ke server." });
        } finally {
            setKategoriSubmitting(false);
        }
    };

    const handleDeleteKategori = async (id: number) => {
        if (!token) return;
        if (!confirm("Hapus kategori ini? Berita dengan kategori ini bisa terpengaruh.")) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/kategori/${id}`, {
                method: "DELETE",
                headers: authHeaders(token),
            });
            const data = await res.json();
            if (data.success) fetchData();
            else alert(data.message || "Gagal menghapus kategori.");
        } catch (err) {
            console.error(err);
            alert("Tidak dapat terhubung ke server.");
        }
    };

    if (!token) return null; // Sedang redirect ke /login

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">

            {/* SIDEBAR */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shadow-xl z-10 flex-shrink-0">
                <div>
                    <div className="p-6 border-b border-slate-800">
                        <h2 className="text-xl font-bold text-white tracking-tight">Admin Portal</h2>
                        <p className="text-xs text-slate-400 mt-1">MTsN Kota Tegal</p>
                    </div>
                    <nav className="p-4 space-y-2 mt-4">
                        <button
                            onClick={() => setTab("berita")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${tab === "berita"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                : "hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <IconNews />
                            <span className="font-medium">Manajemen Berita</span>
                        </button>
                        <button
                            onClick={() => setTab("kategori")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${tab === "kategori"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                : "hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <IconFolder />
                            <span className="font-medium">Kategori Topik</span>
                        </button>
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-800 m-4 rounded-2xl bg-slate-800/50">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                            {userName ? userName.charAt(0).toUpperCase() : "A"}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">{userName || "Admin"}</p>
                            <p className="text-xs text-slate-400">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 py-2 rounded-lg transition-colors font-medium text-center"
                    >
                        Keluar Sesi
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">

                {/* Header Content */}
                <header className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
                    <h1 className="text-2xl font-bold text-slate-800">
                        {tab === "berita" ? "Manajemen Berita" : "Kategori Topik"}
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        {tab === "berita"
                            ? "Tulis, edit, dan kelola publikasi berita sekolah."
                            : "Kelola label kategori untuk mengelompokkan berita."}
                    </p>
                </header>

                {/* Scrollable Content Body */}
                <div className="flex-1 overflow-y-auto p-8">
                    {listError && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
                            <span className="font-semibold">Error:</span> {listError}
                        </div>
                    )}

                    { }
                    {tab === "berita" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* KOLOM KIRI: FORM */}
                            <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                                <h2 className="text-lg font-bold border-b border-slate-100 pb-4 mb-6">Tulis Berita Baru</h2>

                                {beritaAlert && (
                                    <div className={`mb-6 p-4 rounded-xl text-sm font-medium border ${beritaAlert.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                        }`}>
                                        {beritaAlert.message}
                                    </div>
                                )}

                                <form onSubmit={handleCreateBerita} className="space-y-5">
                                    <div>
                                        <label htmlFor="judul" className="block text-sm font-semibold text-slate-700 mb-1.5">Judul Berita</label>
                                        <input
                                            id="judul" value={judul} onChange={(e) => setJudul(e.target.value)}
                                            placeholder="Masukkan judul berita yang menarik..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="kategoriId" className="block text-sm font-semibold text-slate-700 mb-1.5">Kategori</label>
                                            <select
                                                id="kategoriId" value={kategoriId} onChange={(e) => setKategoriId(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 bg-white"
                                            >
                                                <option value="">-- Pilih Kategori --</option>
                                                {kategori.map((k) => (
                                                    <option key={k.id} value={k.id}>{k.nama}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="thumbnail" className="block text-sm font-semibold text-slate-700 mb-1.5">URL Thumbnail (Opsional)</label>
                                            <input
                                                id="thumbnail" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)}
                                                placeholder="https://contoh.com/gambar.jpg"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="ringkasan" className="block text-sm font-semibold text-slate-700 mb-1.5">Ringkasan Singkat (Opsional)</label>
                                        <input
                                            id="ringkasan" value={ringkasan} onChange={(e) => setRingkasan(e.target.value)}
                                            placeholder="Ringkasan 1-2 kalimat untuk preview..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="isi" className="block text-sm font-semibold text-slate-700 mb-1.5">Isi Berita</label>
                                        <textarea
                                            id="isi" value={isi} onChange={(e) => setIsi(e.target.value)} rows={10}
                                            placeholder="Tulis paragraf berita Anda di sini..."
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 resize-y"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={beritaSubmitting}
                                            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm shadow-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {beritaSubmitting ? "Menyimpan Berita..." : "Publikasikan Berita"}
                                        </button>
                                    </div>
                                </form>
                            </section>

                            {/* KOLOM KANAN: DAFTAR BERITA */}
                            <section className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col max-h-[800px]">
                                <div className="p-6 border-b border-slate-100 shrink-0">
                                    <h2 className="text-lg font-bold text-slate-800">Daftar Publikasi</h2>
                                    <p className="text-xs text-slate-500 mt-1">Berita yang telah diterbitkan</p>
                                </div>

                                <div className="p-4 overflow-y-auto flex-1">
                                    {loadingList ? (
                                        <div className="flex justify-center items-center h-32">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        </div>
                                    ) : berita.length === 0 ? (
                                        <div className="text-center py-10 px-4">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-3">
                                                <IconNews />
                                            </div>
                                            <p className="text-sm font-medium text-slate-600">Belum ada berita</p>
                                            <p className="text-xs text-slate-400 mt-1">Berita yang Anda publikasikan akan muncul di sini.</p>
                                        </div>
                                    ) : (
                                        <ul className="space-y-3">
                                            {berita.map((b) => (
                                                <li key={b.id} className="group p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all flex flex-col gap-3">
                                                    <div>
                                                        <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 leading-snug">{b.judul}</h3>
                                                        <div className="flex items-center gap-2 mt-2 text-[11px] font-medium text-slate-500">
                                                            <span className="bg-slate-200/70 px-2 py-0.5 rounded-md text-slate-600">{b.kategori?.nama}</span>
                                                            <span>&middot;</span>
                                                            <span>{b.user?.nama}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end border-t border-slate-200 pt-3 mt-1">
                                                        <button
                                                            onClick={() => handleDeleteBerita(b.id)}
                                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                                                        >
                                                            <IconTrash /> Hapus
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </section>
                        </div>
                    )}

                    { }
                    {tab === "kategori" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">

                            {/* FORM KATEGORI */}
                            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-fit">
                                <h2 className="text-lg font-bold border-b border-slate-100 pb-4 mb-6">Tambah Kategori Baru</h2>

                                {kategoriAlert && (
                                    <div className={`mb-6 p-4 rounded-xl text-sm font-medium border ${kategoriAlert.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                        }`}>
                                        {kategoriAlert.message}
                                    </div>
                                )}

                                <form onSubmit={handleCreateKategori} className="space-y-5">
                                    <div>
                                        <label htmlFor="namaKategori" className="block text-sm font-semibold text-slate-700 mb-1.5">Nama Kategori</label>
                                        <input
                                            id="namaKategori" value={namaKategori} onChange={(e) => setNamaKategori(e.target.value)}
                                            placeholder="Misal: Prestasi, Pengumuman, Ekstrakurikuler..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={kategoriSubmitting}
                                        className="w-full px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm shadow-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {kategoriSubmitting ? "Menyimpan..." : "Simpan Kategori"}
                                    </button>
                                </form>
                            </section>

                            {/* DAFTAR KATEGORI */}
                            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-fit max-h-[600px]">
                                <div className="p-6 border-b border-slate-100 shrink-0">
                                    <h2 className="text-lg font-bold text-slate-800">Daftar Kategori</h2>
                                    <p className="text-xs text-slate-500 mt-1">Kelola kategori yang sudah ada</p>
                                </div>

                                <div className="p-4 overflow-y-auto">
                                    {loadingList ? (
                                        <div className="flex justify-center items-center h-20">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                        </div>
                                    ) : kategori.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-sm text-slate-500">Belum ada kategori terdaftar.</p>
                                        </div>
                                    ) : (
                                        <ul className="space-y-2">
                                            {kategori.map((k) => (
                                                <li key={k.id} className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm bg-slate-50 hover:bg-white transition-all">
                                                    <div>
                                                        <p className="font-semibold text-slate-800 text-sm">{k.nama}</p>
                                                        <p className="text-xs text-slate-400 mt-0.5 font-mono">/{k.slug}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteKategori(k.id)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Hapus Kategori"
                                                    >
                                                        <IconTrash />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </section>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}