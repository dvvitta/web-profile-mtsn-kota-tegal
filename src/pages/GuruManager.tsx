import { useState, useEffect, useRef, type FormEvent } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://be-mtsn.vercel.app/api";

interface Guru {
    id: number; nama: string; foto: string | null;
    mapel: string; biografi: string | null;
    tglLahir: string | null; gender: string;
}

interface Karyawan {
    id: number; nama: string; foto: string | null;
    jabatan: string; biografi: string | null;
    tglLahir: string | null; gender: string;
}

type Mode = "guru" | "karyawan";
type AlertState = { type: "error" | "success"; message: string } | null;

const inputClass = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 outline-none focus:border-emerald-600 focus:bg-white transition-colors";

function Alert({ alert }: { alert: AlertState }) {
    if (!alert) return null;
    return (
        <div className={`text-sm px-3.5 py-2.5 rounded-lg mb-4 border ${alert.type === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-800"}`}>
            {alert.message}
        </div>
    );
}

// ─── Image Uploader lokal (preview saja, upload lewat form) ──

function PhotoPicker({ value, onChange }: { value: File | null; preview: string; onChange: (f: File | null) => void }) {
    const ref = useRef<HTMLInputElement>(null);
    const [localPreview, setLocalPreview] = useState<string>("");

    const handleFile = (f: File) => {
        onChange(f);
        setLocalPreview(URL.createObjectURL(f));
    };

    const displayPreview = localPreview || value ? localPreview : "";

    return (
        <div>
            {displayPreview ? (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 group">
                    <img src={displayPreview} className="w-full h-full object-cover" alt="preview" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity">
                        <button type="button" onClick={() => ref.current?.click()} className="text-[10px] bg-white text-gray-700 px-1.5 py-0.5 rounded font-semibold">Ganti</button>
                        <button type="button" onClick={() => { onChange(null); setLocalPreview(""); }} className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-semibold">Hapus</button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => ref.current?.click()}
                    className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 hover:border-emerald-400 bg-gray-50 hover:bg-emerald-50/30 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-[10px] text-gray-400 font-medium">Foto</span>
                </div>
            )}
            <input ref={ref} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
    );
}

// ─── Form Modal ───────────────────────────────────────────────

interface FormModalProps {
    mode: Mode;
    token: string;
    editData?: Guru | Karyawan | null;
    onClose: () => void;
    onSuccess: () => void;
}

