import { defineConfig, devices } from '@playwright/test';
import type { ConfigOptions } from './tests/module2/pages/fixtures/base.js';
import dotenv from "dotenv";
// import dotenvx from "@dotenvx/dotenvx"

// Load values from `.env` into `process.env` before the Playwright configuration is evaluated.
dotenv.config();  // reads .env and loads into process.env

// Export the Playwright configuration used by the test runner.
export default defineConfig<ConfigOptions>({
  
  // Tell Playwright where the test files live.
  testDir: './tests',
  reporter: 'html',
  // Allow independent tests to run in parallel where possible.
  fullyParallel: true,
  // Use a single worker in CI, otherwise use half of the available workers.
  workers: process.env.CI ? 1 : '50%',
    
  use: {
    // Set the common base URL so tests can navigate with relative paths such as `index.html`.
    baseURL: 'http://localhost:3000/',
    // Limit how long individual Playwright actions may wait.
    actionTimeout: 5000 
    ,
    // Run browsers visibly during local learning/debugging; this is deliberately not headless here.
    headless: false,
    // Slow browser actions down to make local execution easier to observe.
    launchOptions: { slowMo: 1000 },
  },

  // Start the local demo application automatically when the test run begins.
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000/',
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
        // Enable the custom fixture option that can fail a test run when the page raises JavaScript errors.
        failOnJSError: true, // Toggling feature flags should be done inside config files and not code
      },
      
    }
    // Global setup and cleanup per project
  ],
});
