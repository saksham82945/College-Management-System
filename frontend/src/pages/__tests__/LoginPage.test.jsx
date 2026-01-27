import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginPage } from '../LoginPage';

// Mock routing
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

// Mock store
const mockLogin = vi.fn();
vi.mock('@/store/auth', () => ({
    useAuthStore: () => ({
        login: mockLogin,
    }),
}));

// Mock API client
vi.mock('@/services/api', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

describe('LoginPage Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the role selection initially', () => {
        render(<LoginPage />);
        expect(screen.getByText('Select Portal')).toBeInTheDocument();
        expect(screen.getByText('Administrator')).toBeInTheDocument();
        expect(screen.getByText('Student Portal')).toBeInTheDocument();
        expect(screen.getByText('Teacher / Faculty')).toBeInTheDocument();
    });

    it('proceeds to login form when a role is selected', () => {
        render(<LoginPage />);
        fireEvent.click(screen.getByText('Student Portal'));
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });
});
