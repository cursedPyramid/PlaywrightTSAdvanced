// import { expect, test } from "../module2/pages/fixtures/base.js";
import { strictTest, test } from "../module2/pages/fixtures/base2.js";

// Group related tests together; hooks, configuration and tags can also be scoped at this level.
test.describe('two tests', () => {

    // Define a Playwright test. The async callback receives Playwright fixtures such as `page`.
    test('Test that focuses on core functionality', async ({ stockPage }) => {

        await stockPage.goto();
    });

    // Use the stricter custom test object, which adds page-level monitoring for JavaScript and network errors.
    strictTest('Capture console errors and network', async ({ stockPage }) => {

        await stockPage.goto();

    });
});