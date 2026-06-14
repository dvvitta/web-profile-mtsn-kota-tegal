import React from 'react';

const HubungiKami = () => {
    return (
        <div className="w-full font-sans text-gray-800 bg-[#f8f9fa] min-h-screen pb-20">

            {/* ========================================= */}
            {/* HEADER SECTION                            */}
            {/* ========================================= */}
            <section className="pt-20 pb-16 px-6 max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-[#0b5c3e] mb-4">
                    Hubungi Kami
                </h1>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                    Jalin komunikasi bersama kami melalui saluran resmi sekolah untuk informasi pendaftaran dan administrasi masa depan putra-putri Anda.
                </p>
            </section>

            {/* ========================================= */}
            {/* KONTAK & FORMULIR (2 Kolom)               */}
            {/* ========================================= */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                {/* --- KOLOM KIRI: INFO KONTAK & MAPS --- */}
                <div className="flex flex-col">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0b5c3e] mb-3">Informasi Kontak</h2>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                        Kunjungi kami atau hubungi melalui saluran komunikasi resmi sekolah untuk informasi lebih lanjut.
                    </p>

                    {/* Kotak-kotak Informasi */}
                    <div className="space-y-4 mb-8">

                        {/* Alamat */}
                        <div className="flex items-start gap-4 p-5 bg-[#f8fbfa] rounded-xl border border-gray-100/80">
                            <div className="text-[#0b5c3e] mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-[#0b5c3e] mb-1">Alamat Sekolah</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">Jl. Wisanggeni No. 01, Kel. Kejambon, Kec. Tegal Timur, Kota Tegal, Jawa Tengah 52124</p>
                            </div>
                        </div>

                        {/* Telepon */}
                        <div className="flex items-start gap-4 p-5 bg-[#f8fbfa] rounded-xl border border-gray-100/80">
                            <div className="text-[#0b5c3e] mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.864-1.041l-3.286-.481c-.498-.073-.99.21-1.12.695l-.21 1.111a12.04 12.04 0 01-7.143-7.143l1.112-.21c.484-.13.768-.62.695-1.12l-.48-3.286c-.075-.513-.525-.864-1.04-.864H4.5a2.25 2.25 0 00-2.25 2.25z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-[#0b5c3e] mb-1">Telepon / WhatsApp</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">(0283) 351234 / +62 812-3456-7890</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4 p-5 bg-[#f8fbfa] rounded-xl border border-gray-100/80">
                            <div className="text-[#0b5c3e] mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-[#0b5c3e] mb-1">Email Resmi</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">info@mtsnkotategal.sch.id</p>
                            </div>
                        </div>
                    </div>

                    {/* Maps (Dibuat sejajar dengan bawah form) */}
                    <div className="w-full grow min-h-80 bg-gray-200 rounded-xl overflow-hidden shadow-inner relative">
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

                {/* --- KOLOM KANAN: FORMULIR PESAN --- */}
                <div>
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200 h-full">
                        <h3 className="text-xl font-bold text-[#0b5c3e] mb-6">Kirim Pesan</h3>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

                            {/* Nama Lengkap */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nama lengkap Anda"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0b5c3e] focus:border-[#0b5c3e] text-sm text-gray-800 bg-white placeholder-gray-400 transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
                                <input
                                    type="email"
                                    placeholder="email@contoh.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0b5c3e] focus:border-[#0b5c3e] text-sm text-gray-800 bg-white placeholder-gray-400 transition-colors"
                                />
                            </div>

                            {/* Subjek / Kategori */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
                                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0b5c3e] focus:border-[#0b5c3e] text-sm text-gray-800 bg-white appearance-none cursor-pointer transition-colors bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[size:0.65rem_auto]">
                                    <option>Informasi Pendaftaran (PPDB)</option>
                                    <option>Informasi Akademik & Kurikulum</option>
                                    <option>Kerja Sama / Kunjungan</option>
                                    <option>Lainnya</option>
                                </select>
                            </div>

                            {/* Textarea Pesan */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pesan Anda</label>
                                <textarea
                                    rows= {4}
                                    placeholder="Tuliskan pesan Anda secara detail..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0b5c3e] focus:border-[#0b5c3e] text-sm text-gray-800 bg-white placeholder-gray-400 resize-none transition-colors"
                                ></textarea>
                            </div>

                            {/* Tombol Kirim dengan SVG Icon */}
                            <button
                                type="submit"
                                className="w-full bg-[#0b5c3e] hover:bg-[#084a31] text-white font-medium py-3.5 rounded-lg flex justify-center items-center gap-2 transition-all duration-200 mt-4"
                            >
                                Kirim Pesan
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>

                        </form>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default HubungiKami;