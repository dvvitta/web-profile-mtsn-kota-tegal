import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
        month: 'long',
        year: 'numeric',
    });
}

function fallbackImage(id: number) {
    return `https://picsum.photos/1200/700?random=${id}`;
}

const BeritaDetail = () => {
    const { slug } = useParams<{ slug: string }>();

    const [berita, setBerita] = useState<Berita | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchBerita = async () => {
            try {
                setLoading(true);
                setError(null);
                setNotFound(false);

                // Endpoint backend: GET /api/berita/:slug -> { success, data }
                const res = await api.get(`/berita/${slug}`);

                if (res.data?.success) {
                    setBerita(res.data.data);
                } else {
                    setNotFound(true);
                }
            } catch (err: any) {
                console.error(err);
                if (err?.response?.status === 404) {
                    setNotFound(true);
                } else {
                    setError('Gagal memuat berita. Coba muat ulang halaman.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBerita();
    }, [slug]);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-24 animate-pulse">
                <div className="h-3 w-24 bg-gray-100 rounded mb-6" />
                <div className="h-9 w-3/4 bg-gray-100 rounded mb-4" />
                <div className="h-4 w-40 bg-gray-100 rounded mb-10" />
                <div className="h-[420px] w-full bg-gray-100 rounded-2xl mb-10" />
                <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-2/3 bg-gray-100 rounded" />
                </div>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-32 text-center">
                <p className="text-xs font-bold tracking-widest text-emerald-600 uppercase mb-3">404</p>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Berita tidak ditemukan</h1>
                <p className="text-gray-500 mb-8">
                    Berita yang kamu cari mungkin sudah dihapus atau alamatnya salah.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
                >
                    ← Kembali ke Beranda
                </Link>
            </div>
        );
    }

    if (error || !berita) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-32 text-center">
                <p className="text-red-500 text-sm mb-6">{error || 'Terjadi kesalahan.'}</p>
                <Link to="/" className="text-emerald-700 font-semibold hover:text-emerald-900">
                    ← Kembali ke Beranda
                </Link>
            </div>
        );
    }

    return (
        <article className="w-full font-sans text-gray-800">
            {/* HEADER */}
            <header className="px-6 md:px-20 pt-16 pb-10 max-w-4xl mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-700 transition-colors mb-8"
                >
                    ← Kembali ke Beranda
                </Link>

                <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
                    {berita.kategori?.nama}
                </span>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-5 leading-tight tracking-tight">
                    {berita.judul}
                </h1>

                <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>{berita.user?.nama}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{formatTanggal(berita.createdAt)}</span>
                </div>
            </header>

            {/* THUMBNAIL */}
            <div className="px-6 md:px-20 max-w-5xl mx-auto mb-12">
                <div className="h-[280px] md:h-[480px] rounded-2xl overflow-hidden bg-gray-100">
                    <img
                        src={berita.thumbnail || fallbackImage(berita.id)}
                        alt={berita.judul}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* KONTEN */}
            <div className="px-6 md:px-20 max-w-3xl mx-auto pb-24">
                {berita.ringkasan && (
                    <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8 border-l-4 border-emerald-500 pl-5">
                        {berita.ringkasan}
                    </p>
                )}

                <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                    {berita.isi}
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-900 transition-colors"
                    >
                        ← Lihat berita lainnya
                    </Link>
                </div>
            </div>
            
            
        </article>
        
        
    );
};

export default BeritaDetail;