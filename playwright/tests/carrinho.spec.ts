import { expect, test } from '../fixtures/paginas'

const BACKPACK = 'sauce-labs-backpack';
const BIKE_LIGHT = 'sauce-labs-bike-light';
const BOLT_T_SHIRT = 'sauce-labs-bolt-t-shirt';
const FLEECE_JACKET = 'Sauce Labs Fleece Jacket';

const NOME: Record<string, string> = {
    [BACKPACK]: 'Sauce Labs Backpack',
    [BIKE_LIGHT]: 'Sauce Labs Bike Light',
    [BOLT_T_SHIRT]: 'Sauce Labs Bolt T-Shirt',
};

const PRECO: Record<string, string> = {
    [BACKPACK]: '$29.99',
    [BIKE_LIGHT]: '$9.99',
    [BOLT_T_SHIRT]: '$15.99',
};

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

    test('CT12 - Deve acumular multiplos produtos no carrinho', async ({ autenticado, cartPage }) => {
        const adicionados = [BACKPACK, BIKE_LIGHT, BOLT_T_SHIRT];
 
        await test.step('Quando adiciona Backpack, Bike Light e Bolt T-Shirt ao carrinho', async () => {
            for (const produto of adicionados) {
                await autenticado.adicionarAoCarrinho(produto);
            }
        });
 
        await test.step('Entao o contador do carrinho exibe "3"', async () => {
            await expect(autenticado.contadorDoCarrinho).toHaveText('3');
        });
 
        await test.step('E os tres produtos sao listados com seus nomes e precos', async () => {
            await autenticado.abrirCarrinho();
            await expect(cartPage.itens).toHaveCount(3);
            await expect(cartPage.nomeDosItens).toHaveText(adicionados.map((p) => NOME[p]));
            await expect(cartPage.precoDosItens).toHaveText(adicionados.map((p) => PRECO[p]));
        });
    });
 
    test('CT13 - Deve preservar o carrinho apos navegar pelos detalhes', async ({
        page,
        autenticado,
        productPage,
        cartPage,
    }) => {
        await test.step('Dado que o produto Sauce Labs Backpack foi adicionado ao carrinho', async () => {
            await autenticado.adicionarAoCarrinho(BACKPACK);
            await expect(autenticado.contadorDoCarrinho).toHaveText('1');
        });
 
        await test.step('Quando abre os detalhes de outro produto e volta para a listagem', async () => {
            await autenticado.abrirDetalhes(FLEECE_JACKET);
            await expect(page).toHaveURL(/\/inventory-item\.html/);
            await productPage.voltarParaListagem();
            await expect(page).toHaveURL(/\/inventory\.html/);
        });
 
        await test.step('Entao o contador ainda exibe "1" e o produto continua no carrinho', async () => {
            await expect(autenticado.contadorDoCarrinho).toHaveText('1');
            await autenticado.abrirCarrinho();
            await expect(cartPage.nomeDosItens).toHaveText([NOME[BACKPACK]]);
        });
    });
 
    test('CT17 - Deve remover um produto pela tela do carrinho', async ({ autenticado, cartPage }) => {
        await test.step('Dado que Backpack e Bike Light foram adicionados ao carrinho', async () => {
            await autenticado.adicionarAoCarrinho(BACKPACK);
            await autenticado.adicionarAoCarrinho(BIKE_LIGHT);
            await expect(autenticado.contadorDoCarrinho).toHaveText('2');
        });
 
        await test.step('Quando acessa o carrinho e clica em "Remove" do Backpack', async () => {
            await autenticado.abrirCarrinho();
            await cartPage.remover(BACKPACK);
        });
 
        await test.step('Entao so o Bike Light permanece listado, com seu preco', async () => {
            await expect(cartPage.itens).toHaveCount(1);
            await expect(cartPage.nomeDosItens).toHaveText([NOME[BIKE_LIGHT]]);
            await expect(cartPage.precoDosItens).toHaveText([PRECO[BIKE_LIGHT]]);
            await expect(autenticado.contadorDoCarrinho).toHaveText('1');
        });
 
        await test.step('E na listagem o Backpack volta a "Add to cart" e o Bike Light segue em "Remove"', async () => {
            await cartPage.continuarComprando();
            await expect(autenticado.botaoDeAdicao(BACKPACK)).toHaveText('Add to cart');
            await expect(autenticado.botaoDeRemocao(BIKE_LIGHT)).toHaveText('Remove');
        });
    });
})