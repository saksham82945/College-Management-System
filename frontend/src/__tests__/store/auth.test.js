import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '@/store/auth';

vi.unmock('@/store/auth');

const mockLocalStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = value.toString(); },
    removeItem(key) { delete this.store[key]; },
    clear() { this.store = {}; }
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Reset Zustand store between tests
beforeEach(() => {
    useAuthStore.setState({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isInitialized: false,
    });
    window.localStorage.clear();
});

describe('useAuthStore — Unit Tests', () => {

    describe('login()', () => {
        test('should set user and tokens in state', () => {
            const { result } = renderHook(() => useAuthStore());
            const mockUser = { id: 'u1', fullName: 'Alice', roles: ['ADMIN'] };

            act(() => {
                result.current.login(mockUser, 'access_token_123', 'refresh_token_456');
            });

            expect(result.current.user).toEqual(mockUser);
            expect(result.current.accessToken).toBe('access_token_123');
            expect(result.current.refreshToken).toBe('refresh_token_456');
            expect(result.current.isAuthenticated).toBe(true);
        });

        test('should persist tokens to localStorage', () => {
            const { result } = renderHook(() => useAuthStore());

            act(() => {
                result.current.login({ id: 'u1', fullName: 'Alice', roles: [] }, 'at', 'rt');
            });

            expect(localStorage.getItem('accessToken')).toBe('at');
            expect(localStorage.getItem('refreshToken')).toBe('rt');
            expect(localStorage.getItem('user')).toBeTruthy();
        });
    });

    describe('logout()', () => {
        test('should clear user and tokens from state', () => {
            const { result } = renderHook(() => useAuthStore());

            act(() => {
                result.current.login({ id: 'u1', fullName: 'Bob', roles: ['STUDENT'] }, 'at', 'rt');
            });
            act(() => {
                result.current.logout();
            });

            expect(result.current.user).toBeNull();
            expect(result.current.accessToken).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
        });

        test('should remove tokens from localStorage on logout', () => {
            const { result } = renderHook(() => useAuthStore());

            act(() => {
                result.current.login({ id: 'u2', fullName: 'Eve', roles: [] }, 'at', 'rt');
            });
            act(() => {
                result.current.logout();
            });

            expect(localStorage.getItem('accessToken')).toBeNull();
            expect(localStorage.getItem('refreshToken')).toBeNull();
            expect(localStorage.getItem('user')).toBeNull();
        });
    });

    describe('hydrate()', () => {
        test('should restore state from localStorage when tokens exist', () => {
            const mockUser = { id: 'u3', fullName: 'Charlie', roles: ['TEACHER'] };
            localStorage.setItem('accessToken', 'stored_at');
            localStorage.setItem('refreshToken', 'stored_rt');
            localStorage.setItem('user', JSON.stringify(mockUser));

            const { result } = renderHook(() => useAuthStore());

            act(() => {
                result.current.hydrate();
            });

            expect(result.current.isAuthenticated).toBe(true);
            expect(result.current.user).toEqual(mockUser);
            expect(result.current.isInitialized).toBe(true);
        });

        test('should mark initialized=true even when no tokens in storage', () => {
            const { result } = renderHook(() => useAuthStore());

            act(() => {
                result.current.hydrate();
            });

            expect(result.current.isInitialized).toBe(true);
            expect(result.current.isAuthenticated).toBe(false);
        });
    });

    describe('setUser()', () => {
        test('should update only the user field', () => {
            const { result } = renderHook(() => useAuthStore());

            act(() => {
                result.current.setUser({ id: 'u4', fullName: 'Dave', roles: [] });
            });

            expect(result.current.user?.fullName).toBe('Dave');
        });
    });
});
