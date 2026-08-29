package tests;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import pages.CartPage;
import pages.InventoryPage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Carrinho de compras")
public class CarrinhoTest extends BaseTest {

    private static final String BACKPACK = "sauce-labs-backpack";

    @Test
    @DisplayName("CT03 - Adicionar produto ao carrinho")
    void deveAdicionarProdutoAoCarrinho() {
        InventoryPage inventoryPage = autenticar();
        assertTrue(inventoryPage.estaExibida(), "Pré-condição: deveria estar na listagem");

        inventoryPage.adicionarAoCarrinho(BACKPACK);

        assertAll(
                () -> assertEquals("Remove", inventoryPage.textoDoBotaoDeRemocao(BACKPACK)),
                () -> assertEquals("1", inventoryPage.contadorDoCarrinho()));
    }

    @Test
    @DisplayName("CT04 - Remover produto do carrinho")
    void deveRemoverProdutoDoCarrinho() {
        InventoryPage inventoryPage = autenticar();
        inventoryPage.adicionarAoCarrinho(BACKPACK);
        assertEquals("1", inventoryPage.contadorDoCarrinho(), "Pré-condição: deveria ter 1 item no carrinho");

        inventoryPage.removerDoCarrinho(BACKPACK);

        assertAll(
                () -> assertEquals("Add to cart", inventoryPage.textoDoBotaoDeAdicao(BACKPACK)),
                () -> assertTrue(inventoryPage.contadorDoCarrinhoAusente(), "Contador ausente"));
        CartPage cartPage = inventoryPage.abrirCarrinho();
        assertEquals(0, cartPage.quantidadeDeItens(), "O carrinho deveria estar vazio");
    }
}
