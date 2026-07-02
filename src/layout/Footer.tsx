const Footer = () => {
    return (
        <footer className="bg-green-950 text-white pt-16 pb-8 px-8 md:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 max-w-7xl mx-auto px-9">
                <iframe
                src="https://www.youtube.com/embed/gV3bHotDFZw?si=NLglIW8zAm4SRzeF"
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen></iframe>
                <iframe
                src="https://www.youtube.com/embed/5kB8a-1KRvU?si=k_sXUJipghjmtSXA"
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen></iframe>
                <iframe
                src="https://www.youtube.com/embed/rmHIvL9y9a4?si=uw3CeYP2EwSZrYCN"
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen></iframe>

            </div>
            <div className="w-full row-auto grid grid-cols-1 md:grid-cols-1 gap-12 max-w-7xl mx-auto">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className="text-xl font-bold mb-4">MTsN Kota Tegal</h3>
                        <p className="text-sm text-gray-400 mb-4">Jl. Pendidikan No. 123, Kecamatan Tegal Selatan, Kota Tegal, Jawa Tengah.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-green-400">Tautan Cepat</h4>
                        <ul className="text-sm text-gray-400 space-y-2">
                            <li>Beranda</li><li>Profil</li><li>Akademik</li><li>PPDB</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-green-400">Kontak</h4>
                        <ul className="text-sm text-gray-400 space-y-2">
                            <li>info@mtsnkotategal.sch.id</li><li>(0283) 123456</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-green-400">Lokasi Kami</h4>
                        {/* Mengubah tinggi container agar peta lebih jelas dilihat (h-48 atau h-64 direkomendasikan) */}
                        {/* Menambahkan overflow-hidden agar ujung peta ikut melengkung sesuai rounded-lg */}
                        <div className="w-full min-h-60 min-w-80 bg-gray-700 rounded-lg overflow-hidden relative border border-gray-600">
                            <iframe
                                /* Pastikan src menggunakan link Embed dari Google Maps yang valid */
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.177657603143!2d109.11210767356464!3d-6.869304067207514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb75e94a7a8e5%3A0x37236192dfabece1!2sMAN%20Kota%20Tegal!5e0!3m2!1sen!2sid!4v1781424346502!5m2!1sen!2sid"
                                className="absolute top-0 left-0"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-500 border-t border-green-900 pt-8">
                    © 2026 MTsN Kota Tegal. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;