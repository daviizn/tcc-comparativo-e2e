Cypress.Commands.add('acessarLogin', () => {
    cy.visit('/');
    cy.get('[data-test="username"]').should('be.visible');
});

Cypress.Commands.add('preencherLogin', (usuario, senha) => {
    if (usuario) cy.get('[data-test="username"]').type(usuario);
    if (senha) cy.get('[data-test="password"]').type(senha);
    cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('autenticar', () => {
    cy.fixture('usuarios').then(({ padrao }) => {
        cy.acessarLogin();
        cy.preencherLogin(padrao.usuario, padrao.senha);
    });
});

Cypress.Commands.add('abrirDetalhes', (nome) => {
    cy.contains('[data-test="inventory-item-name"]', nome).click();
    cy.url().should('include', '/inventory-item.html');
});

Cypress.Commands.add('itensDoCarrinho', (campo) => {
    return cy.get(`[data-test="cart-list"] [data-test="inventory-item-${campo}"]`);
});