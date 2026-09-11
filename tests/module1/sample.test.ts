// Import the Playwright test runner and its auto-retrying assertion API.
import { test, expect } from '@playwright/test';

// Group related tests together; hooks, configuration and tags can also be scoped at this level.
test.describe('Sample tests', () => {

    // Define a Playwright test. The async callback receives Playwright fixtures such as `page`.
    test('Buy 1 stock - cash balance gets updated correctly', async ({ page }) => {

        // Navigate to the page. Playwright waits for the navigation to reach the appropriate load state before continuing.
        await page.goto('index.html');

        // select ticker
        await page
            .getByTestId('stock-list')
            .getByRole('listitem')
            // Narrow the locator to the item containing the required text.
            .filter({ hasText: 'MSFT' })
            .click()

        // Capture the displayed market price so the test can use the application’s current value rather than hard-coding it.
        const marketPrice = Number(await page.getByTestId('stock-price').textContent());

        // fill price and qty
        await page.getByLabel('Limit Price').fill(marketPrice.toString());
        await page.getByLabel('Quantity').fill('2');

        // click buy
        await page.getByRole('button', { name: 'Buy', exact: true }).click();

        // get cash balance, check it
        const cashBalance = Number(await page.getByTestId('cash').textContent());
        expect(cashBalance).toBeCloseTo(10_000 - 2 * marketPrice, 2);

    });


    test('Input invalid quantity - error message is shown', async ({ page }) => {

        await page.goto('index.html');


        await page
            .getByTestId('stock-list')
            .getByRole('listitem')
            .filter({ hasText: 'MSFT' })
            .click();
        
        
        await page.getByLabel('Quantity').fill('5.1');
        await page.getByRole('button', { name: 'Buy', exact: true }).click();
        // Playwright assertions automatically retry until they pass or the assertion timeout is reached.
        await expect(page.getByTestId('qty-error')).toBeVisible();
    });
});

