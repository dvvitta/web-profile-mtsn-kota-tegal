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

// 3. Interceptor Axios yang Menggunakan Token Supabase
api.interceptors.request.use(async (config) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;