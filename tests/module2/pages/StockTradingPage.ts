// Import Playwright types only; these are used by TypeScript for type checking and are not runtime values.
import type { Locator, Page } from '@playwright/test';
import { NavigationSection } from './NavigationSection.js';

// Encapsulate locators and UI behaviour for the trading page so tests can describe intent rather than implementation details.
export class StockTradingPage {
    // Keep a reference to the Playwright Page while preventing the property from being reassigned.
    readonly page: Page;
    // Compose the page object with a reusable navigation section.
    readonly nav: NavigationSection;

    // Receive the existing Playwright page fixture and use it throughout this Page Object.
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavigationSection(page);
    }

    async goto() {
        await this.page.goto('index.html');
    }

    // Return the reusable navigation section so tests can move between application areas.
    navigation(): NavigationSection {
        return this.nav;
    }

    /* ========= Left column ========= */
    // Return a locator for a stock ticker; the method accepts the ticker as data rather than hard-coding one stock.
    ticker(ticker: string): Locator {
        return this.page
            .getByTestId('stock-list')
            .getByRole('listitem')
            // Narrow the locator to the item containing the required text.
            .filter({ hasText: ticker })
    }

    /* ========= Right column ========= */


    // Form for placing buy/sell orders
    currentPrice(): Locator {
        return this.page.getByTestId('stock-price');
    }

    limitPriceInput(): Locator {
        return this.page.getByLabel('Limit Price');
    }

    quantityInput(): Locator {
        return this.page.getByLabel('Quantity');
    }

    valueInput(): Locator {
        return this.page.getByLabel('Value');
    }

    buyButton(): Locator {
        return this.page.getByRole('button', { name: 'Buy', exact: true });
    }

    sellButton(): Locator {
        return this.page.getByRole('button', { name: 'Sell', exact: true });
    }

    // form error messages
    priceError(): Locator {
        return this.page.getByTestId('price-error');
    }

    qtyError(): Locator {
        return this.page.getByTestId('qty-error');
    }

    actionError(): Locator {
        return this.page.getByTestId('action-error');
    }


    /* ========= Portfolio ========= */

    cashBalance(): Locator {
        return this.page.getByTestId('cash');
    }

    portfolio(): Locator {
        return this.page.getByTestId('portfolio-table');
    }

    // Build a child locator from the portfolio table to target only its body rows.
    portfolioRows(): Locator {
        return this.portfolio().locator('tbody tr');
    }
}