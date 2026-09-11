import type { Page } from '@playwright/test';
import { StockTradingPage } from './StockTradingPage.js';
import { AnalyticsPage } from './AnalyticsPage.js';

export class Pages {

    // Cache the Stock Trading Page Object after it is first requested.
    private stockPg?: StockTradingPage;
    // Cache the Analytics Page Object after it is first requested.
    private analyticsPg?: AnalyticsPage;

    // Store the Playwright page using a TypeScript parameter property, which creates and assigns the class field automatically.
    constructor(private page: Page) {}

    // Expose the Stock Trading Page Object through a getter and create it only when first needed.
    get stockPage() {
        return (this.stockPg ??= new StockTradingPage(this.page));
    }

    // Expose the Analytics Page Object through a getter and create it only when first needed.
    get analyticsPage() {
        return (this.analyticsPg ??= new AnalyticsPage(this.page));
    }
}