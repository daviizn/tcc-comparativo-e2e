const BACKPACK = 'sauce-labs-backpack';

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
});