import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

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

function formatTanggal(dateString: string) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function fallbackImage(id: number) {
    return `https://picsum.photos/800/600?random=${id}`;
}

const BeritaList = () => {
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState('');
    const [activeKategori, setActiveKategori] = useState<number | 'semua'>('semua');

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await api.get('/berita');
                const allBerita: Berita[] = res.data?.data ?? [];

                setBerita(allBerita.filter((item) => item.published));
            } catch (err) {
                console.error(err);
                setError('Gagal memuat berita. Coba muat ulang halaman.');
            } finally {
                setLoading(false);
            }
        };

        fetchBerita();
    }, []);

    const kategoriList = useMemo(() => {
        const map = new Map<number, Kategori>();
        berita.forEach((item) => {
            if (item.kategori) map.set(item.kategori.id, item.kategori);
        });
        return Array.from(map.values());
    }, [berita]);

    const filteredBerita = useMemo(() => {
        return berita.filter((item) => {
            const cocokKategori =
                activeKategori === 'semua' || item.kategori?.id === activeKategori;

            const cocokSearch =
                search.trim() === '' ||
                item.judul.toLowerCase().includes(search.toLowerCase()) ||
                (item.ringkasan ?? '').toLowerCase().includes(search.toLowerCase());

            return cocokKategori && cocokSearch;
        });
    }, [berita, activeKategori, search]);

    return (
        <div className="w-full font-sans text-gray-800">
            {/* HEADER */}
            <section className="bg-emerald-950 text-white px-6 md:px-20 pt-20 pb-16">
                <div className="max-w-7xl mx-auto">
                    <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">
                        Portal Berita
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-4 tracking-tight">
                        Berita &amp; Artikel MTsN Kota Tegal
                    </h1>
                    <p className="text-emerald-100/80 max-w-2xl font-light">
                        Kumpulan informasi, kegiatan, dan prestasi terbaru seputar madrasah.
                    </p>
                </div>
            </section>

            {/* FILTER BAR */}
            <section className="px-6 md:px-20 -mt-8 relative z-10">
                <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari judul berita..."
                        className="w-full md:w-72 px-4 py-2.5 rounded-full border border-gray-200 text-sm outline-none focus:border-emerald-500 transition-colors"
                    />

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveKategori('semua')}
                            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${activeKategori === 'semua'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                        >
                            Semua
                        </button>
                        {kategoriList.map((k) => (
                            <button
                                key={k.id}
                                onClick={() => setActiveKategori(k.id)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${activeKategori === k.id
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {k.nama}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* LIST BERITA */}
            <section className="px-6 md:px-20 py-16">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                                    <div className="h-48 bg-gray-100" />
                                    <div className="p-6 space-y-3">
                                        <div className="h-3 w-20 bg-gray-100 rounded" />
                                        <div className="h-4 w-full bg-gray-100 rounded" />
                                        <div className="h-3 w-3/4 bg-gray-100 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <p className="text-center text-red-500 text-sm py-16">{error}</p>
                    ) : filteredBerita.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-400 text-sm mb-2">
                                Tidak ada berita yang cocok dengan pencarian.
                            </p>
                            {(search || activeKategori !== 'semua') && (
                                <button
                                    onClick={() => {
                                        setSearch('');
                                        setActiveKategori('semua');
                                    }}
                                    className="text-emerald-700 font-semibold text-sm hover:text-emerald-900"
                                >
                                    Reset filter
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-gray-400 mb-8">
                                Menampilkan {filteredBerita.length} dari {berita.length} berita
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredBerita.map((item) => (
                                    <Link
                                        to={`/berita/${item.slug}`}
                                        key={item.id}
                                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
                                    >
                                        <div className="h-48 bg-gray-100 overflow-hidden">
                                            <img
                                                src={item.thumbnail || fallbackImage(item.id)}
                                                alt={item.judul}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
                                                    {item.kategori?.nama}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {formatTanggal(item.createdAt)}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-lg mb-3 text-gray-900 leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2">
                                                {item.judul}
                                            </h3>
                                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                                {item.ringkasan || item.isi}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BeritaList;