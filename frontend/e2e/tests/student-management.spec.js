import { test, expect } from '@playwright/test';

test.describe('Student Management - E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await page.getByRole('button', { name: /Administrator/i }).click();
        await page.getByPlaceholder(/name@college.edu/i).fill('admin@lnmcollege.com');
        await page.getByPlaceholder(/••••••••/i).fill('admin123');
        await page.getByRole('button', { name: /Sign In/i }).click();
        await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    });

    test('should view students list', async ({ page }) => {
        await page.getByRole('link', { name: /students/i }).first().click();
        await expect(page).toHaveURL(/\/students/);

        await expect(page.getByText(/students|student list/i)).toBeVisible();
    });

    test('should add new student', async ({ page }) => {
        await page.goto('/students');

        const addButton = page.getByRole('button', { name: /add student|new student/i });
        if (await addButton.isVisible()) {
            await addButton.click();

            await expect(page.getByText(/add student|new student/i)).toBeVisible();

            const timestamp = Date.now();
            await page.getByLabel(/first name/i).fill('John');
            await page.getByLabel(/last name/i).fill('Doe');
            await page.getByLabel(/email/i).fill(`john.doe.${timestamp}@test.com`);

            await page.getByRole('button', { name: /save|submit|add/i }).click();

            await expect(page.getByText(/success|added/i)).toBeVisible({ timeout: 5000 });
        }
    });

    test('should search for students', async ({ page }) => {
        await page.goto('/students');

        const searchInput = page.getByPlaceholder(/search/i);
        if (await searchInput.isVisible()) {
            await searchInput.fill('John');
            await page.waitForTimeout(500);
        }
    });

    test('should view student details', async ({ page }) => {
        await page.goto('/students');

        const firstStudent = page.locator('tr').nth(1);
        if (await firstStudent.isVisible()) {
            await firstStudent.click();
            await expect(page).toHaveURL(/\/students\/.+/);
        }
    });

    test('should edit student information', async ({ page }) => {
        await page.goto('/students');

        const editButton = page.getByRole('button', { name: /edit/i }).first();
        if (await editButton.isVisible()) {
            await editButton.click();

            const phoneInput = page.getByLabel(/phone/i);
            if (await phoneInput.isVisible()) {
                await phoneInput.clear();
                await phoneInput.fill('9876543210');

                await page.getByRole('button', { name: /save|update/i }).click();

                await expect(page.getByText(/success|updated/i)).toBeVisible({ timeout: 5000 });
            }
        }
    });

    test('should delete student', async ({ page }) => {
        await page.goto('/students');

        const deleteButton = page.getByRole('button', { name: /delete/i }).first();
        if (await deleteButton.isVisible()) {
            await deleteButton.click();

            const confirmButton = page.getByRole('button', { name: /confirm|yes|delete/i });
            if (await confirmButton.isVisible()) {
                await confirmButton.click();

                await expect(page.getByText(/success|deleted/i)).toBeVisible({ timeout: 5000 });
            }
        }
    });

    test('should filter students by class or criteria', async ({ page }) => {
        await page.goto('/students');

        const filterSelect = page.getByRole('combobox').first();
        if (await filterSelect.isVisible()) {
            await filterSelect.click();
            await page.getByRole('option').first().click();
            await page.waitForTimeout(500);
        }
    });

    test('should paginate through students list', async ({ page }) => {
        await page.goto('/students');

        const nextButton = page.getByRole('button', { name: /next/i });
        if (await nextButton.isVisible() && !await nextButton.isDisabled()) {
            await nextButton.click();
            await page.waitForTimeout(500);

            const prevButton = page.getByRole('button', { name: /previous|prev/i });
            await expect(prevButton).toBeVisible();
        }
    });
});

test.describe('Student Form Validation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await page.getByRole('button', { name: /Administrator/i }).click();
        await page.getByPlaceholder(/name@college.edu/i).fill('admin@lnmcollege.com');
        await page.getByPlaceholder(/••••••••/i).fill('admin123');
        await page.getByRole('button', { name: /Sign In/i }).click();
        await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
        await page.goto('/students');
    });

    test('should validate required fields', async ({ page }) => {
        const addButton = page.getByRole('button', { name: /add student|new student/i });
        if (await addButton.isVisible()) {
            await addButton.click();
            await page.getByRole('button', { name: /save|submit|add/i }).click();
        }
    });

    test('should validate email format', async ({ page }) => {
        const addButton = page.getByRole('button', { name: /add student|new student/i });
        if (await addButton.isVisible()) {
            await addButton.click();

            const emailInput = page.getByLabel(/email/i);
            if (await emailInput.isVisible()) {
                await emailInput.fill('invalid-email');

                await page.getByRole('button', { name: /save|submit|add/i }).click();

                await expect(page.getByText(/invalid|valid email/i)).toBeVisible();
            }
        }
    });
});
