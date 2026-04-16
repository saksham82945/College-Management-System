import { test, expect } from '@playwright/test';

test('delete student functionality', async ({ page }) => {
  // Login
  await page.goto('http://localhost:5173');
  await page.fill('input[type="email"]', 'admin@college.com');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button:has-text("Sign In")');
  
  // Wait for dashboard
  await page.waitForURL('http://localhost:5173/dashboard');
  
  // Go to students page
  await page.click('text=Student Registry', { timeout: 5000 }).catch(() => page.goto('http://localhost:5173/students'));
  await page.waitForURL('http://localhost:5173/students');
  
  // Check student count before
  await page.waitForSelector('text=Delete');
  const deleteButtonsBefore = await page.$$('text=Delete');
  console.log(`Students before deletion: ${deleteButtonsBefore.length}`);
  
  if (deleteButtonsBefore.length > 0) {
      // Mock window.confirm
      page.on('dialog', dialog => dialog.accept());
      
      // Click delete on the first student
      await deleteButtonsBefore[0].click();
      
      // Wait for toast
      await page.waitForSelector('text=Student deleted successfully', { timeout: 3000 });
      
      // Wait a bit for React to re-render
      await page.waitForTimeout(2000);
      
      // Check student count after
      const deleteButtonsAfter = await page.$$('text=Delete');
      console.log(`Students after deletion: ${deleteButtonsAfter.length}`);
      
      if (deleteButtonsAfter.length === deleteButtonsBefore.length) {
          console.error('ERROR: Real-time update failed. The row count did not decrease.');
      } else {
          console.log('SUCCESS: Real-time update works. The row was removed.');
      }
  } else {
      console.log("No students found to delete.");
  }
});
