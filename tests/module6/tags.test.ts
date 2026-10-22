import { test } from '@playwright/test';

/**
 * Project structure
 * ====================================
 *
 * test-data/               - data factories, reusable objects, CSV and JSON files
 *
 * pages/                   - for the Page Object Model, page classes and locators
 *      sections/
 *      fixtures/
 *      types/ or domain_objects/   - order, cart, item, patient record
 *
 * tests/                   - test files, grouped by business domain or flow
 *      trading/
 *      analytics/
 *      reporting/
 *      settings/
 *      deposit-withdrawal/
 *      login/
 *
 * utils/ or helpers/       - rounding, formatting, date & time, constants
 *
 * .gitignore
 * package.json             - dependencies
 * playwright.config.js     - test run
 * tsconfig.js              - code rules
 */

// Group related tests together; hooks, configuration and tags can also be scoped at this level.
// Tags can be applied at group level so every test in the group inherits the tag.
// When using tags, add commands to your scripts in package.json to run tests with specific tags, e.g. "smoke": "npx playwright test --grep @smoke" will be executed with `npm run smoke`.
test.describe("Group description", { tag: "@group-tag" }, () => {

	// `test(title, body)`
	// `test(title, details, body)`

	// Define a Playwright test. The async callback receives Playwright fixtures such as `page`.
	test("Test 1", {
		// Attach a smoke tag to this individual test so it can be selected with `--grep`.
		tag: "@smoke", // npx playwright test --grep "@smoke" will run all tests with the tag; @smoke
	}, async () => {});

	test("Test 2", {
		// A test can carry multiple tags when it belongs to more than one category.
		tag: ["@smoke", "@login"],
	}, async () => {});

	test("Test 3", {
		// Annotations add structured metadata to a test, which can be surfaced in reports and used to explain context.
		annotation: {
			type: "",
			description: "",
		},
	}, async () => {});

});
