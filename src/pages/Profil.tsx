import React from 'react';

const Profil = () => {
    return (
        <div className="w-full font-sans text-gray-800 bg-white">

            {/* HERO SECTION - TENTANG KAMI */}
            <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden border-b border-gray-200">
                {/* Background Image Placeholder dengan efek pudar */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-20 grayscale"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop')" }}
                ></div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <span className="bg-green-200/80 text-green-900 font-bold px-4 py-1.5 text-xs tracking-widest rounded-full mb-6 inline-block uppercase shadow-sm">
                        Tentang Kami
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-green-950 mb-6">
                        Profil Madrasah
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Mewujudkan generasi yang unggul dalam Imtaq dan Iptek melalui tradisi pendidikan yang modern.
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">

                {/* SIDEBAR NAVIGATION */}
                <aside className="md:col-span-3">
                    <div className="bg-[#f8fbfa] p-6 rounded-2xl sticky top-28 border border-gray-100">
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-gray-900">Profil</h3>
                            <p className="text-xs text-gray-500 mt-1">Identitas Sekolah</p>
                        </div>

                        <ul className="space-y-2">
                            <li>
                                <a href="#sejarah" className="w-full text-left bg-green-800 text-white px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors shadow-sm">
                                    <span>⏱️</span> Sejarah
                                </a>
                            </li>
                            <li>
                                <a href="#visi-misi" className="w-full text-left text-gray-600 hover:bg-green-50 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors">
                                    <span>🎯</span> Visi & Misi
                                </a>
                            </li>
                            <li>
                                <a href="#struktur" className="w-full text-left text-gray-600 hover:bg-green-50 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors">
                                    <span>🏢</span> Struktur Organisasi
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* CONTENT SECTIONS */}
                <div className="md:col-span-9 space-y-24">

                    {/* SECTION: SEJARAH */}
                    <div id="sejarah" className="scroll-mt-32">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-1 bg-green-800 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-green-950">Sejarah Madrasah</h2>
                        </div>

                        <div className="flex flex-col-reverse lg:flex-row gap-10 items-start">
                            <div className="lg:w-3/5 text-gray-600 space-y-5 leading-relaxed text-sm md:text-base">
                                <p>
                                    Sebuah institusi besar tidak pernah lahir dalam semalam. Ada peluh, dedikasi, dan sinergi dari banyak pihak di balik kokohnya bangunan Madrasah Aliyah Negeri (MAN) Kota Tegal hari ini. Inilah kisah perjalanan kami—sebuah bukti nyata bahwa keterbatasan bukanlah penghalang untuk mencetak generasi gemilang.
                                </p>
                                <p>
                                    Kisah kami bermula pada tahun 1984. Diprakarsai oleh Yayasan Assalafiyah, madrasah ini awalnya hanyalah sebuah kelas jauh (filial) dari MAN Babakan. Di bawah arahan Kepala Madrasah pertama, Mu’min Mahmud, langkah kecil ini dimulai.

                                    Meski hanya menempati gedung MTs Assalafiyah dengan Kegiatan Belajar Mengajar (KBM) yang dilangsungkan pada sore hingga malam hari, semangat belajar tak pernah padam. Angkatan pertama kami sukses menarik ±160 siswa yang terbagi dalam empat rombongan belajar.
                                </p>
                                <p>Seiring turunnya SK Pusat pada 5 Agustus 1986, madrasah yang saat itu dipimpin oleh Mustadjab mulai menunjukkan taringnya. Kami dipercaya menyelenggarakan Ujian Akhir (EBTAN) perdana pada tahun ajaran 1986/1987 untuk 143 siswa.

                                    Fase ini adalah fase perjuangan. Demi mendapatkan waktu belajar yang lebih optimal di pagi hari, madrasah ini sempat beberapa kali berpindah lokasi—mulai dari MDA Kemeduran, Jalan Arum Randugunting, hingga MTs Al Munawar. Namun, semangat civitas akademika tidak pernah surut sedikit pun.</p>
                                <p>Kerja keras bertahun-tahun akhirnya berbuah manis. Di era kepemimpinan Mohammad Cholid yang kemudian dilanjutkan oleh M. Sanuddin, angin segar itu datang. Tepat pada 25 November 1995, SK Penegerian resmi turun.

                                    Momen bersejarah ini diproklamirkan dengan penuh kebanggaan di Pendopo Balai Kota Tegal pada 7 Maret 1996. Peresmian ini menjadi simbol kolaborasi yang harmonis antara Wali Kota Tegal saat itu, M. Zakir, dan Kepala Kandepag, Mulyono.</p>
                                <p>Langkah MAN Kota Tegal semakin tegak berkat kemuliaan hati Bapak Ismail (pensiunan pegawai Kandepag) dan sang istri, Ibu Rukoyah (pemilik PO. Dewi Sri), yang mewakafkan sebidang tanah. Di bawah kepemimpinan Chudlori Affandi, pembangunan tahap awal di Pesurungan Lor pun terealisasi.

                                    Hadirnya gedung baru menjadi magnet luar biasa. Animo masyarakat melonjak tajam hingga nyaris sepuluh kali lipat dari jumlah siswa sebelumnya. Saking banyaknya pendaftar, KBM bahkan sempat harus dibagi di dua lokasi yang berbeda.
                                </p>
                                <p>Keterbatasan sarana tak membuat kami diam menunggu. Melalui inisiatif luar biasa dari Kamaluddin dan sistem imbal swadaya, kami berhasil membangun tambahan ruang kelas secara mandiri. Perjuangan gigih ini akhirnya menarik perhatian penuh dari Kanwil Departemen Agama Provinsi Jawa Tengah.

                                    Tepat pada tahun ajaran 2001/2002, seluruh aktivitas MAN Kota Tegal resmi menyatu di gedung baru Pesurungan Lor. Perkembangan tidak berhenti di situ. Pada 11 Agustus 2003, berkat usulan Kepala Madrasah Mubasyir Dahlan dan dukungan Wali Kota Adi Winarso, madrasah mendapatkan hak pakai tanah seluas 4.600 m² untuk terus memperluas fasilitas.
                                </p>
                                <p>Kini, MAN Kota Tegal bukan lagi sekadar "kelas jauh" yang belajar di sore hari. Kami berdiri tegak sebagai institusi pendidikan kebanggaan masyarakat yang terus didukung oleh pemerintah dan Depag, siap mencetak generasi pemimpin masa depan yang berakhlak mulia dan berwawasan luas.</p>
                            </div>

                            <div className="lg:w-2/5 bg-[#f8fbfa] p-3 rounded-2xl border border-gray-100 shadow-sm w-full">
                                <img
                                    src="https://via.placeholder.com/600x400"
                                    alt="Arsip Sejarah"
                                    className="rounded-xl mb-4 w-full object-cover h-48 md:h-56"
                                />
                                <p className="text-xs text-center text-gray-500 px-4 pb-2">
                                    Arsip dokumentasi awal pendirian MTsN Kota Tegal.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION: VISI & MISI */}
                    <div id="visi-misi" className="scroll-mt-32">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-1 bg-green-800 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-green-950">Visi & Misi</h2>
                        </div>

                        {/* Visi Card */}
                        <div className="bg-green-900 text-white p-12 rounded-2xl text-center mb-8 shadow-lg">
                            <div className="mb-4 text-4xl">👁️</div>
                            <h3 className="text-2xl font-bold mb-4 tracking-wide">Visi</h3>
                            <p className="text-green-100 leading-relaxed max-w-3xl mx-auto text-lg">
                                "Terwujudnya Madrasah yang Unggul, Berkarakter Islami, Berwawasan Lingkungan, dan Berstandar Internasional pada tahun 2029."
                            </p>
                        </div>

                        {/* Misi Cards (3 Columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Akademik */}
                            <div className="border border-green-800 rounded-2xl p-8 bg-white hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-green-100 text-green-800 flex items-center justify-center rounded-full mb-6 text-xl">
                                    🎓
                                </div>
                                <h4 className="font-bold text-green-950 text-lg mb-3">Akademik</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Menyelenggarakan pembelajaran berkualitas untuk penguasaan Iptek dan bahasa asing.
                                </p>
                            </div>

                            {/* Karakter */}
                            <div className="border border-green-800 rounded-2xl p-8 bg-white hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-green-100 text-green-800 flex items-center justify-center rounded-full mb-6 text-xl">
                                    ✨
                                </div>
                                <h4 className="font-bold text-green-950 text-lg mb-3">Karakter</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Membentuk pribadi yang jujur, amanah, dan berakhlakul karimah dalam setiap aspek kehidupan.
                                </p>
                            </div>

                            {/* Lingkungan */}
                            <div className="border border-green-800 rounded-2xl p-8 bg-white hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-green-100 text-green-800 flex items-center justify-center rounded-full mb-6 text-xl">
                                    🌱
                                </div>
                                <h4 className="font-bold text-green-950 text-lg mb-3">Lingkungan</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Membudayakan sikap peduli lingkungan yang asri, sehat, dan berkelanjutan.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* SECTION: STRUKTUR ORGANISASI */}
                    <div id="struktur" className="scroll-mt-32">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-1 bg-green-800 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-green-950">Struktur Organisasi</h2>
                        </div>

                        <div className="border border-gray-200 rounded-3xl bg-[#f8fbfa] overflow-hidden shadow-sm">

                            {/* Kepala Madrasah */}
                            <div className="p-12 text-center flex flex-col items-center border-b border-gray-200 bg-white">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Kepala Madrasah"
                                    className="w-28 h-32 rounded-xl object-cover mb-6 shadow-md border border-gray-100"
                                />
                                <h3 className="font-bold text-2xl text-green-950">Drs. H. Mufid, M.Pd</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold mt-2">Kepala Madrasah</p>
                            </div>

                            {/* Wakil Kepala (4 Columns) */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-200 text-center bg-[#f8fbfa]">

                                <div className="p-8 hover:bg-white transition-colors">
                                    <p className="text-xs text-gray-500 mb-2 font-medium">Kurikulum</p>
                                    <p className="text-sm font-bold text-gray-900">Waka Kurikulum</p>
                                </div>

                                <div className="p-8 hover:bg-white transition-colors">
                                    <p className="text-xs text-gray-500 mb-2 font-medium">Kesiswaan</p>
                                    <p className="text-sm font-bold text-gray-900">Waka Kesiswaan</p>
                                </div>

                                <div className="p-8 hover:bg-white transition-colors">
                                    <p className="text-xs text-gray-500 mb-2 font-medium">Sarpras</p>
                                    <p className="text-sm font-bold text-gray-900">Waka Sarana<br />Prasarana</p>
                                </div>

                                <div className="p-8 hover:bg-white transition-colors">
                                    <p className="text-xs text-gray-500 mb-2 font-medium">Humas</p>
                                    <p className="text-sm font-bold text-gray-900">Waka Humas</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Profil;