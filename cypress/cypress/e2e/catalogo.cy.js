const FLEECE_JACKET = 'Sauce Labs Fleece Jacket';

describe('Catálogo de produtos', () => {
    beforeEach(() => {
        cy.autenticar();
    });
 
    it('CT11 - Deve exibir os detalhes do produto', () => {
        cy.abrirDetalhes(FLEECE_JACKET);
 
        cy.get('[data-test="inventory-item-name"]').should('have.text', FLEECE_JACKET);
        cy.get('[data-test="inventory-item-desc"]').should('be.visible').and('not.have.text', '');
        cy.get('[data-test="inventory-item-price"]').invoke('text').should('match', /^\$\d+\.\d{2}$/);
        cy.get('[data-test="add-to-cart"]').should('be.visible').and('be.enabled').and('have.text', 'Add to cart');
    });
});