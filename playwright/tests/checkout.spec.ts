import { expect, test } from '../fixtures/paginas'

const BIKE_LIGHT = 'sauce-labs-bike-light';
const BACKPACK = 'sauce-labs-backpack';
const TELA_DE_INFORMACOES = 'Checkout: Your Information';

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

    test('CT14 - Deve cancelar o checkout preservando o carrinho', async ({
        page,
        autenticado,
        cartPage,
        checkoutPage,
    }) => {
        await test.step('Dado que o produto Sauce Labs Bike Light foi adicionado ao carrinho', async () => {
            await autenticado.adicionarAoCarrinho(BIKE_LIGHT);
            await expect(autenticado.contadorDoCarrinho).toHaveText('1');
        });
 
        await test.step('Quando acessa o carrinho e segue para o checkout', async () => {
            await autenticado.abrirCarrinho();
            await cartPage.irParaCheckout();
            await expect(checkoutPage.titulo).toHaveText(TELA_DE_INFORMACOES);
        });
 
        await test.step('E clica em Cancel na tela de informacoes pessoais', async () => {
            await checkoutPage.cancelar();
        });
 
        await test.step('Entao volta para o carrinho, com o produto ainda presente', async () => {
            await expect(page).toHaveURL(/\/cart\.html/);
            await expect(cartPage.titulo).toHaveText('Your Cart');
            await expect(cartPage.nomeDosItens).toHaveText(['Sauce Labs Bike Light']);
            await expect(autenticado.contadorDoCarrinho).toHaveText('1');
        });
    });
 
    test('CT15 - Deve bloquear o checkout com os campos obrigatorios em branco', async ({
        page,
        autenticado,
        cartPage,
        checkoutPage,
    }) => {
        await test.step('Dado que o produto Sauce Labs Backpack foi adicionado ao carrinho', async () => {
            await autenticado.adicionarAoCarrinho(BACKPACK);
            await autenticado.abrirCarrinho();
            await cartPage.irParaCheckout();
        });
 
        await test.step('Quando mantem os tres campos em branco e clica em Continue', async () => {
            await expect(checkoutPage.campoPrimeiroNome).toHaveValue('');
            await expect(checkoutPage.campoSobrenome).toHaveValue('');
            await expect(checkoutPage.campoCep).toHaveValue('');
            await checkoutPage.continuar();
        });
 
        await test.step('Entao permanece na tela de informacoes com "First Name is required"', async () => {
            await expect(page).toHaveURL(/\/checkout-step-one\.html/);
            await expect(checkoutPage.titulo).toHaveText(TELA_DE_INFORMACOES);
            await expect(checkoutPage.mensagemDeErro).toHaveText('Error: First Name is required');
        });
    });
 
    test('CT18 - Deve validar cada campo obrigatorio individualmente', async ({
        page,
        autenticado,
        cartPage,
        checkoutPage,
    }) => {
        await test.step('Dado que o produto Sauce Labs Backpack foi adicionado ao carrinho', async () => {
            await autenticado.adicionarAoCarrinho(BACKPACK);
            await autenticado.abrirCarrinho();
            await cartPage.irParaCheckout();
        });
 
        await test.step('Quando preenche apenas o First Name e clica em Continue', async () => {
            await checkoutPage.campoPrimeiroNome.fill('João');
            await checkoutPage.continuar();
        });
 
        await test.step('Entao o erro exibido e "Last Name is required"', async () => {
            await expect(checkoutPage.mensagemDeErro).toHaveText('Error: Last Name is required');
            await expect(checkoutPage.titulo).toHaveText(TELA_DE_INFORMACOES);
        });
 
        await test.step('Mas ao preencher o Last Name e continuar, o erro passa a ser "Postal Code is required"', async () => {
            await checkoutPage.campoSobrenome.fill('Silva');
            await checkoutPage.continuar();
            await expect(checkoutPage.mensagemDeErro).toHaveText('Error: Postal Code is required');
        });
 
        await test.step('E em nenhuma tentativa o sistema avanca para "Checkout: Overview"', async () => {
            await expect(page).toHaveURL(/\/checkout-step-one\.html/);
            await expect(checkoutPage.titulo).toHaveText(TELA_DE_INFORMACOES);
        });
    });
});