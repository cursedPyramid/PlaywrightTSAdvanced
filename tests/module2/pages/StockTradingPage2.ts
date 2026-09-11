// Import Playwright types only; these are used by TypeScript for type checking and are not runtime values.
import type { Locator, Page } from '@playwright/test';
import type { Order } from './types/Order.js';

// A second Page Object design used to demonstrate moving more interaction into the Page Object itself.
export class StockTradingPage2 {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('index.html');
    }

    /* ========= Left column ========= */
    // Combine locating and clicking into one reusable Page Object action.
    async selectTicker(ticker: string) {
        await this.page
            .getByTestId('stock-list')
            .getByRole('listitem')
            // Narrow the locator to the item containing the required text.
            .filter({ hasText: ticker })
            .click();
    }

    /* ========= Right column ========= */


    // Form for placing buy/sell orders
    currentPrice(): Locator {
        return this.page.getByTestId('stock-price');
    }

    // Encapsulate filling the limit price field so tests do not need to know its locator.
    async enterPrice(price: string) {
        this.page.getByLabel('Limit Price').fill(price);
    }

    // Encapsulate filling the quantity field.
    async enterQuantity(qty: string) {
        this.page.getByLabel('Quantity').fill(qty);
    }

    // Encapsulate the Buy button interaction.
    async clickBuy() {
        await this.page.getByRole('button', { name: 'Buy', exact: true }).click();
    }

    // Encapsulate the Sell button interaction.
    async clickSell() {
        await this.page.getByRole('button', { name: 'Sell', exact: true }).click();
    }

    // Accept a strongly typed Order object and translate its data into the required UI actions.
    async placeOrder(order: Order) {
        await this.page.getByLabel('Limit Price').fill(order.price.toString());
        await this.page.getByLabel('Quantity').fill(order.quantity.toString());

        // Use the typed `side` value to choose the correct trading action.
        if (order.side === 'buy') {
            await this.page.getByRole('button', { name: 'Buy', exact: true }).click();
        } else {
            await this.page.getByRole('button', { name: 'Sell', exact: true }).click();
        }
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
}