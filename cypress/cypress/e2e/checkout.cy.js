const BIKE_LIGHT = 'sauce-labs-bike-light';
const BACKPACK = 'sauce-labs-backpack';
const TELA_DE_INFORMACOES = 'Checkout: Your Information';

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
  
  it('CT14 - Deve cancelar o checkout preservando o carrinho', () => {
    cy.get(`[data-test="add-to-cart-${BIKE_LIGHT}"]`).click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="title"]').should('have.text', TELA_DE_INFORMACOES);
 
    cy.get('[data-test="cancel"]').click();
 
    cy.url().should('include', '/cart.html');
    cy.get('[data-test="title"]').should('have.text', 'Your Cart');
    cy.itensDoCarrinho('name').should('have.text', 'Sauce Labs Bike Light');
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
  });
 
  it('CT15 - Deve bloquear o checkout com os campos obrigatorios em branco', () => {
    cy.get(`[data-test="add-to-cart-${BACKPACK}"]`).click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
 
    cy.get('[data-test="firstName"]').should('have.value', '');
    cy.get('[data-test="lastName"]').should('have.value', '');
    cy.get('[data-test="postalCode"]').should('have.value', '');
    cy.get('[data-test="continue"]').click();
 
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('[data-test="title"]').should('have.text', TELA_DE_INFORMACOES);
    cy.get('[data-test="error"]').should('have.text', 'Error: First Name is required');
  });
 
  it('CT18 - Deve validar cada campo obrigatorio do checkout individualmente', () => {
    cy.get(`[data-test="add-to-cart-${BACKPACK}"]`).click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
 
    cy.get('[data-test="firstName"]').type('João');
    cy.get('[data-test="continue"]').click();
 
    cy.get('[data-test="error"]').should('have.text', 'Error: Last Name is required');
    cy.get('[data-test="title"]').should('have.text', TELA_DE_INFORMACOES);
 
    cy.get('[data-test="lastName"]').type('Silva');
    cy.get('[data-test="continue"]').click();
 
    cy.get('[data-test="error"]').should('have.text', 'Error: Postal Code is required');
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('[data-test="title"]').should('have.text', TELA_DE_INFORMACOES);
  });
});
