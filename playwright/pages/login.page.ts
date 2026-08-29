import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly campoUsuario: Locator;
    readonly campoSenha: Locator;
    readonly botaoLogin: Locator;
    readonly mensagemDeErro: Locator;

    constructor(page: Page) {
        this.page = page;
        this.campoUsuario = page.locator('[data-test="username"]');
        this.campoSenha = page.locator('[data-test="password"]');
        this.botaoLogin = page.locator('[data-test="login-button"]');
        this.mensagemDeErro = page.locator('[data-test="error"]');
    }

    async acessar(): Promise<void> {
        await this.page.goto('/');
    }

    async preencherLogin(usuario: string | null, senha: string | null): Promise<void> {
        if (usuario) await this.campoUsuario.fill(usuario);
        if (senha) await this.campoSenha.fill(senha);
        await this.botaoLogin.click();
    }

    async logarComo(usuario: string, senha: string): Promise<void> {
        await this.acessar();
        await this.preencherLogin(usuario, senha);
    }
}