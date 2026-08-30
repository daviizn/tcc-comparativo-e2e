import { expect, test } from '../fixtures/paginas'

const BACKPACK = 'sauce-labs-backpack';

test.describe('Carrinho de compras', () => {
    test('CT03 - Deve adicionar produto ao carrinho', async ({ autenticado }) => {
        await test.step('Quando clica em "Add to cart" do produto Sauce Labs Backpack', async () => {
            await autenticado.adicionarAoCarrinho(BACKPACK);
        });

        await test.step('Entao o botao vira "Remove" e o contador exibe "1"', async () => {
            await expect(autenticado.botaoDeRemocao(BACKPACK)).toHaveText('Remove');
            await expect(autenticado.contadorDoCarrinho).toHaveText('1');
        });
    });

    test('CT04 - Deve remover produto do carrinho', async ({ autenticado, cartPage }) => {
        await test.step('Dado que o produto Sauce Labs Backpack foi adicionado ao carrinho', async () => {
            await autenticado.adicionarAoCarrinho(BACKPACK);
            await expect(autenticado.contadorDoCarrinho).toHaveText('1');
        });

        await test.step('Quando clica em "Remove" do produto Sauce Labs Backpack', async () => {
            await autenticado.removerDoCarrinho(BACKPACK);
        });

        await test.step('Entao o botao volta a "Add to cart" e o contador some do DOM', async () => {
            await expect(autenticado.botaoDeAdicao(BACKPACK)).toHaveText('Add to cart');
            await expect(autenticado.contadorDoCarrinho).toHaveCount(0);
        });

        await test.step('E o carrinho esta vazio ao ser acessado', async () => {
            await autenticado.abrirCarrinho();
            await expect(cartPage.lista).toBeVisible();
            await expect(cartPage.itens).toHaveCount(0);
        });
    });
})