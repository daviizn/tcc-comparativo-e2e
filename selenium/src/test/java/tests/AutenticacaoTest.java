package tests;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import pages.InventoryPage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Autenticação")
public class AutenticacaoTest extends BaseTest {

        private static final String BACKPACK = "sauce-labs-backpack";
 
        private static final List<String> ROTAS_PROTEGIDAS =
            List.of("/cart.html", "/checkout-step-one.html", "/checkout-complete.html");

    @Test
    @DisplayName("CT01 - Login com credencias validas")
    void deveRealizarLoginComCredenciaisValidas() {
        loginPage.acessar();
        assertTrue(loginPage.campoUsuarioEStaHabilitado(), "O campo Username deveria estar visivel e habilitado");

        InventoryPage inventoryPage = loginPage.logarComo("standard_user", "secret_sauce");

        assertAll(
                () -> assertTrue(inventoryPage.estaExibida(), "Listagem de produtos deveria estar visivel"),
                () -> assertTrue(inventoryPage.urlAtual().contains("/inventory.html"), inventoryPage.urlAtual()),
                () -> assertEquals("Swag Labs", inventoryPage.tituloDaPagina()));
    }

    @Test
    @DisplayName("CT02 - Login com credencias invalidas")
    void deveRejeitarLoginComCredenciaisInvalidas() {
        loginPage.acessar()
                .preencherUsuario("usuario_invalido")
                .preencherSenha("senha_invalida")
                .submeter();

        assertAll(
                () -> assertTrue(loginPage.estaExibida(), "Tela de login deveria estar visivel"),
                () -> assertEquals("Epic sadface: Username and password do not match any user in this service",
                        loginPage.mensagemDeErro()),
                () -> assertTrue(loginPage.camposDestacadosComErro(), "Campos destacados com erro"));
    }

    @Test
    @DisplayName("CT07 - Login com senha em branco")
    void deveRejeitarLoginComSenhaEmBranco() {
        loginPage.acessar().preencherUsuario("standard_user").submeter();

        assertAll(
                () -> assertTrue(loginPage.estaExibida(), "Tela de login deveria estar visivel"),
                () -> assertEquals("Epic sadface: Password is required", loginPage.mensagemDeErro()));
    }

    @Test
    @DisplayName("CT08 - Login com usuario em branco")
    void deveRejeitarLoginComUsuarioEmBranco() {
        loginPage.acessar().preencherSenha("secret_sauce").submeter();

        assertAll(
                () -> assertTrue(loginPage.estaExibida(), "Tela de login deveria estar visivel"),
                () -> assertEquals("Epic sadface: Username is required", loginPage.mensagemDeErro()));
    }

    @Test
    @DisplayName("CT09 - Login com usuario bloqueado")
    void deveRejeitarLoginComUsuarioBloqueado() {
        loginPage.acessar().preencherUsuario("locked_out_user").preencherSenha("secret_sauce").submeter();

        assertAll(
                () -> assertTrue(loginPage.estaExibida(), "Tela de login deveria estar visivel"),
                () -> assertEquals("Epic sadface: Sorry, this user has been locked out.", loginPage.mensagemDeErro()));
    }

    @Test
    @DisplayName("CT10 - Logout do sistema")
    void deveEncerrarSessaoEBloquearAcessoDireto() {
        InventoryPage inventoryPage = autenticar();
        assertTrue(inventoryPage.estaExibida(), "Pré-condição: deveria estar autenticado");

        inventoryPage.sair();

        assertTrue(loginPage.estaExibida(), "Deveria redirecionar para tela de login após logout");

        inventoryPage.acessarDiretamente();
        assertAll(
                () -> assertTrue(loginPage.estaExibida(), "Tela de login apos acesso direto"),
                () -> assertFalse(loginPage.urlAtual().contains("/inventory.html"), loginPage.urlAtual()));
    }

    @Test
    @DisplayName("CT19 - Proteção de rotas internas sem sessão autenticada")
    void deveBloquearAcessoDiretoAsRotasInternas() {
        for (String rota : ROTAS_PROTEGIDAS) {
            loginPage.acessarRota(rota);
 
            assertAll(
                    () -> assertTrue(loginPage.estaExibida(), "Deveria redirecionar para o login ao acessar " + rota),
                    () -> assertEquals(
                            "Epic sadface: You can only access '" + rota + "' when you are logged in.",
                            loginPage.mensagemDeErro()),
                    () -> assertFalse(loginPage.urlAtual().contains(rota), loginPage.urlAtual()),
                    () -> assertTrue(loginPage.semDadosProtegidosVisiveis(),
                            "Nao deveria exibir dados de produtos ou do carrinho em " + rota));
        }
    }
 
    @Test
    @DisplayName("CT20 - Isolamento do carrinho entre contas após encerramento de sessão")
    void deveIsolarOCarrinhoEntreContas() {
        InventoryPage inventoryPage = autenticar();
        inventoryPage.adicionarAoCarrinho(BACKPACK);
        assertEquals("1", inventoryPage.contadorDoCarrinho(), "Pré-condição: deveria ter 1 item no carrinho");
 
        InventoryPage listagem = inventoryPage.sair().logarComo(USUARIO_PROBLEMA, SENHA_PADRAO);
 
        assertTrue(listagem.estaExibida(), "A listagem de produtos deveria estar visivel");

        assertFalse(listagem.contadorDoCarrinhoPresente(),
                "DEF-01: o contador do carrinho nao deveria existir para a nova conta");
        assertEquals("Add to cart", listagem.textoDoBotaoDeAdicao(BACKPACK));
        assertEquals(0, listagem.abrirCarrinho().quantidadeDeItens(),
                "DEF-01: o carrinho da nova conta deveria estar vazio");
    }
}
