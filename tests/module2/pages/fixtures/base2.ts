// Import the base Playwright test object so it can be extended with custom fixtures.
import { test as base, expect } from '@playwright/test';
import { StockTradingPage } from '../StockTradingPage.js';
import { AnalyticsPage } from '../AnalyticsPage.js';

export type PageFixtures = {
    stockPage: StockTradingPage,
    analyticsPage: AnalyticsPage
}

// async({stockPage}) =>
// Create a smaller custom test object containing only the application Page Object fixtures.
export const test = base.extend<PageFixtures>({

    stockPage: async ({ page }, use) => {
        const stockPage = new StockTradingPage(page);
        await use(stockPage);
    },

    analyticsPage: async ({ page }, use) => {
        const analyticsPage = new AnalyticsPage(page);
        await use(analyticsPage);
    }

});

// no failJSError or other extra fixtures

// Extend the already extended test and immediately save it to an exportable variable.
export const strictTest = test.extend({

    page: async({ page }, use) => {

        // Monitor the console

        // Listen for uncaught JavaScript errors produced by the page.
        page.on('pageerror', (error) => {
            console.log(`Found an error: ${error.name}, ${error.message}`);
            expect.soft(error.name).not.toEqual('Error');
        });

        // Monitor network responses

        // Monitor network responses and soft-fail the test when an unexpected status is returned.
        page.on('response', (response) => {
            expect.soft(response.status(),
                `Response with status ${response.status()} for URL: ${response.url()}`,
            ).toBeLessThan(300);
        });

        // Provide the monitored page to the test body.
        await use(page);
    }

});

export { expect } from '@playwright/test';