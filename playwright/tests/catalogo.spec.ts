import { expect, test } from '../fixtures/paginas'
 
const FLEECE_JACKET = 'Sauce Labs Fleece Jacket';
 
test.describe('Catalogo de produtos', () => {
    test('CT11 - Deve exibir os detalhes do produto', async ({ page, autenticado, productPage }) => {
        await test.step('Quando clica sobre o nome do produto Sauce Labs Fleece Jacket', async () => {
            await autenticado.abrirDetalhes(FLEECE_JACKET);
        });
 
        await test.step('Entao a tela de detalhes do produto e exibida', async () => {
            await expect(page).toHaveURL(/\/inventory-item\.html/);
        });
 
        await test.step('E o nome, a descricao e o preco em formato monetario sao apresentados', async () => {
            await expect(productPage.nome).toHaveText(FLEECE_JACKET);
            await expect(productPage.descricao).toBeVisible();
            await expect(productPage.descricao).not.toBeEmpty();
            await expect(productPage.preco).toHaveText(/^\$\d+\.\d{2}$/);
        });
 
        await test.step('E o botao "Add to cart" esta habilitado', async () => {
            await expect(productPage.botaoDeAdicao).toBeVisible();
            await expect(productPage.botaoDeAdicao).toBeEnabled();
            await expect(productPage.botaoDeAdicao).toHaveText('Add to cart');
        });
    });
});