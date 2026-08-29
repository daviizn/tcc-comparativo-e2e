import { Locator, Page } from '@playwright/test'

export class InventoryPage {
    readonly page: Page;
    readonly lista: Locator;
    readonly nomeDosProtudos: Locator;
    readonly contadorDoCarrinho: Locator;
    readonly linkDoCarrinho: Locator;
    readonly seletorDeOrdenacao: Locator;
    readonly menuHamburguer: Locator;
    readonly linkDeLogout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lista = page.locator('[data-test="inventory-list"]')
        this.nomeDosProtudos = page.locator('[data-test="inventory-item-name"]')
        this.contadorDoCarrinho = page.locator('[data-test="shopping-cart-badge"]')
        this.linkDoCarrinho = page.locator('[data-test="shopping-cart-link"]')
        this.seletorDeOrdenacao = page.locator('[data-test="product-sort-container"]')
        this.menuHamburguer = page.locator('#react-burger-menu-btn')
        this.linkDeLogout = page.locator('[data-test="logout-sidebar-link"]')
    }

    botaoDeAdicao(produto: string): Locator {
        return this.page.locator(`[data-test="add-to-cart-${produto}"]`)
    }

    botaoDeRemocao(produto: string): Locator {
        return this.page.locator(`[data-test="remove-${produto}"]`)
    }

    async acessarDiretamente(): Promise<void> {
        await this.page.goto('/inventory.html');
    }

    async adicionarAoCarrinho(produto: string): Promise<void> {
        await this.botaoDeAdicao(produto).click();
    }

    async removerDoCarrinho(produto: string): Promise<void> {
        await this.botaoDeRemocao(produto).click();
    }

    async abrirCarrinho(): Promise<void> {
        await this.linkDoCarrinho.click();
    }

    async ordenarPor(rotulo: string): Promise<void> {
        await this.seletorDeOrdenacao.selectOption({ label: rotulo });
    }

    async listarNomes(): Promise<string[]> {
        return this.nomeDosProtudos.allInnerTexts();
    }

    async sair(): Promise<void> {
        await this.menuHamburguer.click();
        await this.linkDeLogout.click();
    }
}