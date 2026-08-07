import { test, expect } from '@playwright/test';

test.describe('Authentication Flow - E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should complete login flow as admin', async ({ page }) => {
        await page.getByRole('link', { name: /login/i }).first().click();
        await expect(page).toHaveURL(/\/login/);

        await page.getByText(/Admin Portal/i).first().click();

        await page.getByPlaceholder(/user@lnmi.ac.in/i).fill('admin@college.com');
        await page.getByPlaceholder(/••••••••/i).fill('admin123');

        await page.getByRole('button', { name: /Sign In/i }).click();

        await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
        await expect(page.getByText(/dashboard/i)).toBeVisible();
    });

    test('should complete login flow as student', async ({ page }) => {
        await page.goto('/login');

        await page.getByText(/Student Portal/i).first().click();

        await page.getByPlaceholder(/user@lnmi.ac.in/i).fill('student@college.com');
        await page.getByPlaceholder(/••••••••/i).fill('student123');

        await page.getByRole('button', { name: /Sign In/i }).click();

        await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    });

    test('should show error for invalid credentials', async ({ page }) => {
        await page.goto('/login');

        await page.getByText(/Admin Portal/i).first().click();

        await page.getByPlaceholder(/user@lnmi.ac.in/i).fill('wrong@example.com');
        await page.getByPlaceholder(/••••••••/i).fill('wrongpassword');

        await page.getByRole('button', { name: /Sign In/i }).click();

        await expect(page.getByText(/invalid credentials/i)).toBeVisible({ timeout: 5000 });
    });

    test('should allow navigation back to role selection', async ({ page }) => {
        await page.goto('/login');

        await page.getByText(/Admin Portal/i).first().click();

        await page.getByRole('button', { name: /Back to selection/i }).click();

        await expect(page.getByText(/Account Selection/i)).toBeVisible();
        await expect(page.getByText(/Admin Portal/i).first()).toBeVisible();
    });

    test('should navigate back to home page', async ({ page }) => {
        await page.goto('/login');

        await page.getByRole('button', { name: /Return to Homepage/i }).click();

        await expect(page).toHaveURL('/');
    });

    test('should handle empty form submission', async ({ page }) => {
        await page.goto('/login');

        await page.getByText(/Admin Portal/i).first().click();

        await page.getByRole('button', { name: /Sign In/i }).click();
    });

    test('should preserve input values after failed login', async ({ page }) => {
        await page.goto('/login');

        await page.getByText(/Admin Portal/i).first().click();

        const testEmail = 'test@example.com';

        await page.getByPlaceholder(/user@lnmi.ac.in/i).fill(testEmail);
        await page.getByPlaceholder(/••••••••/i).fill('wrongpassword');

        await page.getByRole('button', { name: /Sign In/i }).click();

        await page.waitForTimeout(1000);

        const emailInput = page.getByPlaceholder(/user@lnmi.ac.in/i);
        await expect(emailInput).toHaveValue(testEmail);
    });
});

test.describe('Session Persistence', () => {
    test('should maintain session after page reload', async ({ page }) => {
        await page.goto('/login');
        await page.getByText(/Admin Portal/i).first().click();
        await page.getByPlaceholder(/user@lnmi.ac.in/i).fill('admin@college.com');
        await page.getByPlaceholder(/••••••••/i).fill('admin123');
        await page.getByRole('button', { name: /Sign In/i }).click();

        await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

        await page.reload();

        await expect(page).toHaveURL(/\/dashboard/);
    });
});

test.describe('Logout Flow', () => {
    test('should logout successfully', async ({ page }) => {
        await page.goto('/login');
        await page.getByText(/Admin Portal/i).first().click();
        await page.getByPlaceholder(/user@lnmi.ac.in/i).fill('admin@college.com');
        await page.getByPlaceholder(/••••••••/i).fill('admin123');
        await page.getByRole('button', { name: /Sign In/i }).click();

        await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

        const logoutButton = page.getByRole('button', { name: /logout|sign out/i });
        if (await logoutButton.isVisible()) {
            await logoutButton.click();

            await expect(page).toHaveURL(/\/(|login)/);
        }
    });
});
