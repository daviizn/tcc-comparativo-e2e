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