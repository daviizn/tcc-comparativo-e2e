import { expect, test, USUARIOS } from '../fixtures/paginas';

test.describe('Autenticacao', () => {
    test('CT01 - Deve realizar login com credenciais validas', async ({
        page,
        loginPage,
        inventoryPage,
    }) => {
        await test.step('Dado que o usuario acessa a URL eo o campo Username esta habilitado', async () => {
            await loginPage.acessar();
            await expect(loginPage.campoUsuario).toBeVisible();
            await expect(loginPage.campoUsuario).toBeEnabled();
        });
        
        await test.step('Quando preenche usuario e senha validos e clica em Login', async () => {
            await loginPage.preencherLogin(USUARIOS.padrao.usuario, USUARIOS.padrao.senha);
        });
        
        await test.step('Entao e redirecionado para a listagem, com a URL e o titulo esperados', async () => {
            await expect(inventoryPage.lista).toBeVisible();
            await expect(page).toHaveURL(/\/inventory\.html/);
            await expect(page).toHaveTitle('Swag Labs');
        });
    });

    test('CT02 - Deve rejeitar login com credenciais invalidas', async ({ loginPage }) => {
        await test.step('Dado que o usuario acessa a URL', async () => {
            await loginPage.acessar();
        });

        await test.step('Quando preenche credenciais invalidas e clica em Login', async () => {
            await loginPage.preencherLogin(USUARIOS.invalido.usuario, USUARIOS.invalido.senha);
        });

        await test.step('Entao permanece na tela de login, com a mensagem de erro', async () => {
            await expect(loginPage.botaoLogin).toBeVisible();
            await expect(loginPage.mensagemDeErro).toHaveText('Epic sadface: Username and password do not match any user in this service');
        });

        await test.step('E os campos de usuario e senha sao destacados com erro', async () => {
            await expect(loginPage.campoUsuario).toHaveClass(/error/);
            await expect(loginPage.campoSenha).toHaveClass(/error/);
        });
    });

    test('CT07 - Deve rejeitar login com a senha em branco', async ({ loginPage }) => {
        await test.step('Dado que o usuario acessa a URL', async () => {
            await loginPage.acessar();
        });

        await test.step('Quando preenche o usuario, mantem a senha em branco e clica em Login', async () => {
            await loginPage.preencherLogin(USUARIOS.padrao.usuario, null);
        });

        await test.step('Entao permance na tela de login com "Password is required"', async () => {
            await expect(loginPage.botaoLogin).toBeVisible();
            await expect(loginPage.mensagemDeErro).toHaveText('Epic sadface: Password is required');
        });
    });

    test('CT08 - Deve rejeitar login com usuario em branco', async ({ loginPage }) => {
        await test.step('Dado que o usuario acessa a URL', async () => {
            await loginPage.acessar();
        });

        await test.step('Quando mantem o usuario me branco, preenche a senha e clica em Login', async () => {
            await loginPage.preencherLogin(null, USUARIOS.padrao.senha);
        });

        await test.step('Entao permanece na tela de login com "Username is required"', async () => {
            await expect(loginPage.botaoLogin).toBeVisible();
            await expect(loginPage.mensagemDeErro).toHaveText('Epic sadface: Username is required');
        });
    });

    test('CT09 - Deve rejeitar login com usuario bloqueado', async ({ loginPage }) => {
        await test.step('Dado que o usuario acessa a URL', async () => {
            await loginPage.acessar();
        });

        await test.step('Quando preenche as credenciais do usuario bloqueado e clica em Login', async () => {
            await loginPage.preencherLogin(USUARIOS.bloqueado.usuario, USUARIOS.bloqueado.senha);
        });

        await test.step('Entao permanece na tela de login com a mensagem de conta bloqueada', async () => {
            await expect(loginPage.botaoLogin).toBeVisible();
            await expect(loginPage.mensagemDeErro).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        });
    });

    test('CT10 - Deve encerrar a sessao e bloquear o acesso direto', async ({ 
        page, 
        loginPage, 
        autenticado, 
    }) => {
        await test.step('Quando abre o menu lateral e clica em Logout', async () => {
            await autenticado.sair();
        });

        await test.step('Entao e redireciona para a tela de login', async () => {
            await expect(loginPage.botaoLogin).toBeVisible();
        });

        await test.step('E o acesso direto a /inventory.html volta para a tela de login', async () => {
            await autenticado.acessarDiretamente();
            await expect(loginPage.botaoLogin).toBeVisible();
            await expect(page).not.toHaveURL(/\/inventory\.html/);
        });
    });
});