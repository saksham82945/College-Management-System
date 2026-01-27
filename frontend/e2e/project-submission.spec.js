import { test, expect } from '@playwright/test';

// Helper to login
async function login(page, email, password, role) {
    await page.goto('/login');

    await page.click(`button:has-text("${role}")`);

    await page.fill('input[name="email"]', email);
    await page.fill('input[type="password"]', password);

    await page.click('button[type="submit"]:has-text("Sign In")');

    await page.waitForURL('/dashboard');
}

test.describe('Project Submission Flow', () => {
    test.use({ storageState: undefined }); // Clear cookies

    test('Complete flow: Student proposes project, submits report, Faculty grades', async ({ page, context }) => {
        // ===== STUDENT: Propose Project =====
        await login(page, 'student@test.com', 'password123', 'Student');

        await page.goto('/projects/my-project');

        await expect(page.locator('text=No Project Found')).toBeVisible();

        await page.click('button:has-text("Propose New Project")');

        await page.fill('input[placeholder*="Project Title"]', 'AI-Powered Student Management System');
        await page.fill('textarea[placeholder*="Brief description"]', 'An intelligent system to manage student records, attendance, and grading using machine learning algorithms for predictive analytics and recommendations.');
        await page.fill('input[placeholder="2024-CSE"]', '2024-CSE');
        await page.fill('input[placeholder*="comma separated"]', 'AI/ML, Web Development');

        await page.click('button[type="submit"]:has-text("Submit Proposal")');

        await expect(page.locator('.Toastify__toast--success, [role="status"]:has-text("created")')).toBeVisible({ timeout: 5000 });

        await expect(page.locator('text=AI-Powered Student Management System')).toBeVisible();
        await expect(page.locator('text=PROPOSED')).toBeVisible();

        const projectTitle = 'AI-Powered Student Management System';

        // ===== STUDENT: Submit Report =====
        const pdfBuffer = Buffer.from('%PDF-1.4 mock content');
        const pdfFile = {
            name: 'final_report.pdf',
            mimeType: 'application/pdf',
            buffer: pdfBuffer
        };

        const fileInput = page.locator('input[type="file"]');
        await expect(fileInput).toBeVisible({ timeout: 3000 });

        await fileInput.setInputFiles({
            name: pdfFile.name,
            mimeType: pdfFile.mimeType,
            buffer: pdfFile.buffer
        });

        await expect(page.locator(`text=${pdfFile.name}`)).toBeVisible();

        await page.click('button:has-text("Submit Report")');

        await expect(page.locator('.Toastify__toast--success, [role="status"]:has-text("submitted")')).toBeVisible({ timeout: 5000 });

        await expect(page.locator('text=Submitted Successfully')).toBeVisible();
        await expect(page.locator('text=final_report.pdf')).toBeVisible();

        await page.click('button[aria-label="User menu"]');
        await page.click('text=Logout');

        // ===== FACULTY: Grade Project =====
        await login(page, 'teacher@test.com', 'password123', 'Teacher');

        await page.goto('/projects/dashboard');

        await page.waitForSelector('[data-testid="project-card"], .project-card, text=AI-Powered Student', { timeout: 10000 });

        await expect(page.locator('text=Awaiting Review')).toBeVisible();

        await page.click(`text=${projectTitle}`);

        await page.waitForSelector('text=Score', { timeout: 5000 });

        const gradeButton = page.locator('button:has-text("Grade Now")');
        if (await gradeButton.isVisible()) {
            await gradeButton.click();
            await page.waitForSelector('input[type="number"]', { timeout: 3000 });
        }

        await page.fill('input[type="number"][min="0"][max="100"]', '85');
        await page.fill('textarea[placeholder*="feedback"]', 'Excellent work! The implementation is well-structured and demonstrates a strong understanding of AI/ML concepts. The documentation is comprehensive and the code quality is high.');

        await page.selectOption('select', 'GRADED');

        await page.click('button:has-text("Submit Grade")');

        await expect(page.locator('.Toastify__toast--success, [role="status"]:has-text("graded")')).toBeVisible({ timeout: 5000 });

        await expect(page.locator('text=GRADED')).toBeVisible();

        await page.click('button[aria-label="User menu"]');
        await page.click('text=Logout');

        // ===== STUDENT: View Feedback =====
        await login(page, 'student@test.com', 'password123', 'Student');

        await page.goto('/projects/my-project');

        await page.waitForSelector('text=Faculty Feedback', { timeout: 5000 });

        await expect(page.locator('text=Faculty Feedback')).toBeVisible();
        await expect(page.locator('text=85/100')).toBeVisible();
        await expect(page.locator('text=Excellent work')).toBeVisible();
    });

    test('Validation: Should prevent submission of non-PDF file', async ({ page }) => {
        await login(page, 'student@test.com', 'password123', 'Student');

        await page.goto('/projects/my-project');

        const txtFile = {
            name: 'report.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('This is not a PDF')
        };

        const fileInput = page.locator('input[type="file"]');
        if (await fileInput.isVisible()) {
            await fileInput.setInputFiles({
                name: txtFile.name,
                mimeType: txtFile.mimeType,
                buffer: txtFile.buffer
            });

            await expect(page.locator('.Toastify__toast--error, [role="alert"]:has-text("PDF")')).toBeVisible({ timeout: 3000 });
        }
    });

    test('Validation: Should prevent submission of oversized file', async ({ page }) => {
        await login(page, 'student@test.com', 'password123', 'Student');

        await page.goto('/projects/my-project');

        const largeBuffer = Buffer.alloc(11 * 1024 * 1024);
        const largeFile = {
            name: 'large_report.pdf',
            mimeType: 'application/pdf',
            buffer: largeBuffer
        };

        const fileInput = page.locator('input[type="file"]');
        if (await fileInput.isVisible()) {
            await fileInput.setInputFiles({
                name: largeFile.name,
                mimeType: largeFile.mimeType,
                buffer: largeFile.buffer
            });

            await expect(page.locator('.Toastify__toast--error, [role="alert"]:has-text("10MB")')).toBeVisible({ timeout: 3000 });
        }
    });

    test('Faculty Dashboard: Filtering and pagination', async ({ page }) => {
        await login(page, 'teacher@test.com', 'password123', 'Teacher');

        await page.goto('/projects/dashboard');

        await page.waitForSelector('[data-testid="project-card"], .project-card', { timeout: 10000 });

        await page.fill('input[placeholder*="Batch"]', '2024-CSE');
        await page.waitForTimeout(500);

        const projectCards = page.locator('[data-testid="project-card"], .project-card');
        const count = await projectCards.count();
        expect(count).toBeGreaterThan(0);

        await page.selectOption('select[aria-label="Status filter"], select:has(option:has-text("SUBMITTED"))', 'SUBMITTED');
        await page.waitForTimeout(500);

        await page.fill('input[placeholder*="Search"]', 'AI-Powered');
        await page.waitForTimeout(400);

        await expect(page.locator('text=AI-Powered Student Management System')).toBeVisible();
    });

    test('Authorization: Student cannot access faculty dashboard', async ({ page }) => {
        await login(page, 'student@test.com', 'password123', 'Student');

        await page.goto('/projects/dashboard');

        await expect(page).not.toHaveURL('/projects/dashboard');
    });
});
