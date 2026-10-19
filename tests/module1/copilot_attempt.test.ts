import { test, expect } from '@playwright/test';
import { StockTradingPage } from '../module2/pages/StockTradingPage.js';

/**
* Produce dozens of tests in minutes... is this progress?
* Duplication across dozens or hundreds of tests?
* One locator breaks? Token cost?
*/

test('Buy and sell 1 stock - cash and portfolio are restored', async ({ page }) => {
	await page.goto('index.html');

	// Select MSFT
    await page
		.getByTestId('stock-list')
		.getByRole('listitem')
		.filter({ hasText: 'MSFT' })
		.click();

	// Get market price
    const marketPrice = Number(await page.getByTestId('stock-price').textContent());
	
    // Buy 1 share
    await page.getByLabel('Limit Price').fill(marketPrice.toString());
	await page.getByLabel('Quantity').fill('1');

	await page.getByRole('button', { name: 'Buy', exact: true }).click();

	// Verify cash balance after buy
    const cashAfterBuy = Number(await page.getByTestId('cash').textContent());
	expect(cashAfterBuy).toBeCloseTo(10_000 - marketPrice, 2);

	// Sell one share
    await page.getByRole('button', { name: 'Sell', exact: true }).click();

	// Verify cash is back to 10000
    const cashAfterSell = Number(await page.getByTestId('cash').textContent());
	expect(cashAfterSell).toBe(10_000);
	
    // Verify portfolio is empty
    await expect(page.getByTestId('portfolio-table').locator('tbody tr')).toHaveCount(0);
});

/**
 * Test 'Buy and sell 1 stock - cash and portfolio are restored' was generated using the Copilot Agent AI in VS Code using the prompt below. It completed 10 steps in 33 seconds and the script passed:
 * 
 * Implement a test in Playwright Typescript inside the currently open file.
 * 
 * Steps:
 * 1) Buy 1 stock, verify new cash balance
 * 2) Sell that 1 stock
 * 3) Verify that the cash balance is back to 10000, and the portfolio is empty.
 * 4) When finished - run the test to make sure is passes, and if not, fix it immediately.
 * 
 * Use "sample.test.ts" as an example.
 * To see the page, either go to URL http://localhost:3000/index.html
 * Or see app/index.html file in the project
*/


/**
 * 3 things to make AI output useful
 * 
 * 1) A high quality LLM
 * 2) A well structured prompt (more instructions and constraints must be defined for a wide range of scenarios)
 * 3) A high-quality code base (serves as a point of reference for AI)
 */

test('Same scenario, but with POM', async ({ page }) => {
	const stockTradingPage = new StockTradingPage(page);

	await stockTradingPage.goto();
	// Select MSFT and get market price
	await stockTradingPage.ticker('MSFT').click();

	const marketPrice = Number(await stockTradingPage.currentPrice().textContent());
	// Buy 1 share
	await stockTradingPage.limitPriceInput().fill(marketPrice.toString());
	await stockTradingPage.quantityInput().fill('1');

	await stockTradingPage.buyButton().click();

	// Verify cash after buy
	const cashAfterBuy = Number(await stockTradingPage.cashBalance().textContent());
	expect(cashAfterBuy).toBeCloseTo(10_000 - marketPrice, 2);

	// Sell the 1 share
	await stockTradingPage.sellButton().click();

	// Verify cash is back to 10000 and portfolio is empty
	const cashAfterSell = Number(await stockTradingPage.cashBalance().textContent());
	expect(cashAfterSell).toBe(10_000);
	await expect(stockTradingPage.portfolio().locator('tbody tr')).toHaveCount(0);

});

/**
 * Test Same scenario, but with POM was generated using the Copilot Agent AI in VS Code using the prompt below. It completed 8 steps in 19 seconds and the script passed.
 * The only manual input was to add the .js extension to import { StockTradingPage } from '../module2/pages/StockTradingPage.'; that it created:
 * 
 * Now automate the same scenario again inside the same file, inside the test with the title 'Same scenario, but with POM'.
 * 
 * Be sure to use the Page Object Model pattern and the relevant Page Class - StockTradingPage.
 * 
 * If some locator-finding methods don't exist for some verb elements, create them in the Page class first. When finished - run the test to make sure it passes, and if not - fix immediately.
*/