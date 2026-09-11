// Import the Playwright test runner and its auto-retrying assertion API.
import { test, expect } from '@playwright/test';
import { StockTradingPage } from './pages/StockTradingPage.js';
import { StockTradingPage2 } from './pages/StockTradingPage2.js';
import { AnalyticsPage } from './pages/AnalyticsPage.js';
import type { Order } from './pages/types/Order.js';
import { Pages } from './pages/Pages.js';

// Define a Playwright test. The async callback receives Playwright fixtures such as `page`.
test('Pages factory demo', async ({ page }) => {

    const ui = new Pages(page);

    // Use the page factory to obtain the relevant Page Object.
    await ui.stockPage.ticker('AMZN').click();

    const msg = await ui.analyticsPage.cashBalance().textContent();
    
});

test('POM Level 1 Demo - Attempt to buy more than the available cash balance', async ({ page }) => {

    const stockTradingPage = new StockTradingPage(page);

    // Use the Page Object rather than locating the UI directly in the test; this keeps test intent separate from locator details.
    await stockTradingPage.goto();

    // Select MSFT
    await stockTradingPage.ticker('MSFT').click();

    // Get market price
    // Capture the displayed market price so the test can use the application’s current value rather than hard-coding it.
    const marketPrice = Number(await stockTradingPage.currentPrice().textContent());

    // Attempt to buy 1000 shares (more than available cash)
    await stockTradingPage.limitPriceInput().fill(marketPrice.toString());
    await stockTradingPage.quantityInput().fill('1000');
    await stockTradingPage.buyButton().click();

    // Verify that the appropriate error message is displayed
    // Playwright assertions automatically retry until they pass or the assertion timeout is reached.
    await expect(stockTradingPage.actionError()).toBeVisible();
    await expect(stockTradingPage.actionError()).toHaveText('Insufficient cash');

});

test('POM Level 2 Demo - same scenario - StrockTradingPage2', async ({ page }) => {

    const stockTradingPage = new StockTradingPage2(page);

    await stockTradingPage.goto();

    // Select MSFT
    await stockTradingPage.selectTicker('MSFT');

    // Get market price
    const marketPrice = Number(await stockTradingPage.currentPrice().textContent());

    // Attempt to buy 1000 shares (more than available cash)
    await stockTradingPage.enterPrice(marketPrice.toString());
    await stockTradingPage.enterQuantity('1000');
    await stockTradingPage.clickBuy();

    // Verify that the appropriate error message is displayed
    await expect(stockTradingPage.actionError()).toBeVisible();
    await expect(stockTradingPage.actionError()).toHaveText('Insufficient cash');

});

test('Using navigation - StockTradingPage', async ({ page }) => {

    const stockTradingPage = new StockTradingPage(page);

    await stockTradingPage.goto();

    // Select MSFT
    await stockTradingPage.ticker('MSFT').click();
    const marketPrice = Number(await stockTradingPage.currentPrice().textContent());
    await stockTradingPage.limitPriceInput().fill(marketPrice.toString());
    await stockTradingPage.quantityInput().fill('1');
    await stockTradingPage.buyButton().click();

    await stockTradingPage.navigation().analyticsLink().click();

    const analyticsPage = new AnalyticsPage(page);

    const expectedCash = (10_000 - marketPrice).toFixed(2);
    await expect(analyticsPage.cashBalance()).toHaveText(expectedCash);

    await analyticsPage.navigation().tradeLink().click();

});

test('With custom Order type', async ({ page }) => {

    const stockTradingPage = new StockTradingPage2(page);

    await stockTradingPage.goto();

    await stockTradingPage.selectTicker('AMZN');
    // Get market price
    const marketPrice = Number(await stockTradingPage.currentPrice().textContent());

    // Create strongly typed test data using the custom `Order` interface.
    const order: Order = {
        ticker: 'AMZN',
        price: marketPrice,
        quantity: 10,
        side: 'buy'
    };

    await stockTradingPage.placeOrder(order);

});