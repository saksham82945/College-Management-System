import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock framer-motion to avoid animation complexity in tests
vi.mock('framer-motion', () => ({
    motion: new Proxy({}, {
        get: (_, tag) => {
            const { createElement } = require('react');
            return ({ children, ...props }) => createElement(tag, props, children);
        }
    }),
    AnimatePresence: ({ children }) => children,
    useAnimation: () => ({ start: vi.fn() }),
    useMotionValue: (v) => ({ get: () => v, set: vi.fn() }),
    useTransform: () => ({ get: () => 0 }),
}));

// Mock ThemeContext
vi.mock('@/context/ThemeContext', () => ({
    useTheme: () => ({ isDarkMode: false, roleTheme: 'from-indigo-500 to-purple-600' }),
}));

// Auth store is tested directly in auth.test.js. Components should mock it individually.

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
        useParams: () => ({}),
        BrowserRouter: ({ children }) => children,
    };
});

// Mock API client
vi.mock('@/services/api', () => ({
    apiClient: {
        get: vi.fn().mockResolvedValue({ data: { data: { students: [], total: 0 } } }),
        post: vi.fn().mockResolvedValue({ data: { success: true } }),
        put: vi.fn().mockResolvedValue({ data: { success: true } }),
        delete: vi.fn().mockResolvedValue({ data: { success: true } }),
    },
}));

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));
