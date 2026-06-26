import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, User, Calendar, FileText } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

// Mendefinisikan tipe data Berita
interface Berita {
    id: number;
    title: string;
    content: string;
    prestasi: string;
    author: string;
    imageUrl: string;
    status: string;
    createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
    published: '#00cc66', // Hijau Terang
    draft: '#555555',     // Abu-abu
};

const defaultForm = {
    title: '',
    content: '',
    author: '',
    prestasi: '',
    imageUrl: '',
    status: 'draft',
};

const BeritaPage = () => {
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editItem, setEditItem] = useState<Berita | null>(null);
    const [form, setForm] = useState(defaultForm);
    const [saving, setSaving] = useState(false);

    // Mengambil data berita dari backend
    const fetchBerita = async () => {
        setLoading(true);
        try {
            const res = await api.get('/berita');
            setBerita(res.data);
        } catch {
            toast.error('Gagal memuat data berita');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBerita();
    }, []);

    const openAdd = () => {
        setEditItem(null);
        setForm(defaultForm);
        setModal(true);
    };

    const openEdit = (item: Berita) => {
        setEditItem(item);
        setForm({
            title: item.title,
            content: item.content,
            author: item.author,
            prestasi: item.prestasi,
            imageUrl: item.imageUrl || '',
            status: item.status,
        });
        setModal(true);
    };

    
    const closeModal = () => {
        setModal(false);
        setEditItem(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (editItem) {
                await api.put(`/berita/${editItem.id}`, form);
                toast.success('Berita berhasil diperbarui');
            } else {
                await api.post('/berita', form);
                toast.success('Berita berhasil ditambahkan');
            }
            closeModal();
            fetchBerita();
        } catch {
            toast.error('Gagal menyimpan berita');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`Hapus berita "${title}"?`)) return;
        try {
            await api.delete(`/berita/${id}`);
            toast.success('Berita dihapus');
            fetchBerita();
        } catch {
            toast.error('Gagal menghapus berita');
        }
    };

    return (
        <div className="w-full text-black">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-[28px] font-black uppercase tracking-tight">Manajemen Berita</h1>
                <button
                    className="bg-[#fffb00] border-4 border-black px-5 py-2.5 text-black font-black text-sm uppercase cursor-pointer flex items-center gap-2 shadow-[4px_4px_0px_#000000] transition-all duration-100 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000]"
                    onClick={openAdd}
                >
                    <Plus size={18} strokeWidth={3} /> Tulis Berita
                </button>
            </div>

            {/* KONTEN */}
            {loading ? (
                <p className="font-[800] uppercase">Memuat data...</p>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                    {berita.length === 0 && <p>Belum ada berita yang diterbitkan.</p>}
                    {berita.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border-4 border-black shadow-[6px_6px_0px_#000000] overflow-hidden flex flex-col transition-all duration-100 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0px_#000000]"
                        >
                            <div
                                className="h-40 bg-[#e0e0e0] bg-cover bg-center border-b-4 border-black"
                                style={{ backgroundImage: `url(${item.imageUrl || 'https://picsum.photos/400/200?random=' + item.id})` }}
                            />

                            <div className="p-4 flex flex-col gap-3 flex-1">
                                <div className="text-[18px] font-black uppercase leading-[1.2]">
                                    {item.title}
                                </div>

                                <div className="text-xs font-bold flex flex-col gap-1.5 text-[#444444]">
                                    <span className="flex items-center gap-1.5">
                                        <User size={14} /> Ditulis oleh: {item.author}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={14} /> {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>

                                <div
                                    className="self-start text-[11px] font-black uppercase px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000000]"
                                    style={{
                                        background: STATUS_COLORS[item.status] + '22',
                                        color: STATUS_COLORS[item.status] || '#000'
                                    }}
                                >
                                    {item.status.toUpperCase()}

                                </div>
                                <div
                                    className="self-start text-[11px] font-black uppercase px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000000]"
                                    style={{
                                        background: STATUS_COLORS[item.prestasi] + '22',
                                        color: STATUS_COLORS[item.prestasi] || '#000'
                                    }}
                                >
                                    {item.prestasi.toUpperCase()}

                                </div>


                                <div className="flex justify-between items-center mt-auto pt-3 border-t-2 border-dashed border-black">
                                    <span className="text-[13px] font-[800] flex items-center gap-1.5">
                                        <FileText size={14} /> {item.content.length > 50 ? item.content.substring(0, 50) + '...' : 'Baca selengkapnya'}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-white border-[3px] border-black p-1.5 cursor-pointer shadow-[2px_2px_0px_#000000] flex items-center justify-center transition-all duration-100 hover:bg-[#fffb00] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_#000000]"
                                            onClick={() => openEdit(item)}
                                            title="Edit"
                                        >
                                            <Pencil size={14} strokeWidth={2.5} />
                                        </button>
                                        <button
                                            className="bg-white border-[3px] border-black p-1.5 cursor-pointer shadow-[2px_2px_0px_#000000] flex items-center justify-center transition-all duration-100 hover:bg-[#ff2222] hover:text-white hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_#000000]"
                                            onClick={() => handleDelete(item.id, item.title)}
                                            title="Hapus"
                                        >
                                            <Trash2 size={14} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL FORM */}
            {modal && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-[4px] flex justify-center items-center z-[100] p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white p-6 border-4 border-black shadow-[10px_10px_0px_#000000] w-full max-w-[600px] text-black max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-[22px] font-black uppercase mb-5 border-b-4 border-black pb-2">
                            {editItem ? 'Edit Berita' : 'Tulis Berita Baru'}
                        </h2>

                        <form onSubmit={handleSave}>
                            <input
                                className="w-full mb-3.5 p-3 border-[3px] border-black bg-white text-black text-sm font-bold shadow-[3px_3px_0px_#000000] focus:outline-none focus:bg-[#fffb00] focus:-translate-x-[1px] focus:-translate-y-[1px] focus:shadow-[4px_4px_0px_#000000]"
                                placeholder="Judul Berita"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                            />

                            <div className="grid grid-cols-2 gap-0">
                                <select
                                    className="w-full mb-3.5 p-3 border-[3px] border-black bg-white text-black text-sm font-bold shadow-[3px_3px_0px_#000000] focus:outline-none focus:bg-[#fffb00] focus:-translate-x-[1px] focus:-translate-y-[1px] focus:shadow-[4px_4px_0px_#000000]"
                                    value={form.prestasi}
                                    onChange={(e) => setForm({ ...form, prestasi: e.target.value })}
                                    required
                                >
                                    <option value="Akademik">Akademik</option>
                                    <option value="Keagamaan">Keagamaan</option>
                                    <option value="Olahraga">Olahraga</option>
                                </select>

                                <select
                                    className="w-full mb-0.5 p-3 border-[3px] border-black bg-white text-black text-sm font-bold shadow-[3px_3px_0px_#000000] focus:outline-none focus:bg-[#fffb00] focus:-translate-x-[1px] focus:-translate-y-[1px] focus:shadow-[4px_4px_0px_#000000]"
                                    value={form.author}
                                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                                    required
                                >
                                    <option value="AdminMAN">Admin</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Contributor">Contributor</option>
                                </select>
                                <select
                                    className="w-full mb-3.5 p-3 border-[3px] border-black bg-white text-black text-sm font-bold shadow-[3px_3px_0px_#000000] focus:outline-none focus:bg-[#fffb00] focus:-translate-x-[1px] focus:-translate-y-[1px] focus:shadow-[4px_4px_0px_#000000]"
                                    value={form.status}
                                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                                    required
                                >
                                    <option value="draft">Draft (Simpan sementara)</option>
                                    <option value="published">Published (Terbitkan)</option>
                                </select>
                            </div>

                            <input
                                className="w-full mb-3.5 p-3 border-[3px] border-black bg-white text-black text-sm font-bold shadow-[3px_3px_0px_#000000] focus:outline-none focus:bg-[#fffb00] focus:-translate-x-[1px] focus:-translate-y-[1px] focus:shadow-[4px_4px_0px_#000000]"
                                placeholder="URL Gambar Sampul (Opsional)"
                                value={form.imageUrl}
                                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                            />

                            <textarea
                                className="w-full mb-3.5 p-3 border-[3px] border-black bg-white text-black text-sm font-bold shadow-[3px_3px_0px_#000000] focus:outline-none focus:bg-[#fffb00] focus:-translate-x-[1px] focus:-translate-y-[1px] focus:shadow-[4px_4px_0px_#000000]"
                                placeholder="Isi konten berita..."
                                rows={6}
                                value={form.content}
                                onChange={(e) => setForm({ ...form, content: e.target.value })}
                                required
                            />

                            <div className="flex justify-end gap-3 mt-3.5">
                                <button
                                    type="button"
                                    className="bg-white border-[3px] border-black px-5 py-2.5 text-black font-black uppercase cursor-pointer shadow-[3px_3px_0px_#000000] transition-all duration-100 hover:bg-[#f0f0f0] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_#000000]"
                                    onClick={closeModal}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#fffb00] border-[3px] border-black px-6 py-2.5 text-black font-black uppercase cursor-pointer shadow-[3px_3px_0px_#000000] transition-all duration-100 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_#000000]"
                                >
                                    {saving ? 'Proses...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BeritaPage;