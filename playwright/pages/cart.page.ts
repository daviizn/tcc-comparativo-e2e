import { Locator, Page } from '@playwright/test'

export class CartPage {
    readonly page: Page;
    readonly lista: Locator;
    readonly itens: Locator;
    readonly botaoCheckout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lista = page.locator('[data-test="cart-list"]');
        this.itens = this.lista.locator('[data-test="inventory-item"]');
        this.botaoCheckout = page.locator('[data-test="checkout"]');
    }

    async irParaCheckout(): Promise<void> {
        await this.botaoCheckout.click();
    }
}