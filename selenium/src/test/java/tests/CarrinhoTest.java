package tests;

import java.util.List;

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
    private static final String BIKE_LIGHT = "sauce-labs-bike-light";
    private static final String BOLT_TSHIRT = "sauce-labs-bolt-t-shirt";
    private static final String FLEECE_JACKET_NOME = "Sauce Labs Fleece Jacket";

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

    @Test
    @DisplayName("CT12 - Adicionar múltiplos produtos ao carrinho")
    void deveAcumularMultiplosProdutosNoCarrinho() {
        InventoryPage inventoryPage = autenticar();
 
        inventoryPage.adicionarAoCarrinho(BACKPACK)
                .adicionarAoCarrinho(BIKE_LIGHT)
                .adicionarAoCarrinho(BOLT_TSHIRT);
 
        assertEquals("3", inventoryPage.contadorDoCarrinho(), "O contador deveria exibir 3");
 
        CartPage cartPage = inventoryPage.abrirCarrinho();
        assertAll(
                () -> assertEquals(3, cartPage.quantidadeDeItens()),
                () -> assertEquals(
                        List.of("Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"),
                        cartPage.nomesDosItens()),
                () -> assertEquals(List.of("$29.99", "$9.99", "$15.99"), cartPage.precosDosItens()));
    }
 
    @Test
    @DisplayName("CT13 - Persistência do carrinho após navegação")
    void devePreservarOCarrinhoAposNavegacao() {
        InventoryPage inventoryPage = autenticar();
        inventoryPage.adicionarAoCarrinho(BACKPACK);
        assertEquals("1", inventoryPage.contadorDoCarrinho(), "Pré-condição: deveria ter 1 item no carrinho");
 
        InventoryPage listagem = inventoryPage.abrirDetalhes(FLEECE_JACKET_NOME).voltarParaListagem();
 
        assertAll(
                () -> assertTrue(listagem.urlAtual().contains("/inventory.html"), listagem.urlAtual()),
                () -> assertEquals("1", listagem.contadorDoCarrinho()));
 
        CartPage cartPage = listagem.abrirCarrinho();
        assertEquals(List.of("Sauce Labs Backpack"), cartPage.nomesDosItens());
    }
 
    @Test
    @DisplayName("CT17 - Remoção de produto pela tela do carrinho")
    void deveRemoverProdutoPelaTelaDoCarrinho() {
        InventoryPage inventoryPage = autenticar();
        inventoryPage.adicionarAoCarrinho(BACKPACK).adicionarAoCarrinho(BIKE_LIGHT);
        assertEquals("2", inventoryPage.contadorDoCarrinho(), "Pré-condição: deveria ter 2 itens no carrinho");
 
        CartPage cartPage = inventoryPage.abrirCarrinho().remover(BACKPACK);
 
        assertAll(
                () -> assertEquals(1, cartPage.quantidadeDeItens()),
                () -> assertEquals(List.of("Sauce Labs Bike Light"), cartPage.nomesDosItens()),
                () -> assertEquals(List.of("$9.99"), cartPage.precosDosItens()),
                () -> assertEquals("1", inventoryPage.contadorDoCarrinho()));
 
        InventoryPage listagem = cartPage.continuarComprando();
        assertAll(
                () -> assertEquals("Add to cart", listagem.textoDoBotaoDeAdicao(BACKPACK)),
                () -> assertEquals("Remove", listagem.textoDoBotaoDeRemocao(BIKE_LIGHT)));
    }
}
