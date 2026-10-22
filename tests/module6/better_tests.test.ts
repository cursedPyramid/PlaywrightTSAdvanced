import { test } from '@playwright/test';

// These notes illustrate a test-design approach where titles describe purpose and a consistent set of scenarios guides coverage.
/**
 * Title -> purpose
 * Better context for humans and AI
 * Many contributors -> inconsistent style
 *
 * Template!
 * 
 * Suggestion: {most important aspect} - {expected outcome}
 *
 * Examples:
 * Buy one stock - cash and portfolio updated
 * Buy two stocks - cash and portfolio updated
 *
 * Sell one stock - cash and portfolio updated
 * Sell all stocks - cash updated, portfolio empty
 *
 * Sell stock not owned - rejected, cash and portfolio unchanged
 * Sell stock owned, but qty > owned qty - rejected, cash and portfolio unchanged
 *
 * Offline:
 * Buy stock when offline - rejected, cash and portfolio unchanged
 *
 */

// Group related tests together inside a test.describe for at least two reasons. The group title allows extra context for humans and AI that applies to all tests in that group.
// And second, the Playwright plugin can run the entire group.
test.describe("Group description", () => {

    // Define a Playwright test. The async callback receives Playwright fixtures such as `page`.
    // The test title states the business behaviour under test rather than an implementation detail.
    test("Buy one stock", async () => {});

    test("Buy two stocks", async () => {});

    test("Sell one stock", async () => {});

    test("Sell all stocks", async () => {});
    
});
