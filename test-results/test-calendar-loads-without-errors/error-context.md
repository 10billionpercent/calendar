# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test.spec.js >> calendar loads without errors
- Location: test.spec.js:3:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('calendar loads without errors', async ({ page }) => {
  4  |   const errors = [];
  5  |   page.on('console', msg => {
  6  |     if (msg.type() === 'error') {
  7  |       errors.push(msg.text());
  8  |     }
  9  |   });
  10 | 
> 11 |   await page.goto('http://localhost:5173');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
  12 |   
  13 |   // Wait for the page to fully load
  14 |   await page.waitForLoadState('networkidle');
  15 |   
  16 |   // Check that the calendar header is visible
  17 |   const monthYear = await page.locator('h2').first().textContent();
  18 |   expect(monthYear).toBeTruthy();
  19 |   
  20 |   // Check that day labels are visible
  21 |   const dayLabels = await page.locator('text=S').first().isVisible();
  22 |   expect(dayLabels).toBeTruthy();
  23 |   
  24 |   // Check that no console errors occurred
  25 |   const realErrors = errors.filter(e => !e.includes('Warning') && !e.includes('404'));
  26 |   expect(realErrors).toHaveLength(0);
  27 | });
  28 | 
```