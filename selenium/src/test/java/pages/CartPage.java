package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class CartPage extends BasePage {

    private static final By LISTA_DO_CARRINHO = By.cssSelector("[data-test='cart-list']");
    private static final By ITEM_DO_CARRINHO = By.cssSelector("[data-test='inventory-item']");
    private static final By BOTAO_CHECKOUT = By.cssSelector("[data-test='checkout']");

    public CartPage(WebDriver driver) {
        super(driver);
    }

    public int quantidadeDeItens() {
        visivel(LISTA_DO_CARRINHO);
        return driver.findElements(ITEM_DO_CARRINHO).size();
    }

    public CheckoutPage irParaCheckout() {
        clicar(BOTAO_CHECKOUT);
        return new CheckoutPage(driver);
    }
}
