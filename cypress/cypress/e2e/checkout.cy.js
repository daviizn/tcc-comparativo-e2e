const BIKE_LIGHT = 'sauce-labs-bike-light';

describe('Checkout', () => {
  beforeEach(() => {
    cy.autenticar();
  });

  it('CT06 - Deve finalizar a compra com sucesso', () => {
    cy.get(`[data-test="add-to-cart-${BIKE_LIGHT}"]`).click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');

    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('João');
    cy.get('[data-test="lastName"]').type('Silva');
    cy.get('[data-test="postalCode"]').type('70000-000');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });
});
