import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from "react-router-dom";

// ============================================================
// KONFIGURASI — sesuaikan dengan alamat backend be-wpm kamu
// ============================================================
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://be-mtsn.vercel.app";
const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/login`;
// ============================================================

interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: {
        id: number;
        nama: string;
        email: string;
    };
}

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: "error" | "success"; message: string } | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlert(null);

        if (!email.trim() || !password) {
            setAlert({ type: "error", message: "Email dan kata sandi wajib diisi." });
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch(LOGIN_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), password }),
            });

            const data: LoginResponse = await res.json();

            if (!res.ok || !data.success) {
                setAlert({ type: "error", message: data.message || "Email atau kata sandi salah." });
                setIsLoading(false);
                return;
            }

            // Simpan token & data user
            localStorage.setItem("token", data.token ?? "");
            localStorage.setItem("user", JSON.stringify(data.user));

            setAlert({
                type: "success",
                message: `Login berhasil. Selamat datang, ${data.user?.nama ?? ""}.`,
            });

            setTimeout(() => {
                navigate("/AdminBeritaPage");
            }, 600);
        } catch (err) {
            console.error("Login request failed:", err);
            setAlert({
                type: "error",
                message: "Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.",
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Bagian Kiri: Informasi / Branding */}
                <aside className="md:w-5/12 bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
                    {/* Ornamen Latar Belakang (Aksen Abstrak) */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-teal-400 opacity-20 blur-xl"></div>

                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white text-emerald-700 rounded-xl flex items-center justify-center font-extrabold text-2xl mb-8 shadow-lg">
                            MT
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4 text-white">
                            Portal Internal<br />
                            <span className="text-emerald-200 text-2xl lg:text-3xl">MTsN Kota Tegal</span>
                        </h1>
                        <p className="text-emerald-50 text-sm leading-relaxed max-w-sm mt-4 opacity-90">
                            Masuk untuk mengelola profil sekolah, berita, dan konten website.
                        </p>
                        <Link to="/" className="inline-block mt-6 text-sm font-semibold text-blue-500 hover:text-emerald-200 transition-colors">
                            Kembali &rarr;
                        </Link>
                    </div>

                    <div className="relative z-10 mt-12 pt-6 border-t border-emerald-500/30 text-xs font-semibold text-emerald-200 uppercase tracking-widest">
                        Akses Terbatas &middot; Staf &amp; Admin
                    </div>
                </aside>

                {/* Bagian Kanan: Form Login */}
                <section className="md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                    <div className="max-w-md w-full mx-auto">
                        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2">
                            Selamat datang kembali
                        </p>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Masuk ke akun Anda
                        </h2>
                        <p className="text-gray-500 mb-8 text-sm">
                            Gunakan email dan kata sandi terdaftar untuk melanjutkan.
                        </p>

                        {/* Alert / Notifikasi */}
                        {alert && (
                            <div
                                className={`p-4 rounded-lg mb-6 text-sm flex items-start gap-3 ${alert.type === "error"
                                    ? "bg-red-50 text-red-700 border border-red-200"
                                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    }`}
                            >
                                {/* Ikon untuk alert (Opsional, menggunakan bentuk SVG sederhana) */}
                                {alert.type === "error" ? (
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                                <span>{alert.message}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            {/* Input Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nama@mtsnkotategal.sch.id"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-gray-50 focus:bg-white text-gray-900"
                                />
                            </div>

                            {/* Input Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Kata sandi
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Masukkan kata sandi"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-gray-50 focus:bg-white text-gray-900 pr-24"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-gray-500 hover:text-emerald-600 focus:outline-none transition-colors"
                                    >
                                        {showPassword ? "Sembunyikan" : "Lihat"}
                                    </button>
                                </div>
                            </div>

                            {/* Tombol Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-emerald-500/30"
                            >
                                {isLoading && (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                <span>{isLoading ? "Memproses..." : "Masuk ke Dashboard"}</span>
                            </button>

                            {/* Meta & Register Link */}
                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                                <span className="text-sm text-gray-500">
                                    Belum punya akun?{" "}
                                    <Link to="/RegisterPage" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline transition-all">
                                        Daftar sekarang
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </section>

            </div>
        </div>
    );
}