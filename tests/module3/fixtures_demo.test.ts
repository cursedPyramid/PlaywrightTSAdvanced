// import { test } from '@playwright/test'; // superseded by the base file
// import { expect } from '@playwright/test'; // source 2; not needed because export is exported from base
// Import the Playwright test runner and its auto-retrying assertion API.
import { expect, test } from '../module2/pages/fixtures/base.js'; // source 1; single source of truth' the base file

// Define a Playwright test. The async callback receives Playwright fixtures such as `page`.
// Demonstrate several built-in Playwright fixtures: `page`, `browser` and `request`.
test('Built-in fixtures', async ({ page, browser, request }) => {

    page.goto('');

    const ctx = browser.newContext({
        locale: "es-ES",
        timezoneId: "....",
        javaScriptEnabled: false,
    });

    const response = await request.post('');

});

test('Custom Fixture Page', async ({ stockPage }) => {

    console.log("Inside the test");

    await stockPage.goto();

    await stockPage.ticker("MSFT").click();

    // Capture the displayed market price so the test can use the application's current value rather than hard-coding it.
    const marketPrice = Number(await stockPage.currentPrice().textContent());

    await stockPage.limitPriceInput().fill(marketPrice.toString());
    await stockPage.quantityInput().fill("100");
    await stockPage.buyButton().click();

    // Playwright assertions automatically retry until they pass or the assertion timeout is reached.
    await expect(stockPage.actionError()).toBeVisible();
    await expect(stockPage.actionError()).toHaveText("Insufficient cash");

});

// Demonstrate that a custom fixture setup can override or wrap Playwright's built-in `page` fixture.
test("Override existing page fixture", async ({ stockPage }) => {

    await stockPage.goto();

});
