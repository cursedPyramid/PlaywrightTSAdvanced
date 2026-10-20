// Import the base Playwright test object so it can be extended with custom fixtures.
import { expect, test as base } from '@playwright/test';
import { StockTradingPage } from '../StockTradingPage.js';
import { AnalyticsPage } from '../AnalyticsPage.js';

// Create a custom fixtures type and inside enumerate all the page classes. There are two, so they are defined here. And the types are declared explicitly.
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

// Extend base with fixtures that is saved back to test and exported.
export const test = base.extend<PageFixtures & ConfigOptions>({

    // For every custom page class, we must write; custom page name (stockPage) that takes the native page, initializes the custom page, and then the most important part, use the page.
    stockPage: async ({ page }, use) => {
        const stockPage = new StockTradingPage(page);

        // When Playwright tests are run, at some point, the runtime reaches await use, and this is where the control flow switches to the test and the test itself runs.
        // This means that the space before and after can be used to do something such as a place for global hooks, such as set up and tear down before every custom test that uses custom pages.
        console.log("Do stuff before");
        // The most important part, use the page.
        await use(stockPage);
        console.log("Do stuff after");
    },

    // Repeat the process for other pages
    analyticsPage: async ({ page }, use) => {
        const analyticsPage = new AnalyticsPage(page);

        await use(analyticsPage);
    },

    // Define a custom boolean fixture option controlling whether captured page errors should fail the test.
    failOnJSError: [true, {}], //  Fail the test if we catch any JavaScript errors in the console. Set to false to make inactive.
    failOnNetworkError: [true, { 
        option : true, // Override via playwright.config.ts
        timeout: 5000, //  If a fixture is very slow and the build is not to hang indefinitely, set the limit in milliseconds.
        title: "as seen in reports and elsewhere", //  Gives a fixture a custom title to be printed in test reports and elsewhere.
        box: "self", // Can be set to boolean or string self.
    }],

    // Override the native `page` fixture so additional monitoring can be attached while keeping the normal Playwright page.
    // Note that the native page fixture will run before the custom fixtures.
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

        // The only mandatory line is this one. Run the actual test with the page fixture.
        await use(page);

        if(failOnJSError) {
            expect(errors).toHaveLength(0);
        }

    }

});

// expect function is exported from this file as well because from now on, it must be referenced in all tests, so both pages and assertions can be used.
export { expect } from '@playwright/test';