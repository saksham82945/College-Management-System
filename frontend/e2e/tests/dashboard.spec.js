import { test, expect } from '@playwright/test';

test.describe('Dashboard Flow', () => {

    test.beforeEach(async ({ page }) => {
        // Authenticate as Admin
        await page.goto('/login');
        await page.getByText(/Admin Portal/i).first().click();
        await page.getByPlaceholder(/user@lnmi.ac.in/i).fill('admin@college.com');
        await page.getByPlaceholder(/••••••••/i).fill('admin123'); // Assume seeded password
        await page.getByRole('button', { name: /sign in/i }).click();
        await expect(page).toHaveURL(/.*\/dashboard/);
    });

    test('should render stat cards on admin dashboard', async ({ page }) => {
        // Look for the "Total Students" text
        await expect(page.getByText(/total students/i).first()).toBeVisible();
        await expect(page.getByText(/total teachers/i).first()).toBeVisible();
    });

    test('should render charts container', async ({ page }) => {
        // Check if the canvas element for the chart is rendered
        await expect(page.locator('canvas').first()).toBeVisible();
    });

    test('sidebar should contain navigation links', async ({ page }) => {
        await expect(page.getByRole('link', { name: /students/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /teachers/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /staff/i })).toBeVisible();
    });
});
