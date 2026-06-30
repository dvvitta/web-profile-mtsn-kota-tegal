import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    isAdmin: boolean;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAdmin: false,
    setUser: (user) => set({
        user,
        // Cek apakah user memiliki role admin dari metadata
        isAdmin: user?.user_metadata?.role === 'admin'
    }),
}));
export const useUIStore = create((set) => ({
    isMobileMenuOpen: false,
    toggleMobileMenu: () => set((state: { isMobileMenuOpen: any; }) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));    