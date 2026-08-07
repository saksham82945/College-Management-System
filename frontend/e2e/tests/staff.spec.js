import { test, expect } from '@playwright/test';

test.describe('Staff Management Flow', () => {

    test.beforeEach(async ({ page }) => {
        // Authenticate as Admin
        await page.goto('/login');
        await page.getByText(/Admin Portal/i).first().click();
        await page.getByPlaceholder(/user@lnmi.ac.in/i).fill('admin@college.com');
        await page.getByPlaceholder(/••••••••/i).fill('admin123');
        await page.getByRole('button', { name: /sign in/i }).click();
        await expect(page).toHaveURL(/.*\/dashboard/);
        
        // Navigate to Staff page
        await page.getByRole('link', { name: /staff/i }).click();
        await expect(page).toHaveURL(/.*\/staff/);
    });

    test('should display staff page header and table', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /staff directory/i })).toBeVisible();
        await expect(page.getByRole('table')).toBeVisible();
    });

    test('should open add staff modal when clicking Add Staff button', async ({ page }) => {
        await page.getByRole('button', { name: /add staff/i }).click();
        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.getByText(/add new staff/i)).toBeVisible();
    });
});
