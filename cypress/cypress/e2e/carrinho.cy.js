const BACKPACK = 'sauce-labs-backpack';
const BIKE_LIGHT = 'sauce-labs-bike-light';
const BOLT_TSHIRT = 'sauce-labs-bolt-t-shirt';
const FLEECE_JACKET = 'Sauce Labs Fleece Jacket';

const NOME = {
    [BACKPACK]: 'Sauce Labs Backpack',
    [BIKE_LIGHT]: 'Sauce Labs Bike Light',
    [BOLT_TSHIRT]: 'Sauce Labs Bolt T-Shirt',
};

const PRECO = {
    [BACKPACK]: '$29.99',
    [BIKE_LIGHT]: '$9.99',
    [BOLT_TSHIRT]: '$15.99',
};

describe('Carrinho de compras', () => {
    beforeEach(() => {
        cy.autenticar();
    });

    it('CT03 - Deve adicionar produto ao carrinho', () => {
        cy.get(`[data-test="add-to-cart-${BACKPACK}"]`).click();

        cy.get(`[data-test="remove-${BACKPACK}"]`).should('have.text', 'Remove');
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
    });

    it('CT04 - Deve remover produto do carrinho', () => {
        cy.get(`[data-test="add-to-cart-${BACKPACK}"]`).click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');

        cy.get(`[data-test="remove-${BACKPACK}"]`).click();

        cy.get(`[data-test="add-to-cart-${BACKPACK}"]`).should('have.text', 'Add to cart');
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="cart-list"]').should('be.visible');
        cy.get('[data-test="cart-list"]').find('[data-test="inventory-item"]').should('have.length', 0);
    });

it('CT12 - Deve acumular multiplos produtos no carrinho', () => {
        const adicionados = [BACKPACK, BIKE_LIGHT, BOLT_TSHIRT];
 
        adicionados.forEach((produto) => cy.get(`[data-test="add-to-cart-${produto}"]`).click());
 
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '3');
 
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.itensDoCarrinho('name').should('have.length', 3).then(($nomes) => {
            expect([...$nomes].map((e) => e.innerText)).to.deep.equal(adicionados.map((p) => NOME[p]));
        });
        cy.itensDoCarrinho('price').then(($precos) => {
            expect([...$precos].map((e) => e.innerText)).to.deep.equal(adicionados.map((p) => PRECO[p]));
        });
    });
 
    it('CT13 - Deve preservar o carrinho apos navegar pelos detalhes do produto', () => {
        cy.get(`[data-test="add-to-cart-${BACKPACK}"]`).click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
 
        cy.abrirDetalhes(FLEECE_JACKET);
        cy.get('[data-test="back-to-products"]').click();
 
        cy.url().should('include', '/inventory.html');
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
 
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.itensDoCarrinho('name').should('have.text', NOME[BACKPACK]);
    });
 
    it('CT17 - Deve remover um produto pela tela do carrinho', () => {
        cy.get(`[data-test="add-to-cart-${BACKPACK}"]`).click();
        cy.get(`[data-test="add-to-cart-${BIKE_LIGHT}"]`).click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2');
        cy.get('[data-test="shopping-cart-link"]').click();
 
        cy.get(`[data-test="remove-${BACKPACK}"]`).click();
 
        cy.get('[data-test="cart-list"]').should('not.contain', NOME[BACKPACK]);
        cy.itensDoCarrinho('name').should('have.length', 1).and('have.text', NOME[BIKE_LIGHT]);
        cy.itensDoCarrinho('price').should('have.text', PRECO[BIKE_LIGHT]);
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
 
        cy.get('[data-test="continue-shopping"]').click();
        cy.get(`[data-test="add-to-cart-${BACKPACK}"]`).should('have.text', 'Add to cart');
        cy.get(`[data-test="remove-${BIKE_LIGHT}"]`).should('have.text', 'Remove');
    });
});