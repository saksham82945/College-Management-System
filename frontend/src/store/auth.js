import create from 'zustand';
export const useAuthStore = create((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isInitialized: false,
    login: (user, accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
        });
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
        });
    },
    setUser: (user) => set({ user }),
    hydrate: () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const user = localStorage.getItem('user');
        if (accessToken && refreshToken && user) {
            set({
                accessToken,
                refreshToken,
                user: JSON.parse(user),
                isAuthenticated: true,
                isInitialized: true,
            });
        }
        else {
            set({ isInitialized: true });
        }
    },
}));
