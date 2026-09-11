package tests;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import pages.InventoryPage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Listagem e filtros")
public class ListagemFiltrosTest extends BaseTest {

    @Test
    @DisplayName("CT05 - Ordenação de produtos")
    void deveOrdenarProdutosEmOrdemAlfabeticaDecrescente() {
        InventoryPage inventoryPage = autenticar();

        inventoryPage.ordenarPor("Name (Z to A)");

        List<String> nomes = inventoryPage.nomesDosProdutos();
        List<String> decrescente = new ArrayList<>(nomes);
        decrescente.sort(Comparator.reverseOrder());
        assertAll(
                () -> assertEquals(decrescente, nomes, "Ordem decrescente"),
                () -> assertEquals(decrescente.get(0), nomes.get(0)));
    }

    @Test
    @DisplayName("CT16 - Ordenação por preço crescente")
    void deveOrdenarProdutosPorPrecoCrescente() {
        InventoryPage inventoryPage = autenticar();
 
        inventoryPage.ordenarPor("Price (low to high)");
 
        List<Double> precos = inventoryPage.precosDosProdutos();
        List<Double> crescente = new ArrayList<>(precos);
        Collections.sort(crescente);
        assertAll(
                () -> assertEquals(crescente, precos, "Ordem crescente de preço"),
                () -> assertEquals(Collections.min(precos), precos.get(0), "O primeiro deveria ter o menor preço"));
    }

}
