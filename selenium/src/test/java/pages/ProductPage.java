package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class ProductPage extends BasePage {

    private static final By NOME_DO_PRODUTO = By.cssSelector("[data-test='inventory-item-name']");
    private static final By DESCRICAO_DO_PRODUTO = By.cssSelector("[data-test='inventory-item-desc']");
    private static final By PRECO_DO_PRODUTO = By.cssSelector("[data-test='inventory-item-price']");
    private static final By BOTAO_ADICIONAR = By.cssSelector("[data-test='add-to-cart']");
    private static final By BOTAO_VOLTAR = By.cssSelector("[data-test='back-to-products']");
    private static final By LISTA_DE_PRODUTOS = By.cssSelector("[data-test='inventory-list']");

    public ProductPage(WebDriver driver) {
        super(driver);
    }

    public String nome() {
        return texto(NOME_DO_PRODUTO);
    }

    public String descricao() {
        return texto(DESCRICAO_DO_PRODUTO);
    }

    public String preco() {
        return texto(PRECO_DO_PRODUTO);
    }

    public boolean botaoDeAdicaoHabilitado() {
        WebElement botao = visivel(BOTAO_ADICIONAR);
        return botao.isDisplayed() && botao.isEnabled();
    }

    public String textoDoBotaoDeAdicao() {
        return texto(BOTAO_ADICIONAR);
    }

    public InventoryPage voltarParaListagem() {
        clicarEIr(BOTAO_VOLTAR, LISTA_DE_PRODUTOS);
        return new InventoryPage(driver);
    }
}