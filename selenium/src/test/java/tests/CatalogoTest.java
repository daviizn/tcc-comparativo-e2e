package tests;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import pages.InventoryPage;
import pages.ProductPage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Catálogo de produtos")
public class CatalogoTest extends BaseTest {

    private static final String FLEECE_JACKET_NOME = "Sauce Labs Fleece Jacket";
    private static final String FORMATO_MONETARIO = "^\\$\\d+\\.\\d{2}$";

    @Test
    @DisplayName("CT11 - Visualização de detalhes do produto")
    void deveExibirOsDetalhesDoProduto() {
        InventoryPage inventoryPage = autenticar();

        ProductPage productPage = inventoryPage.abrirDetalhes(FLEECE_JACKET_NOME);

        assertAll(
                () -> assertTrue(productPage.urlAtual().contains("/inventory-item.html"), productPage.urlAtual()),
                () -> assertEquals(FLEECE_JACKET_NOME, productPage.nome()),
                () -> assertFalse(productPage.descricao().isBlank(), "A descricao deveria estar visivel"),
                () -> assertTrue(productPage.preco().matches(FORMATO_MONETARIO),
                        "Preco fora do formato monetario: " + productPage.preco()),
                () -> assertTrue(productPage.botaoDeAdicaoHabilitado(), "Botao Add to cart deveria estar habilitado"),
                () -> assertEquals("Add to cart", productPage.textoDoBotaoDeAdicao()));
    }
}