function FormModal({ mode, token, editData, onClose, onSuccess }: FormModalProps) {
    const isEdit = !!editData;
    const isGuru = mode === "guru";

    const [nama, setNama] = useState(editData?.nama ?? "");
    const [mapelOrJabatan, setMapelOrJabatan] = useState(
        isGuru ? (editData as Guru)?.mapel ?? "" : (editData as Karyawan)?.jabatan ?? ""
    );
    const [biografi, setBiografi] = useState(editData?.biografi ?? "");
    const [tglLahir, setTglLahir] = useState(
        editData?.tglLahir ? editData.tglLahir.split("T")[0] : ""
    );
    const [gender, setGender] = useState(editData?.gender ?? "L");
    const [fotoFile, setFotoFile] = useState<File | null>(null);
    const [fotoPreview] = useState(editData?.foto ?? "");
    const [submitting, setSubmitting] = useState(false);
    const [alert, setAlert] = useState<AlertState>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setAlert(null);

        if (!nama.trim() || !mapelOrJabatan.trim()) {
            setAlert({ type: "error", message: `Nama dan ${isGuru ? "mata pelajaran" : "jabatan"} wajib diisi.` });
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("nama", nama.trim());
            formData.append(isGuru ? "mapel" : "jabatan", mapelOrJabatan.trim());
            formData.append("biografi", biografi.trim());
            formData.append("tglLahir", tglLahir);
            formData.append("gender", gender);
            if (fotoFile) formData.append("foto", fotoFile);

            const url = isEdit
                ? `${API_BASE_URL}/api/${mode}/${editData!.id}`
                : `${API_BASE_URL}/api/${mode}`;
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { Authorization: `Bearer ${token}` },
                // Tidak set Content-Type — biarkan browser isi boundary multipart
                body: formData,
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                setAlert({ type: "error", message: data.message || "Gagal menyimpan data." });
                return;
            }

            setAlert({ type: "success", message: data.message });
            setTimeout(() => { onSuccess(); onClose(); }, 700);
        } catch {
            setAlert({ type: "error", message: "Tidak dapat terhubung ke server." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 shadow-2xl">
                <div className="flex justify-between items-center px-6 pt-5 pb-4 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-900">
                        {isEdit ? "Edit" : "Tambah"} {isGuru ? "Guru" : "Karyawan"}
                    </h2>
                    <button onClick={onClose} className="w-8 h-8 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    <Alert alert={alert} />

                    {/* Foto picker */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-2">Foto</label>
                        <PhotoPicker value={fotoFile} preview={fotoPreview} onChange={setFotoFile} />
                        <p className="text-xs text-gray-400 mt-1.5">JPG, PNG, WEBP · Maks 5 MB</p>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-400">*</span></label>
                        <input className={inputClass} value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Contoh: Dra. Hj. Siti Fatimah, S.Pd" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            {isGuru ? "Mata Pelajaran" : "Jabatan"} <span className="text-red-400">*</span>
                        </label>
                        <input className={inputClass} value={mapelOrJabatan}
                            onChange={(e) => setMapelOrJabatan(e.target.value)}
                            placeholder={isGuru ? "Contoh: Matematika" : "Contoh: Bendahara Pengeluaran"} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tanggal Lahir</label>
                            <input type="date" className={inputClass} value={tglLahir} onChange={(e) => setTglLahir(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Gender <span className="text-red-400">*</span></label>
                            <select className={inputClass} value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Biografi</label>
                        <textarea className={inputClass} value={biografi} onChange={(e) => setBiografi(e.target.value)}
                            rows={4} placeholder="Deskripsi singkat tentang guru/karyawan ini..." />
                    </div>

                    <div className="flex justify-end gap-2.5 pt-2 border-t border-gray-100">
                        <button type="button" onClick={onClose} disabled={submitting}
                            className="px-5 py-2.5 text-sm font-semibold border border-gray-200 rounded-lg text-gray-700 hover:border-gray-300 disabled:opacity-50">
                            Batal
                        </button>
                        <button type="submit" disabled={submitting}
                            className="px-5 py-2.5 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg disabled:opacity-60 transition-colors">
                            {submitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : `Tambah ${isGuru ? "Guru" : "Karyawan"}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── List item ────────────────────────────────────────────────

function ListItem({
    nama, sub, foto, gender,
    onEdit, onDelete,
}: {
    nama: string; sub: string; foto: string | null; gender: string;
    onEdit: () => void; onDelete: () => void;
}) {
    function initials(n: string) {
        return n.replace(/^(Drs\.|Dra\.|Hj\.|H\.)\s*/gi, "").split(" ").filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join("");
    }
    return (
        <li className="flex items-center gap-3 px-4 py-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                {foto ? <img src={foto} alt={nama} className="w-full h-full object-cover" /> : initials(nama)}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{nama}</p>
                <p className="text-xs text-gray-400 truncate">{sub} · {gender === "L" ? "L" : "P"}</p>
            </div>
            <div className="flex gap-2 shrink-0">
                <button onClick={onEdit} className="px-3 py-1.5 text-xs font-semibold border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors">Edit</button>
                <button onClick={onDelete} className="px-3 py-1.5 text-xs font-semibold border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">Hapus</button>
            </div>
        </li>
    );
}

// ─── Main Component ───────────────────────────────────────────

export default function GuruManager({ token }: { token: string }) {
    const [mode, setMode] = useState<Mode>("guru");
    const [guru, setGuru] = useState<Guru[]>([]);
    const [karyawan, setKaryawan] = useState<Karyawan[]>([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [editData, setEditData] = useState<Guru | Karyawan | null>(null);
    const [globalAlert, setGlobalAlert] = useState<AlertState>(null);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [gRes, kRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/guru`),
                fetch(`${API_BASE_URL}/api/karyawan`),
            ]);
            const gData = await gRes.json();
            const kData = await kRes.json();
            if (gData.success) setGuru(gData.data);
            if (kData.success) setKaryawan(kData.data);
        } catch {
            setGlobalAlert({ type: "error", message: "Gagal memuat data." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, []);

    const handleDelete = async (id: number) => {
        if (!confirm(`Hapus data ini?`)) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/${mode}/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setGlobalAlert({ type: "success", message: data.message });
                fetchAll();
            } else {
                setGlobalAlert({ type: "error", message: data.message });
            }
        } catch {
            setGlobalAlert({ type: "error", message: "Tidak dapat terhubung ke server." });
        }
    };

    const openAdd = () => { setEditData(null); setFormOpen(true); };
    const openEdit = (item: Guru | Karyawan) => { setEditData(item); setFormOpen(true); };

    const list = mode === "guru" ? guru : karyawan;

    return (
        <div className="space-y-6">
            {formOpen && (
                <FormModal mode={mode} token={token} editData={editData}
                    onClose={() => setFormOpen(false)} onSuccess={fetchAll} />
            )}

            {/* Tab + Tombol tambah */}
            <div className="flex items-center justify-between">
                <div className="flex gap-1 border-b border-gray-200">
                    {(["guru", "karyawan"] as Mode[]).map((m) => (
                        <button key={m} onClick={() => setMode(m)}
                            className={`px-5 py-2.5 text-sm font-semibold capitalize border-b-2 transition-colors -mb-px ${mode === m ? "border-emerald-600 text-emerald-700" : "border-transparent text-gray-400 hover:text-gray-700"}`}>
                            {m === "guru" ? `Guru (${guru.length})` : `Karyawan (${karyawan.length})`}
                        </button>
                    ))}
                </div>
                <button onClick={openAdd}
                    className="px-4 py-2 text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors flex items-center gap-2">
                    <span>+</span> Tambah {mode === "guru" ? "Guru" : "Karyawan"}
                </button>
            </div>

            <Alert alert={globalAlert} />

            {/* List */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
                {loading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-3 items-center p-3 animate-pulse">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3.5 bg-gray-100 rounded w-2/3" />
                                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : list.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-sm text-gray-400 mb-3">Belum ada data {mode === "guru" ? "guru" : "karyawan"}.</p>
                        <button onClick={openAdd} className="text-sm text-emerald-600 font-semibold hover:underline">+ Tambah sekarang</button>
                    </div>
                ) : (
                    <ul className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
                        {mode === "guru"
                            ? (guru as Guru[]).map((g) => (
                                <ListItem key={g.id} nama={g.nama} sub={g.mapel} foto={g.foto} gender={g.gender}
                                    onEdit={() => openEdit(g)} onDelete={() => handleDelete(g.id)} />
                            ))
                            : (karyawan as Karyawan[]).map((k) => (
                                <ListItem key={k.id} nama={k.nama} sub={k.jabatan} foto={k.foto} gender={k.gender}
                                    onEdit={() => openEdit(k)} onDelete={() => handleDelete(k.id)} />
                            ))
                        }
                    </ul>
                )}
            </div>
        </div>
    );
}