import { Locator, Page } from '@playwright/test'
 
export class CartPage {
    readonly page: Page;
    readonly titulo: Locator;
    readonly lista: Locator;
    readonly itens: Locator;
    readonly nomeDosItens: Locator;
    readonly precoDosItens: Locator;
    readonly botaoCheckout: Locator;
    readonly botaoContinuarComprando: Locator;
 
    constructor(page: Page) {
        this.page = page;
        this.titulo = page.locator('[data-test="title"]');
        this.lista = page.locator('[data-test="cart-list"]');
        this.itens = this.lista.locator('[data-test="inventory-item"]');
        this.nomeDosItens = this.lista.locator('[data-test="inventory-item-name"]');
        this.precoDosItens = this.lista.locator('[data-test="inventory-item-price"]');
        this.botaoCheckout = page.locator('[data-test="checkout"]');
        this.botaoContinuarComprando = page.locator('[data-test="continue-shopping"]');
    }
 
    botaoDeRemocao(produto: string): Locator {
        return this.lista.locator(`[data-test="remove-${produto}"]`);
    }
 
    async irParaCheckout(): Promise<void> {
        await this.botaoCheckout.click();
    }
 
    async remover(produto: string): Promise<void> {
        await this.botaoDeRemocao(produto).click();
    }
 
    async continuarComprando(): Promise<void> {
        await this.botaoContinuarComprando.click();
    }
}