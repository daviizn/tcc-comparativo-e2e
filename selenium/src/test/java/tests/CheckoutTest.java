package tests;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import pages.CartPage;
import pages.CheckoutPage;
import pages.InventoryPage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Checkout")
public class CheckoutTest extends BaseTest {

    private static final String BIKE_LIGHT = "sauce-labs-bike-light";
    private static final String BACKPACK = "sauce-labs-backpack";
    private static final String TELA_DE_INFORMACOES = "Checkout: Your Information";

    @Test
    @DisplayName("CT06 - Finalização de compra")
    void deveFinalizarCompraComSucesso() {
        InventoryPage inventoryPage = autenticar();
        inventoryPage.adicionarAoCarrinho(BIKE_LIGHT);
        assertEquals("1", inventoryPage.contadorDoCarrinho(), "Pré-condição: deveria ter 1 item no carrinho");

        CheckoutPage checkoutPage = inventoryPage.abrirCarrinho()
                .irParaCheckout()
                .preencherDados("João", "Silva", "70000-000")
                .continuar()
                .finalizar();

        assertAll(
                () -> assertEquals("Thank you for your order!", checkoutPage.mensagemDeConfirmacao()),
                () -> assertTrue(inventoryPage.contadorDoCarrinhoAusente(), "Carrinho vazio"));
    }

    @Test
    @DisplayName("CT14 - Cancelamento do checkout")
    void deveCancelarOCheckoutPreservandoOCarrinho() {
        InventoryPage inventoryPage = autenticar();
        inventoryPage.adicionarAoCarrinho(BIKE_LIGHT);
        assertEquals("1", inventoryPage.contadorDoCarrinho(), "Pré-condição: deveria ter 1 item no carrinho");
 
        CheckoutPage checkoutPage = inventoryPage.abrirCarrinho().irParaCheckout();
        assertEquals(TELA_DE_INFORMACOES, checkoutPage.titulo(), "Pré-condição: tela de informações pessoais");
 
        CartPage cartPage = checkoutPage.cancelar();
 
        assertAll(
                () -> assertTrue(cartPage.urlAtual().contains("/cart.html"), cartPage.urlAtual()),
                () -> assertEquals("Your Cart", cartPage.titulo()),
                () -> assertEquals(List.of("Sauce Labs Bike Light"), cartPage.nomesDosItens()),
                () -> assertEquals("1", inventoryPage.contadorDoCarrinho()));
    }
 
    @Test
    @DisplayName("CT15 - Validação de campos obrigatórios no checkout")
    void deveBloquearOCheckoutComOsCamposEmBranco() {
        InventoryPage inventoryPage = autenticar();
        inventoryPage.adicionarAoCarrinho(BACKPACK);
 
        CheckoutPage checkoutPage = inventoryPage.abrirCarrinho().irParaCheckout();
        assertTrue(checkoutPage.camposObrigatoriosEmBranco(), "Pré-condição: os três campos deveriam estar em branco");
 
        checkoutPage.continuar();
 
        assertAll(
                () -> assertTrue(checkoutPage.urlAtual().contains("/checkout-step-one.html"), checkoutPage.urlAtual()),
                () -> assertEquals(TELA_DE_INFORMACOES, checkoutPage.titulo()),
                () -> assertEquals("Error: First Name is required", checkoutPage.mensagemDeErro()));
    }
 
    @Test
    @DisplayName("CT18 - Validação dos demais campos obrigatórios no checkout")
    void deveValidarCadaCampoObrigatorioIndividualmente() {
        InventoryPage inventoryPage = autenticar();
        inventoryPage.adicionarAoCarrinho(BACKPACK);
 
        CheckoutPage checkoutPage = inventoryPage.abrirCarrinho().irParaCheckout();
 
        checkoutPage.preencherPrimeiroNome("João").continuar();
        assertAll(
                () -> assertEquals("Error: Last Name is required", checkoutPage.mensagemDeErro()),
                () -> assertEquals(TELA_DE_INFORMACOES, checkoutPage.titulo()));
 
        checkoutPage.preencherSobrenome("Silva").continuar();
        assertAll(
                () -> assertEquals("Error: Postal Code is required", checkoutPage.mensagemDeErro()),
                () -> assertEquals(TELA_DE_INFORMACOES, checkoutPage.titulo()),
                () -> assertTrue(checkoutPage.urlAtual().contains("/checkout-step-one.html"), checkoutPage.urlAtual()));
    }
}
