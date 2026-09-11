const BACKPACK = 'sauce-labs-backpack';

const ROTAS_PROTEGIDAS = ['/cart.html', '/checkout-step-one.html', '/checkout-complete.html'];


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

  it('CT19 - Deve bloquear o acesso direto as rotas internas sem sessao', () => {
    ROTAS_PROTEGIDAS.forEach((rota) => {
      cy.visit(rota, { failOnStatusCode: false });
 
      cy.get('[data-test="login-button"]').should('be.visible');
      cy.get('[data-test="error"]').should(
        'have.text',
        `Epic sadface: You can only access '${rota}' when you are logged in.`,
      );
      cy.url().should('not.include', rota);
      cy.get('[data-test="inventory-item"]').should('not.exist');
      cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });
  });
 
  it('CT20 - Deve isolar o carrinho entre contas apos a troca de usuario', function () {
    cy.autenticar();
    cy.get(`[data-test="add-to-cart-${BACKPACK}"]`).click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
 
    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').should('be.visible').click();
    cy.get('[data-test="login-button"]').should('be.visible');
    cy.preencherLogin(this.usuarios.problema.usuario, this.usuarios.problema.senha);
 
    cy.get('[data-test="inventory-list"]').should('be.visible');
    cy.url().should('include', '/inventory.html');
 
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    cy.get(`[data-test="add-to-cart-${BACKPACK}"]`).should('have.text', 'Add to cart');
 
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="cart-list"]').find('[data-test="inventory-item"]').should('have.length', 0);
  });
});
