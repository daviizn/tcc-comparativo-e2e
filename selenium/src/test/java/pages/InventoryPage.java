package pages;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

public class InventoryPage extends BasePage {

    private static final String URL = "https://www.saucedemo.com/inventory.html";

    private static final By LISTA_DE_PRODUTOS = By.cssSelector("[data-test='inventory-list']");
    private static final By NOMES_DOS_PRODUTOS = By.cssSelector("[data-test='inventory-item-name']");
    private static final By BADGE_DO_CARRINHO = By.cssSelector("[data-test='shopping-cart-badge']");
    private static final By LINK_DO_CARRINHO = By.cssSelector("[data-test='shopping-cart-link']");
    private static final By SELETOR_DE_ORDENACAO = By.cssSelector("[data-test='product-sort-container']");
    private static final By MENU_HAMBURGUER = By.id("react-burger-menu-btn");
    private static final By LINK_DE_LOGOUT = By.cssSelector("[data-test='logout-sidebar-link']");

    public InventoryPage(WebDriver driver) {
        super(driver);
    }

    private static By botaoDeAdicao(String produto) {
        return By.cssSelector("[data-test='remove-" + produto + "']");
    }

    private static By botaoDeRemocao(String produto) {
        return By.cssSelector("[data-test='add-to-cart-" + produto + "']");
    }

    public InventoryPage acessarDiretamente() {
        driver.get(URL);
        return this;
    }

    public boolean estaExibida() {
        return visivel(LISTA_DE_PRODUTOS).isDisplayed();
    }

    public InventoryPage adicionarAoCarrinho(String produto) {
        clicar(botaoDeAdicao(produto));
        return this;
    }

    public InventoryPage removerDoCarrinho(String produto) {
        clicar(botaoDeRemocao(produto));
        return this;
    }

    public String textoDoBotaoDeAdicao(String produto) {
        return texto(botaoDeAdicao(produto));
    }

    public String textoDoBotaoDeRemocao(String produto) {
        return texto(botaoDeRemocao(produto));
    }

    public String contadorDoCarrinho() {
        return texto(BADGE_DO_CARRINHO);
    }

    public boolean contadorDoCarrinhoAusente() {
        return estaAusente(BADGE_DO_CARRINHO);
    }

    public CartPage abrirCarrinho() {
        clicar(LINK_DO_CARRINHO);
        return new CartPage(driver);
    }

    public InventoryPage ordenarPor(String rotulo) {
        new Select(visivel(SELETOR_DE_ORDENACAO)).selectByVisibleText(rotulo);
        return this;
    }

    public List<String> nomesDosProdutos() {
        visivel(LISTA_DE_PRODUTOS);
        return driver.findElements(NOMES_DOS_PRODUTOS).stream()
                .map(WebElement::getText)
                .toList();
    }

    public LoginPage sair() {
        clicar(MENU_HAMBURGUER);
        clicar(LINK_DE_LOGOUT);
        return new LoginPage(driver);
    }
}
