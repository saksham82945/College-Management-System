import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginPage } from '@/pages/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { apiClient } from '@/services/api';

vi.mock('@/store/auth', () => ({
    useAuthStore: () => ({
        user: null,
        isAuthenticated: false,
        login: vi.fn(),
    }),
}));

describe('LoginPage Component — Unit Tests', () => {

    const renderWithRouter = () => {
        return render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
    };

    const navigateToForm = async () => {
        renderWithRouter();
        // Click the 'Admin Portal' button to go to login form
        const adminCard = screen.getAllByText(/Admin Portal/i)[0].closest('button');
        fireEvent.click(adminCard);
        // Wait for animation
        await waitFor(() => {
            expect(screen.getByPlaceholderText(/user@lnmi.ac.in/i)).toBeTruthy();
        });
    };

    describe('Rendering', () => {
        test('should render role selection initially', () => {
            renderWithRouter();
            expect(screen.getByText(/Account Selection/i)).toBeTruthy();
            expect(screen.getAllByText(/Admin Portal/i)[0]).toBeTruthy();
            expect(screen.getAllByText(/Student Portal/i)[0]).toBeTruthy();
        });

        test('should render email and password inputs after selecting role', async () => {
            await navigateToForm();
            expect(screen.getByPlaceholderText(/user@lnmi.ac.in/i)).toBeTruthy();
            expect(screen.getByPlaceholderText(/••••••••/i)).toBeTruthy();
        });
    });

    describe('Form Validation & Submission', () => {
        test('should show validation error when submitting empty form', async () => {
            await navigateToForm();
            const btn = screen.getByRole('button', { name: /sign in/i });
            fireEvent.click(btn);

            // Using HTML5 required attribute for validation, so the inputs will be marked invalid
            const emailInput = screen.getByPlaceholderText(/user@lnmi.ac.in/i);
            expect(emailInput.validity.valueMissing).toBe(true);
        });

    });
});

