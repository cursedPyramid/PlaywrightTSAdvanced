// Import the Playwright test runner and its auto-retrying assertion API.
import { expect, test } from '@playwright/test';

// not a real test - just a collection of fundamental Playwright capabilities
// This is deliberately skipped: it is a reference list of Playwright capabilities rather than an executable test.
test.skip('Prerequisite knowledge for the advanced course', async ({ page, browser, request }) => {

  // Create a browser context with customised settings; contexts isolate browser state between tests.
  const ctx = browser.newContext({
    javaScriptEnabled: false,
    locale: 'Es-es',
    acceptDownloads: true
    // etc.
  });


  // Navigate to the page. Playwright waits for the navigation to reach the appropriate load state before continuing.
  await page.goto('url');

  // locators
  const input = page.getByLabel('User name');
  const btn = page.getByRole('button', { name: 'Sign in', exact: true });
  const msg = page.getByTestId('some_id');

  // actions
  await input.fill('...');
  await btn.click();

  // + upload / download files
  // handle dialogs (popups)

  // Use Playwright's APIRequest fixture to make an HTTP request without driving the browser UI.
  await request.get('url');

  // assertions
  // Playwright assertions automatically retry until they pass or the assertion timeout is reached.
  await expect(msg).toBeVisible();
  await expect(msg).toBeInViewport();
});




