import { test as base, expect } from '@playwright/test'
import { CartPage } from '../pages/cart.page'
import { CheckoutPage } from '../pages/checkout.page'
import { InventoryPage } from '../pages/inventory.page'
import { LoginPage } from '../pages/login.page'

export const USUARIOS = {
    padrao: { usuario: 'standard_user', senha: 'secret_sauce' },
    bloqueado: { usuario: 'locked_out_user', senha: 'secret_sauce' },
    invalido: { usuario: 'usuario_invalido', senha: 'senha_errada' },
};

type Paginas = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    autenticado: InventoryPage;
};

export const test = base.extend<Paginas>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    
    autenticado: async ({ loginPage, inventoryPage }, use) => {
        await loginPage.logarComo(USUARIOS.padrao.usuario, USUARIOS.padrao.senha);
        await expect(inventoryPage.lista).toBeVisible();
        await use(inventoryPage);
    },    
})