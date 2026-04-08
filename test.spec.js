import { test, expect } from '@playwright/test';

test('calendar loads without errors', async ({ page }) => {
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('http://localhost:5173');
  
  // Wait for the page to fully load
  await page.waitForLoadState('networkidle');
  
  // Check that the calendar header is visible
  const monthYear = await page.locator('h2').first().textContent();
  expect(monthYear).toBeTruthy();
  
  // Check that day labels are visible
  const dayLabels = await page.locator('text=S').first().isVisible();
  expect(dayLabels).toBeTruthy();
  
  // Check that no console errors occurred
  const realErrors = errors.filter(e => !e.includes('Warning') && !e.includes('404'));
  expect(realErrors).toHaveLength(0);
});
