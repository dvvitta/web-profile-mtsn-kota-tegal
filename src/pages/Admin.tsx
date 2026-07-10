import React, { useState, useEffect, useRef, type FormEvent, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import GuruManager from "./GuruManager";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://be-mtsn.vercel.app";

// ─── Types ───────────────────────────────────────────────────

interface Kategori { id: number; nama: string; slug: string; }
interface Berita {
    id: number; judul: string; slug: string;
    ringkasan: string | null; thumbnail: string | null;
    isi: string; published: boolean; createdAt: string;
    kategori: Kategori; user: { id: number; nama: string };
}
type Tab = "berita" | "kategori" | "guru";
type AlertState = { type: "error" | "success"; message: string } | null;

function authHeaders(token: string) {
    return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

const inputClass =
    "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 outline-none focus:border-emerald-600 focus:bg-white transition-colors";

// ─── Alert ───────────────────────────────────────────────────

function Alert({ alert }: { alert: AlertState }) {
    if (!alert) return null;
    return (
        <div className={`text-sm px-3.5 py-2.5 rounded-lg mb-4 border ${alert.type === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-800"
            }`}>{alert.message}</div>
    );
}

// ─── Skeleton ────────────────────────────────────────────────

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
// Taruh di atas DashboardPage.tsx, gantikan semua fetch() dengan apiFetch()
async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const res = await fetch(url, options);
    if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/loginPage';
        // Lempar error agar eksekusi berhenti, redirect sudah berjalan
        throw new Error('Sesi berakhir. Silakan login kembali.');
    }
    return res;
}
// ─── ImageUploader ───────────────────────────────────────────

interface ImageUploaderProps {
    token: string;
    value: string;                      // URL thumbnail saat ini
    onChange: (url: string) => void;    // dipanggil setelah upload berhasil
}

