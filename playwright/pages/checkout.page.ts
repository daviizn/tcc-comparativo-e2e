import { Locator, Page } from '@playwright/test'

export class CheckoutPage {
    readonly page: Page;
    readonly campoPrimeiroNome: Locator;
    readonly campoSobrenome: Locator;
    readonly campoCep: Locator;
    readonly botaoContinuar: Locator;
    readonly botaoFinalizar: Locator;
    readonly mensagemDeConfirmacao: Locator;

    constructor(page: Page) {
        this.page = page;
        this.campoPrimeiroNome = page.locator('[data-test="firstName"]');
        this.campoSobrenome = page.locator('[data-test="lastName"]');
        this.campoCep = page.locator('[data-test="postalCode"]');
        this.botaoContinuar = page.locator('[data-test="continue"]');
        this.botaoFinalizar = page.locator('[data-test="finish"]');
        this.mensagemDeConfirmacao = page.locator('[data-test="complete-header"]');
    }

    async preencherDados(primeiroNome: string, sobrenome: string, cep: string): Promise<void> {
        await this.campoPrimeiroNome.fill(primeiroNome);
        await this.campoSobrenome.fill(sobrenome);
        await this.campoCep.fill(cep);
    }

    async continuar(): Promise<void> {
        await this.botaoContinuar.click();
    }

    async finalizar(): Promise<void> {
        await this.botaoFinalizar.click();
    }
}