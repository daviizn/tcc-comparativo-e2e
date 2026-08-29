package tests;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import pages.CheckoutPage;
import pages.InventoryPage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Checkout")
public class CheckoutTest extends BaseTest {

    private static final String BIKE_LIGHT = "sauce-labs-bike-light";

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
}
