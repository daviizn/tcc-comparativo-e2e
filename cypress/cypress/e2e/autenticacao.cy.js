describe("Autenticação", () => {
  beforeEach(function () {
    cy.fixture("usuarios").as("usuarios");
  });

  it('CT01 - Deve realizar login com credenciais validas', function () {
    cy.acessarLogin();
    cy.get('[data-test="username"]').should('be.enabled');

    cy.preencherLogin(this.usuarios.padrao.usuario, this.usuarios.padrao.senha);

    cy.get('[data-test="inventory-list"]').should('be.visible');
    cy.url().should('include', '/inventory.html');
    cy.title().should('eq', 'Swag Labs');
  });

  it('CT02 - Deve rejeitar login com credenciais invalidas', function () {
    cy.acessarLogin();

    cy.preencherLogin(this.usuarios.invalido.usuario, this.usuarios.invalido.senha);

    cy.get('[data-test="login-button"]').should('be.visible');
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    cy.get('[data-test="username"]').should('have.class', "error");
    cy.get('[data-test="password"]').should('have.class', "error");
  });

  it('CT07 - Deve rejeitar login com senha em branco', function () {
    cy.acessarLogin();

    cy.preencherLogin(this.usuarios.padrao.usuario, null);

    cy.get('[data-test="login-button"]').should('be.visible');
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Password is required');
  });

  it('CT08 - Deve rejeitar login com usuário em branco', function () {
    cy.acessarLogin();

    cy.preencherLogin(null, this.usuarios.padrao.senha);

    cy.get('[data-test="login-button"]').should('be.visible');
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required');
  });

  it('CT09 - Deve rejeitar login com usuario bloqueado', function () {
    cy.acessarLogin();

    cy.preencherLogin(this.usuarios.bloqueado.usuario, this.usuarios.bloqueado.senha);

    cy.get('[data-test="login-button"]').should('be.visible');
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('CT10 - Deve encerrar a sessão e bloquear o acesso direto', () => {
    cy.autenticar();

    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').should('be.visible').click();

    cy.get('[data-test="login-button"]').should('be.visible');

    cy.visit('/inventory.html', { failOnStatusCode: false });
    cy.get('[data-test="login-button"]').should('be.visible');
    cy.url().should('not.include', '/inventory.html');
  });
});