function ImageUploader({ token, value, onChange }: ImageUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string>(value);

    // Sinkronkan preview ketika value dari luar berubah (mis. saat modal dibuka ulang)
    useEffect(() => { setPreview(value); }, [value]);

    const handleFile = async (file: File) => {
        setError(null);

        // Validasi di sisi client sebelum kirim ke server
        const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowed.includes(file.type)) {
            setError("Format tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Ukuran file melebihi 5 MB.");
            return;
        }

        // Tampilkan preview lokal langsung (sebelum upload selesai)
        const localUrl = URL.createObjectURL(file);
        setPreview(localUrl);

        setUploading(true);
        try {
            const form = new FormData();
            form.append("image", file);

            const res = await apiFetch(`${API_BASE_URL}/api/upload`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                // Jangan set Content-Type manual — biarkan browser isi boundary multipart
                body: form,
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                setError(data.message || "Upload gagal.");
                setPreview(value); // kembalikan ke nilai sebelumnya
                return;
            }

            setPreview(data.url);
            onChange(data.url);
        } catch {
            setError("Tidak dapat terhubung ke server.");
            setPreview(value);
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleClear = () => {
        setPreview("");
        onChange("");
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            {/* Drop zone / preview */}
            {preview ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
                    <img
                        src={preview}
                        alt="Thumbnail preview"
                        className="w-full h-44 object-cover"
                        onError={() => setPreview("")}
                    />
                    {/* Overlay saat uploading */}
                    {uploading && (
                        <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center gap-2">
                            <svg className="w-6 h-6 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            <span className="text-xs text-emerald-700 font-semibold">Mengupload...</span>
                        </div>
                    )}
                    {/* Tombol aksi */}
                    {!uploading && (
                        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                type="button"
                                onClick={() => inputRef.current?.click()}
                                className="px-2.5 py-1 text-xs font-semibold bg-white/90 border border-gray-200 rounded-md text-gray-700 hover:bg-white shadow-sm"
                            >
                                Ganti
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="px-2.5 py-1 text-xs font-semibold bg-white/90 border border-red-200 rounded-md text-red-600 hover:bg-red-50 shadow-sm"
                            >
                                Hapus
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => !uploading && inputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center gap-2 h-44 rounded-lg border-2 border-dashed transition-colors cursor-pointer
            ${uploading ? "border-emerald-300 bg-emerald-50/50 cursor-not-allowed" : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/30 bg-gray-50"}`}
                >
                    {uploading ? (
                        <>
                            <svg className="w-6 h-6 animate-spin text-emerald-500" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            <p className="text-xs text-emerald-600 font-semibold">Mengupload gambar...</p>
                        </>
                    ) : (
                        <>
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            <p className="text-sm font-semibold text-gray-600">Klik atau drag gambar ke sini</p>
                            <p className="text-xs text-gray-400">JPG, PNG, WEBP, GIF · Maks 5 MB</p>
                        </>
                    )}
                </div>
            )}

            {/* Input URL manual sebagai alternatif */}
            <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-xs text-gray-400">atau tempel URL</span>
                <div className="h-px flex-1 bg-gray-100" />
            </div>
            <input
                type="url"
                className={inputClass}
                placeholder="https://..."
                value={preview.startsWith("blob:") ? "" : preview}
                onChange={(e) => { setPreview(e.target.value); onChange(e.target.value); }}
                disabled={uploading}
            />

            {/* Error */}
            {error && <p className="text-xs text-red-600">{error}</p>}

            {/* Hidden file input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
        </div>
    );
}

// ─── Modal Edit Berita ────────────────────────────────────────

interface EditModalProps {
    berita: Berita; kategoriList: Kategori[];
    token: string; onClose: () => void; onSuccess: () => void;
}

function EditBeritaModal({ berita, kategoriList, token, onClose, onSuccess }: EditModalProps) {
    const [judul, setJudul] = useState(berita.judul);
    const [ringkasan, setRingkasan] = useState(berita.ringkasan ?? "");
    const [thumbnail, setThumbnail] = useState(berita.thumbnail ?? "");
    const [isi, setIsi] = useState(berita.isi);
    const [kategoriId, setKategoriId] = useState(String(berita.kategori?.id ?? ""));
    const [submitting, setSubmitting] = useState(false);
    const [alert, setAlert] = useState<AlertState>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlert(null);
        if (!judul.trim() || !isi.trim() || !kategoriId) {
            setAlert({ type: "error", message: "Judul, isi, dan kategori wajib diisi." });
            return;
        }
        setSubmitting(true);
        try {
            const res = await apiFetch(`${API_BASE_URL}/api/berita/${berita.id}`, {
                method: "PUT",
                headers: authHeaders(token),
                body: JSON.stringify({
                    judul: judul.trim(),
                    ringkasan: ringkasan.trim() || undefined,
                    thumbnail: thumbnail || undefined,
                    isi: isi.trim(), kategoriId,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) { setAlert({ type: "error", message: data.message || "Gagal menyimpan." }); return; }
            setAlert({ type: "success", message: "Berita berhasil diperbarui." });
            setTimeout(() => { onSuccess(); onClose(); }, 700);
        } catch { setAlert({ type: "error", message: "Tidak dapat terhubung ke server." }); }
        finally { setSubmitting(false); }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/50 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border border-gray-200 shadow-2xl">
                <div className="flex justify-between items-center px-6 pt-5 pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Edit Berita</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-lg transition-colors">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    <Alert alert={alert} />

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Judul</label>
                        <input className={inputClass} value={judul} onChange={(e) => setJudul(e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Kategori</label>
                        <select className={inputClass} value={kategoriId} onChange={(e) => setKategoriId(e.target.value)}>
                            <option value="">Pilih kategori</option>
                            {kategoriList.map((k) => <option key={k.id} value={k.id}>{k.nama}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Ringkasan</label>
                        <input className={inputClass} value={ringkasan} onChange={(e) => setRingkasan(e.target.value)} placeholder="Opsional" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Thumbnail</label>
                        <ImageUploader token={token} value={thumbnail} onChange={setThumbnail} />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Isi Berita</label>
                        <textarea className={inputClass} value={isi} onChange={(e) => setIsi(e.target.value)} rows={7} />
                    </div>

                    <div className="flex justify-end gap-2.5 pt-2 border-t border-gray-100">
                        <button type="button" onClick={onClose} disabled={submitting}
                            className="px-5 py-2.5 text-sm font-semibold border border-gray-200 rounded-lg text-gray-700 hover:border-gray-300 disabled:opacity-50">
                            Batal
                        </button>
                        <button type="submit" disabled={submitting}
                            className="px-5 py-2.5 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg disabled:opacity-60">
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
        if (!storedToken) { navigate("/loginPage"); return; }
        setToken(storedToken);
        if (storedUser) {
            try { setUserName(JSON.parse(storedUser).nama ?? ""); } catch { /* ignore */ }
        }
        apiFetch(`${API_BASE_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((r) => r.json())
            .then((d) => {
                if (!d.success) { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/login"); }
            })
            .catch(() => { });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/loginPage");
    };

    // ── Fetch data ──
    const fetchData = useCallback(async () => {
        setLoadingList(true);
        setListError(null);
        try {
            const [bRes, kRes] = await Promise.all([
                apiFetch(`${API_BASE_URL}/api/berita`),
                apiFetch(`${API_BASE_URL}/api/kategori`),
            ]);
            const bData = await bRes.json();
            const kData = await kRes.json();
            if (bData.success) setBerita(bData.data);
            if (kData.success) setKategori(kData.data);
            if (!bData.success || !kData.success) setListError("Sebagian data gagal dimuat.");
        } catch { setListError("Tidak dapat terhubung ke server."); }
        finally { setLoadingList(false); }
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
            const res = await apiFetch(`${API_BASE_URL}/api/berita`, {
                method: "POST",
                headers: authHeaders(token),
                body: JSON.stringify({
                    judul: judul.trim(),
                    ringkasan: ringkasan.trim() || undefined,
                    thumbnail: thumbnail || undefined,
                    isi: isi.trim(), kategoriId,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) { setBeritaAlert({ type: "error", message: data.message || "Gagal membuat berita." }); return; }
            setBeritaAlert({ type: "success", message: "Berita berhasil dipublikasikan." });
            setJudul(""); setRingkasan(""); setThumbnail(""); setIsi(""); setKategoriId("");
            fetchData();
        } catch { setBeritaAlert({ type: "error", message: "Tidak dapat terhubung ke server." }); }
        finally { setBeritaSubmitting(false); }
    };

    const handleDeleteBerita = async (id: number) => {
        if (!token || !confirm("Hapus berita ini?")) return;
        try {
            const res = await apiFetch(`${API_BASE_URL}/api/berita/${id}`, { method: "DELETE", headers: authHeaders(token) });
            const data = await res.json();
            if (data.success) fetchData(); else alert(data.message || "Gagal menghapus.");
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
            const res = await apiFetch(`${API_BASE_URL}/api/kategori`, {
                method: "POST", headers: authHeaders(token),
                body: JSON.stringify({ nama: namaKategori.trim() }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) { setKategoriAlert({ type: "error", message: data.message || "Gagal membuat kategori." }); return; }
            setKategoriAlert({ type: "success", message: "Kategori berhasil dibuat." });
            setNamaKategori("");
            fetchData();
        } catch { setKategoriAlert({ type: "error", message: "Tidak dapat terhubung ke server." }); }
        finally { setKategoriSubmitting(false); }
    };

    const handleDeleteKategori = async (id: number) => {
        if (!token || !confirm("Hapus kategori ini?")) return;
        try {
            const res = await apiFetch(`${API_BASE_URL}/api/kategori/${id}`, { method: "DELETE", headers: authHeaders(token) });
            const data = await res.json();
            if (data.success) fetchData(); else alert(data.message || "Gagal menghapus.");
        } catch { alert("Tidak dapat terhubung ke server."); }
    };

    if (!token) return null;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            {editTarget && token && (
                <EditBeritaModal berita={editTarget} kategoriList={kategori} token={token}
                    onClose={() => setEditTarget(null)} onSuccess={fetchData} />
            )}

            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 md:px-10 py-4 flex justify-between items-center gap-4 flex-wrap">
                <div>
                    <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-0.5">Portal Internal · MTsN Kota Tegal</p>
                    <h1 className="text-xl font-bold text-gray-900">Dashboard Admin</h1>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    {userName && <span className="text-gray-500">Halo, <span className="font-semibold text-gray-800">{userName}</span></span>}
                    <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg text-gray-700 hover:border-red-200 hover:text-red-600 transition-colors">
                        <NavLink to="/LoginPage" className="flex items-center gap-1">
                        Keluar</NavLink>
                    </button>
                </div>
            </header>

            <main className="px-6 md:px-10 py-8 max-w-7xl mx-auto">
                {listError && <div className="mb-6 text-sm px-3.5 py-2.5 rounded-lg border bg-red-50 border-red-200 text-red-700">{listError}</div>}

                {/* Tabs */}
                <div className="flex gap-1 border-b border-gray-200 mb-8">
                    {(["berita", "kategori", "guru"] as Tab[]).map((t) => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-5 py-2.5 text-sm font-semibold capitalize border-b-2 transition-colors -mb-px ${tab === t ? "border-emerald-600 text-emerald-700" : "border-transparent text-gray-400 hover:text-gray-700"
                                }`}>
                            {t === "berita" ? "Berita" : t === "kategori" ? "Kategori" : "Guru & Karyawan"}
                        </button>
                    ))}
                </div>

                {/* ── TAB BERITA ── */}
                {tab === "berita" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
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
                                    <input className={inputClass} value={ringkasan} onChange={(e) => setRingkasan(e.target.value)} placeholder="Opsional" />
                                </div>

                                {/* ── Image Uploader ── */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Thumbnail</label>
                                    {token && <ImageUploader token={token} value={thumbnail} onChange={setThumbnail} />}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Isi Berita</label>
                                    <textarea className={inputClass} value={isi} onChange={(e) => setIsi(e.target.value)} rows={8} placeholder="Tulis isi berita di sini..." />
                                </div>
                                <button type="submit" disabled={beritaSubmitting}
                                    className="w-full py-2.5 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors disabled:opacity-60">
                                    {beritaSubmitting ? "Mempublikasikan..." : "Publikasikan Berita"}
                                </button>
                            </form>
                        </section>

                        <section className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-5">Daftar Berita <span className="text-gray-400 font-normal text-sm">({berita.length})</span></h2>
                            {loadingList ? <SkeletonList /> : berita.length === 0 ? (
                                <p className="text-sm text-gray-400">Belum ada berita.</p>
                            ) : (
                                <ul className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
                                    {berita.map((b) => (
                                        <li key={b.id} className="flex items-center gap-3 px-3 py-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                                            {/* Thumbnail mini */}
                                            <div className="w-14 h-10 rounded-md overflow-hidden bg-gray-100 shrink-0">
                                                {b.thumbnail
                                                    ? <img src={b.thumbnail} alt="" className="w-full h-full object-cover" />
                                                    : <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">🖼</div>
                                                }
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{b.judul}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{b.kategori?.nama} · {b.user?.nama}</p>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                <button onClick={() => setEditTarget(b)} className="px-3 py-1.5 text-xs font-semibold border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors">Edit</button>
                                                <button onClick={() => handleDeleteBerita(b.id)} className="px-3 py-1.5 text-xs font-semibold border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">Hapus</button>
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
                        <section className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-5">Tambah Kategori</h2>
                            <Alert alert={kategoriAlert} />
                            <form onSubmit={handleCreateKategori} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama Kategori</label>
                                    <input className={inputClass} value={namaKategori} onChange={(e) => setNamaKategori(e.target.value)} placeholder="Misal: Prestasi, Pengumuman" />
                                </div>
                                <button type="submit" disabled={kategoriSubmitting}
                                    className="w-full py-2.5 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors disabled:opacity-60">
                                    {kategoriSubmitting ? "Menyimpan..." : "Tambah Kategori"}
                                </button>
                            </form>
                        </section>

                        <section className="bg-white border border-gray-200 rounded-xl p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-5">Daftar Kategori <span className="text-gray-400 font-normal text-sm">({kategori.length})</span></h2>
                            {loadingList ? <SkeletonList /> : kategori.length === 0 ? (
                                <p className="text-sm text-gray-400">Belum ada kategori.</p>
                            ) : (
                                <ul className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                                    {kategori.map((k) => (
                                        <li key={k.id} className="flex items-center justify-between gap-3 px-4 py-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{k.nama}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">/{k.slug}</p>
                                            </div>
                                            <button onClick={() => handleDeleteKategori(k.id)} className="px-3 py-1.5 text-xs font-semibold border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors shrink-0">Hapus</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </div>
                )}
                
                {/* ── TAB GURU & KARYAWAN ── */}
                {tab === "guru" && token && <GuruManager token={token} />}
            </main>
        </div>
    );
}