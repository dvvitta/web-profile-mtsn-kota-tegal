import { create } from 'zustand';

const UIStore = create((set) => ({
    isMobileMenuOpen: false,
    toggleMobileMenu: () => set((state: { isMobileMenuOpen: any; }) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));

export default UIStore;