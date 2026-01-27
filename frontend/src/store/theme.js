import create from 'zustand';
import { persist } from 'zustand/middleware';
export const useThemeStore = create()(persist((set) => ({
    isDarkMode: true, // Default to dark mode for that "DeFi" feel
    toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    setTheme: (isDark) => set({ isDarkMode: isDark }),
}), {
    name: 'theme-storage',
}));
