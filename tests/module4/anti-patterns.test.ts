// Import the Playwright test runner and its auto-retrying assertion API.
import { expect, test } from '@playwright/test';

// Define a Playwright test. The async callback receives Playwright fixtures such as `page`.
test('...', async ({ page }) => {

    // missed await
    await test.step('Do things', async () => {

        const locator = page.getByTestId('some-id'); // Await is useless at this point; Playwright doesn't dig into the web page, and it doesn't try to find it.

        // Forgetten awaits. All actions such as click, select, and such, they all return a promise that must be awaited.
        // Biome not catching non-awaited actions here
        await page.goto('');
        await page.getByTestId('some-id').click();

        // Further actions
        // Forgotten await as well. Assertions must be awaited as well
        await expect(page.getByRole('button')).toBeVisible();

    });

});

test('Poor waiting example', async ({ page }) => {

    // adding "waits"
    // most are redundant, wrong, or give false confidence

    // wait for the page to finish fetching resources
    // for exotic use cases, NOT test automation
    await page.goto('...', { waitUntil: 'networkidle' });

    // click...
    // legitimate use case: redirects: page1 -> page2 -> page 3...
    // shows intent
    await page.waitForURL('...');

    const locator = page.getByRole('button', { name: 'Submit' });
    // redundant most of the time
    await locator.waitFor({ state: 'visible' });

    // the worst anti-pattern!
    // Intentional anti-pattern: fixed sleeps make tests slower and can still be unreliable because the application may need more or less time.
    page.waitForTimeout(1000);

});

test('toPass for hydration, toPoll for backend retries', async ({ page }) => {

    // This for loop is unnecessary due to Playwright's await expect().toPass();
    for (let attempt = 1; attempt <=3; attempt++) {
        try {
            await page.getByRole('button', { name: 'Buy' }).click();
            break;
        } catch {
            if (attempt===3) throw new Error('Failed after 3 retries');
        }
    };

    const retry = {
        slow: { intervals: [1_000, 2_000, 10_000], timeout: 60_000 },
        fast: { intervals: [500, 1_000], timeout: 10_000 },
    };

    // A block with configuration, that is now reusable constant and passed in
    const toPassConfig = {
        intervals: [1_000, 2_000, 10_000],
        timeout: 60_000
    };

    // exception, not the norm; poor hydration should be fixed wherever possible, not covered up by retry mechanisms in tests
    // expect is normally used with one value, typically a locator, but it can also accept a callback function, which is the flaky block that we want to retry
    await expect(async () => {
        // problematic action + expect
        await page.getByTestId('id1').click();
        await expect(page.getByTestId('id2')).toBeVisible();

    // Retry the whole callback when an action/assertion sequence is expected to become valid eventually; this is an exception rather than the normal synchronisation mechanism.
    }).toPass(toPassConfig);

    // Repeatedly call the supplied function and assert on its returned value; useful for polling external state such as an API or database.
    await expect.poll(async () => {
        // retry and return one value, typically from API/DB
        const response = await page.request.get("https://api.example.com");
        return response.status();
    }, {}).toBe(200);
    
});