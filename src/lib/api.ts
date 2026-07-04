import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// 1. Konfigurasi Supabase Client
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://wigdpcfhmyrzuzwnlqpv.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '<anon-public-key-dari-dashboard-supabase>';

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY wajib diisi di file .env'
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Konfigurasi Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// Kirim token di setiap request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Tangkap response 401 → bersihkan token → redirect ke login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect ke login tanpa useNavigate (karena ini di luar komponen React)
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;