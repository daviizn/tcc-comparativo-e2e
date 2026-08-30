import { expect, test } from '../fixtures/paginas'

const BIKE_LIGHT = 'sauce-labs-bike-light';

test.describe('Checkout', () => {
    test('CT06 - Deve finalizar a compra com sucesso', async ({ 
        autenticado, 
        cartPage, 
        checkoutPage 
    }) => {
        await test.step('Dado que o produto Sauce Labs Bike Light foi adicionado ao carrinho', async () => {
            await autenticado.adicionarAoCarrinho(BIKE_LIGHT);
            await expect(autenticado.contadorDoCarrinho).toHaveText('1');
        });
        
        await test.step('Quando acessa o carrinho e segue para o checkout', async () => {
            await autenticado.abrirCarrinho();
            await cartPage.irParaCheckout();
        });

        await test.step('E preenche Fist Name, Last Name e Zip/Postal Code', async () => {
            await checkoutPage.preencherDados('João', 'Silva', '70000-000');
        });

        await test.step('E clica em Continue e depois em Finish', async () => {
            await checkoutPage.continuar();
            await checkoutPage.finalizar();
        });

        await test.step('Entao e exibida a confirmacao e o carrinho e reinicializado', async () => {
            await expect(checkoutPage.mensagemDeConfirmacao).toHaveText('Thank you for your order!');
            await expect(autenticado.contadorDoCarrinho).toHaveCount(0);
        });
    });
});