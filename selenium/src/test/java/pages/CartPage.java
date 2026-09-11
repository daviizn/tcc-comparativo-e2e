package pages;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class CartPage extends BasePage {

    private static final By TITULO = By.cssSelector("[data-test='title']");
    private static final By LISTA_DO_CARRINHO = By.cssSelector("[data-test='cart-list']");
    private static final By ITEM_DO_CARRINHO = By.cssSelector("[data-test='inventory-item']");
    private static final By NOME_DO_ITEM = By.cssSelector("[data-test='cart-list'] [data-test='inventory-item-name']");
    private static final By PRECO_DO_ITEM = By.cssSelector("[data-test='cart-list'] [data-test='inventory-item-price']");
    private static final By BOTAO_CHECKOUT = By.cssSelector("[data-test='checkout']");
    private static final By BOTAO_CONTINUAR_COMPRANDO = By.cssSelector("[data-test='continue-shopping']");
    private static final By CAMPO_PRIMEIRO_NOME = By.cssSelector("[data-test='firstName']");
    private static final By LISTA_DE_PRODUTOS = By.cssSelector("[data-test='inventory-list']");

    public CartPage(WebDriver driver) {
        super(driver);
    }

    private static By botaoDeRemocao(String produto) {
        return By.cssSelector("[data-test='cart-list'] [data-test='remove-" + produto + "']");
    }
 
    public String titulo() {
        return texto(TITULO);
    }

    public int quantidadeDeItens() {
        visivel(LISTA_DO_CARRINHO);
        return driver.findElements(ITEM_DO_CARRINHO).size();
    }

    public List<String> nomesDosItens() {
        visivel(LISTA_DO_CARRINHO);
        return driver.findElements(NOME_DO_ITEM).stream().map(WebElement::getText).toList();
    }
 
    public List<String> precosDosItens() {
        visivel(LISTA_DO_CARRINHO);
        return driver.findElements(PRECO_DO_ITEM).stream().map(WebElement::getText).toList();
    }
 
    public CartPage remover(String produto) {
        clicar(botaoDeRemocao(produto));
        return this;
    }

    public CheckoutPage irParaCheckout() {
        clicarEIr(BOTAO_CHECKOUT, CAMPO_PRIMEIRO_NOME);
        return new CheckoutPage(driver);
    }

    public InventoryPage continuarComprando() {
        clicarEIr(BOTAO_CONTINUAR_COMPRANDO, LISTA_DE_PRODUTOS);
        return new InventoryPage(driver);
    }
}
