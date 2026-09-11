import { Locator, Page } from '@playwright/test'
 
export class ProductPage {
    readonly page: Page;
    readonly nome: Locator;
    readonly descricao: Locator;
    readonly preco: Locator;
    readonly botaoDeAdicao: Locator;
    readonly botaoVoltar: Locator;
 
    constructor(page: Page) {
        this.page = page;
        this.nome = page.locator('[data-test="inventory-item-name"]');
        this.descricao = page.locator('[data-test="inventory-item-desc"]');
        this.preco = page.locator('[data-test="inventory-item-price"]');
        this.botaoDeAdicao = page.locator('[data-test="add-to-cart"]');
        this.botaoVoltar = page.locator('[data-test="back-to-products"]');
    }
 
    async voltarParaListagem(): Promise<void> {
        await this.botaoVoltar.click()
        await this.page.locator('[data-test="inventory-list"]').waitFor();
    }
}