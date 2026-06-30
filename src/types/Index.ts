export interface kategori {
    id: number;
    name: string;
}

export interface Berita {
    id: number;
    judul: string;
    slug: string;
    isi: string;
    kategori: kategori;
    image?: string | null;
    userId: number;
    published: boolean;
    publishedAt: Date;
    //Jika backend melakukan populate data kategori
}