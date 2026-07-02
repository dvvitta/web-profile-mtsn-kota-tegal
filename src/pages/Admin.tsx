import React, { useState, useEffect, type FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

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
type AlertState = { type: "error" | "success"; message: string } | null;

function authHeaders(token: string) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

// ─── Reusable field components ───────────────────────────────

const inputClass =
    "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 outline-none focus:border-emerald-600 focus:bg-white transition-colors";

function Alert({ alert }: { alert: AlertState }) {
    if (!alert) return null;
    return (
        <div
            className={`text-sm px-3.5 py-2.5 rounded-lg mb-4 border ${alert.type === "error"
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-emerald-50 border-emerald-200 text-emerald-800"
                }`}
        >
            {alert.message}
        </div>
    );
}

function SkeletonList() {
    return (
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="p-3.5 border border-gray-100 rounded-lg animate-pulse">
                    <div className="h-3.5 bg-gray-100 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
            ))}
        </div>
    );
}

// ─── Modal Edit Berita ────────────────────────────────────────

interface EditModalProps {
    berita: Berita;
    kategoriList: Kategori[];
    token: string;
    onClose: () => void;
    onSuccess: () => void;
}

function EditBeritaModal({ berita, kategoriList, token, onClose, onSuccess }: EditModalProps) {
    const [judul, setJudul] = useState(berita.judul);
    const [ringkasan, setRingkasan] = useState(berita.ringkasan ?? "");
    const [thumbnail, setThumbnail] = useState(berita.thumbnail ?? "");
    const [isi, setIsi] = useState(berita.isi);
    const [kategoriId, setKategoriId] = useState(String(berita.kategori?.id ?? ""));
    const [submitting, setSubmitting] = useState(false);
    const [alert, setAlert] = useState<AlertState>(null);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlert(null);

        if (!judul.trim() || !isi.trim() || !kategoriId) {
            setAlert({ type: "error", message: "Judul, isi, dan kategori wajib diisi." });
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/berita/${berita.id}`, {
                method: "PUT",
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
                setAlert({ type: "error", message: data.message || "Gagal menyimpan perubahan." });
                return;
            }

            setAlert({ type: "success", message: "Berita berhasil diperbarui." });
            setTimeout(() => { onSuccess(); onClose(); }, 700);
        } catch {
            setAlert({ type: "error", message: "Tidak dapat terhubung ke server." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/50 backdrop-blur-sm p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border border-gray-200 shadow-2xl shadow-black/10 animate-[modal-in_0.18s_ease]">
                {/* Modal header */}
                <div className="flex justify-between items-center px-6 pt-5 pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Edit Berita</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-lg leading-none"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal body */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    <Alert alert={alert} />

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Judul</label>
                        <input className={inputClass} value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Judul berita" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Kategori</label>
                        <select className={inputClass} value={kategoriId} onChange={(e) => setKategoriId(e.target.value)}>
                            <option value="">Pilih kategori</option>
                            {kategoriList.map((k) => (
                                <option key={k.id} value={k.id}>{k.nama}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Ringkasan</label>
                        <input className={inputClass} value={ringkasan} onChange={(e) => setRingkasan(e.target.value)} placeholder="Ringkasan singkat (opsional)" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">URL Thumbnail</label>
                        <input className={inputClass} value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="https://... (opsional)" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Isi Berita</label>
                        <textarea className={inputClass} value={isi} onChange={(e) => setIsi(e.target.value)} rows={7} placeholder="Tulis isi berita di sini..." />
                    </div>

                    {/* Modal footer */}
                    <div className="flex justify-end gap-2.5 pt-2 border-t border-gray-100 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="px-5 py-2.5 text-sm font-semibold border border-gray-200 rounded-lg text-gray-700 hover:border-gray-300 transition-colors disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2.5 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors disabled:opacity-60"
                        >
                            {submitting ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Dashboard Utama ─────────────────────────────────────────

export default function DashboardPage() {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [userName, setUserName] = useState("");
    const [tab, setTab] = useState<Tab>("berita");

    const [berita, setBerita] = useState<Berita[]>([]);
    const [kategori, setKategori] = useState<Kategori[]>([]);
    const [loadingList, setLoadingList] = useState(true);
    const [listError, setListError] = useState<string | null>(null);

    const [editTarget, setEditTarget] = useState<Berita | null>(null);

    // form create berita
    const [judul, setJudul] = useState("");
    const [ringkasan, setRingkasan] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [isi, setIsi] = useState("");
    const [kategoriId, setKategoriId] = useState("");
    const [beritaSubmitting, setBeritaSubmitting] = useState(false);
    const [beritaAlert, setBeritaAlert] = useState<AlertState>(null);

    // form create kategori
    const [namaKategori, setNamaKategori] = useState("");
    const [kategoriSubmitting, setKategoriSubmitting] = useState(false);
    const [kategoriAlert, setKategoriAlert] = useState<AlertState>(null);

    // ── Auth guard ──
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (!storedToken) { navigate("/login"); return; }

        setToken(storedToken);
        if (storedUser) {
            try { setUserName(JSON.parse(storedUser).nama ?? ""); } catch { /* ignore */ }
        }

        fetch(`${API_BASE_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((r) => r.json())
            .then((d) => {
                if (!d.success) {
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

    // ── Fetch data ──
    const fetchData = useCallback(async () => {
        setLoadingList(true);
        setListError(null);
        try {
            const [bRes, kRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/berita`),
                fetch(`${API_BASE_URL}/api/kategori`),
            ]);
            const bData = await bRes.json();
            const kData = await kRes.json();
            if (bData.success) setBerita(bData.data);
            if (kData.success) setKategori(kData.data);
            if (!bData.success || !kData.success) setListError("Sebagian data gagal dimuat.");
        } catch {
            setListError("Tidak dapat terhubung ke server.");
        } finally {
            setLoadingList(false);
        }
    }, []);

    useEffect(() => { if (token) fetchData(); }, [token, fetchData]);

    // ── Create berita ──
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
                body: JSON.stringify({ judul: judul.trim(), ringkasan: ringkasan.trim() || undefined, thumbnail: thumbnail.trim() || undefined, isi: isi.trim(), kategoriId }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) { setBeritaAlert({ type: "error", message: data.message || "Gagal membuat berita." }); return; }
            setBeritaAlert({ type: "success", message: "Berita berhasil dipublikasikan." });
            setJudul(""); setRingkasan(""); setThumbnail(""); setIsi(""); setKategoriId("");
            fetchData();
        } catch {
            setBeritaAlert({ type: "error", message: "Tidak dapat terhubung ke server." });
        } finally {
            setBeritaSubmitting(false);
        }
    };

    // ── Delete berita ──
    const handleDeleteBerita = async (id: number) => {
        if (!token || !confirm("Hapus berita ini?")) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/berita/${id}`, { method: "DELETE", headers: authHeaders(token) });
            const data = await res.json();
            if (data.success) fetchData(); else alert(data.message || "Gagal menghapus berita.");
        } catch { alert("Tidak dapat terhubung ke server."); }
    };

    // ── Create kategori ──
    const handleCreateKategori = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setKategoriAlert(null);
        if (!namaKategori.trim()) { setKategoriAlert({ type: "error", message: "Nama kategori wajib diisi." }); return; }
        if (!token) return;
        setKategoriSubmitting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/kategori`, {
                method: "POST",
                headers: authHeaders(token),
                body: JSON.stringify({ nama: namaKategori.trim() }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) { setKategoriAlert({ type: "error", message: data.message || "Gagal membuat kategori." }); return; }
            setKategoriAlert({ type: "success", message: "Kategori berhasil dibuat." });
            setNamaKategori("");
            fetchData();
        } catch {
            setKategoriAlert({ type: "error", message: "Tidak dapat terhubung ke server." });
        } finally {
            setKategoriSubmitting(false);
        }
    };

    // ── Delete kategori ──
    const handleDeleteKategori = async (id: number) => {
        if (!token || !confirm("Hapus kategori ini? Berita terkait bisa terpengaruh.")) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/kategori/${id}`, { method: "DELETE", headers: authHeaders(token) });
            const data = await res.json();
            if (data.success) fetchData(); else alert(data.message || "Gagal menghapus kategori.");
        } catch { alert("Tidak dapat terhubung ke server."); }
    };

    if (!token) return null;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {editTarget && token && (
                <EditBeritaModal
                    berita={editTarget}
                    kategoriList={kategori}
                    token={token}
                    onClose={() => setEditTarget(null)}
                    onSuccess={fetchData}
                />
            )}

            {/* ── Header ── */}
            <header className="bg-white border-b border-gray-200 px-6 md:px-10 py-4 flex justify-between items-center gap-4 flex-wrap">
                <div>
                    <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-0.5">
                        Portal Internal · MTsN Kota Tegal
                    </p>
                    <h1 className="text-xl font-bold text-gray-900 leading-tight">Dashboard Admin</h1>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    {userName && <span className="text-gray-500">Halo, <span className="font-semibold text-gray-800">{userName}</span></span>}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg text-gray-700 hover:border-red-200 hover:text-red-600 transition-colors"
                    >
                        Keluar
                    </button>
                </div>
            </header>

            <main className="px-6 md:px-10 py-8 max-w-7xl mx-auto">
                {listError && (
                    <div className="mb-6 text-sm px-3.5 py-2.5 rounded-lg border bg-red-50 border-red-200 text-red-700">
                        {listError}
                    </div>
                )}

                {/* ── Tabs ── */}
                <div className="flex gap-1 border-b border-gray-200 mb-8">
                    {(["berita", "kategori"] as Tab[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-5 py-2.5 text-sm font-semibold capitalize border-b-2 transition-colors -mb-px ${tab === t
                                    ? "border-emerald-600 text-emerald-700"
                                    : "border-transparent text-gray-400 hover:text-gray-700"
                                }`}
                        >
                            {t === "berita" ? "Berita" : "Kategori"}
                        </button>
                    ))}
                </div>

                {/* ── TAB BERITA ── */}
                {tab === "berita" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        {/* Form create */}
                        <section className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-5">Tulis Berita Baru</h2>
                            <Alert alert={beritaAlert} />
                            <form onSubmit={handleCreateBerita} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Judul</label>
                                    <input className={inputClass} value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Judul berita" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Kategori</label>
                                    <select className={inputClass} value={kategoriId} onChange={(e) => setKategoriId(e.target.value)}>
                                        <option value="">Pilih kategori</option>
                                        {kategori.map((k) => <option key={k.id} value={k.id}>{k.nama}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Ringkasan</label>
                                    <input className={inputClass} value={ringkasan} onChange={(e) => setRingkasan(e.target.value)} placeholder="Ringkasan singkat (opsional)" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">URL Thumbnail</label>
                                    <input className={inputClass} value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="https://... (opsional)" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Isi Berita</label>
                                    <textarea className={inputClass} value={isi} onChange={(e) => setIsi(e.target.value)} rows={8} placeholder="Tulis isi berita di sini..." />
                                </div>
                                <button
                                    type="submit"
                                    disabled={beritaSubmitting}
                                    className="w-full py-2.5 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors disabled:opacity-60"
                                >
                                    {beritaSubmitting ? "Mempublikasikan..." : "Publikasikan Berita"}
                                </button>
                            </form>
                        </section>

                        {/* Daftar berita */}
                        <section className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-5">Daftar Berita</h2>
                            {loadingList ? (
                                <SkeletonList />
                            ) : berita.length === 0 ? (
                                <p className="text-sm text-gray-400">Belum ada berita.</p>
                            ) : (
                                <ul className="space-y-2.5 max-h-140 overflow-y-auto pr-1">
                                    {berita.map((b) => (
                                        <li
                                            key={b.id}
                                            className="flex items-center justify-between gap-3 px-4 py-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                                        >
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{b.judul}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{b.kategori?.nama} · oleh {b.user?.nama}</p>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                <button
                                                    onClick={() => setEditTarget(b)}
                                                    className="px-3 py-1.5 text-xs font-semibold border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBerita(b.id)}
                                                    className="px-3 py-1.5 text-xs font-semibold border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </div>
                )}

                {/* ── TAB KATEGORI ── */}
                {tab === "kategori" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        {/* Form create */}
                        <section className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-5">Tambah Kategori</h2>
                            <Alert alert={kategoriAlert} />
                            <form onSubmit={handleCreateKategori} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama Kategori</label>
                                    <input className={inputClass} value={namaKategori} onChange={(e) => setNamaKategori(e.target.value)} placeholder="Misal: Prestasi, Pengumuman" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={kategoriSubmitting}
                                    className="w-full py-2.5 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors disabled:opacity-60"
                                >
                                    {kategoriSubmitting ? "Menyimpan..." : "Tambah Kategori"}
                                </button>
                            </form>
                        </section>

                        {/* Daftar kategori */}
                        <section className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-5">Daftar Kategori</h2>
                            {loadingList ? (
                                <SkeletonList />
                            ) : kategori.length === 0 ? (
                                <p className="text-sm text-gray-400">Belum ada kategori.</p>
                            ) : (
                                <ul className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                                    {kategori.map((k) => (
                                        <li
                                            key={k.id}
                                            className="flex items-center justify-between gap-3 px-4 py-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                                        >
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{k.nama}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">/{k.slug}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteKategori(k.id)}
                                                className="px-3 py-1.5 text-xs font-semibold border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                                            >
                                                Hapus
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
}