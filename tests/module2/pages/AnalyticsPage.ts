// Import Playwright types only; these are used by TypeScript for type checking and are not runtime values.
import type { Locator, Page } from "@playwright/test";
import { NavigationSection } from "./NavigationSection.js";

export class AnalyticsPage {

    readonly page: Page;
    readonly nav: NavigationSection;

    constructor(page:Page) {
        this.page = page;
        this.nav = new NavigationSection(page);
    }

    async goto() {
        await this.page.goto('analytics.html');
    }

    navigation(): NavigationSection {
        return this.nav;
    }

    analyticsMessage(): Locator {
        return this.page.getByTestId('analytics-message');
    }

    cashBalance(): Locator {
        return this.page.getByTestId('cash');
    }
    
}