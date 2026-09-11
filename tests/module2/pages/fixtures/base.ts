// Import the base Playwright test object so it can be extended with custom fixtures.
import { test as base, expect } from '@playwright/test';
import { StockTradingPage } from '../StockTradingPage.js';
import { AnalyticsPage } from '../AnalyticsPage.js';

// Describe the custom fixtures that tests can request by destructuring them from the test callback.
export type PageFixtures = {
    stockPage: StockTradingPage,
    analyticsPage: AnalyticsPage
}

// Define configuration-style fixture options that can be overridden from Playwright configuration.
export type ConfigOptions = {
    // Define a custom boolean fixture option controlling whether captured page errors should fail the test.
    failOnJSError: boolean;
    failOnNetworkError: boolean;
}

// Create a custom Playwright test object by extending the built-in fixtures.
export const test = base.extend<PageFixtures & ConfigOptions>({

    // Provide a ready-to-use StockTradingPage Page Object to tests that request `stockPage`.
    stockPage: async ({ page }, use) => {
        const stockPage = new StockTradingPage(page);

        // place for global hooks (?)
        console.log("Do stuff before");
        // Hand the prepared fixture value to the test; code after `use` runs as teardown.
        await use(stockPage);
        console.log("Do stuff after");
    },

    analyticsPage: async ({ page }, use) => {
        const analyticsPage = new AnalyticsPage(page);

        await use(analyticsPage);
    },

    // Define a custom boolean fixture option controlling whether captured page errors should fail the test.
    failOnJSError: [true, {}],
    failOnNetworkError: [true, { 
        option : true, // override via config
        timeout: 5000, // for slow hooks
        title: "as seen in reports and elsewhere",
        box: "self",
    }],

    // Override the built-in `page` fixture so additional monitoring can be attached while keeping the normal Playwright page.
    page: async ({ page, failOnJSError, failOnNetworkError }, use) => {

        // Collect browser-level JavaScript errors so they can be checked after the test has finished.
        const errors: Array<Error> = [];
        // Listen for uncaught JavaScript errors raised by the page.
        page.on('pageerror', error => {
            errors.push(error);
        });

        if(failOnNetworkError) {
            // Monitor HTTP responses globally for the page and perform a soft assertion on their status codes.
            page.on('response', response => {
            // Record an assertion failure without immediately stopping the test, allowing the run to collect more information.
            expect.soft(response.status(),
        `Response with status ${response.status()} for URL: ${response.url()}`).toBeLessThan(400);
            });
        }

        // Run the actual test with the instrumented page fixture.
        await use(page);

        if(failOnJSError) {
            expect(errors).toHaveLength(0);
        }

    }

});

export { expect } from '@playwright/test';