package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class CheckoutPage extends BasePage {

    private static final By CAMPO_PRIMEIRO_NOME = By.cssSelector("[data-test='firstName']");
    private static final By CAMPO_SOBRENOME = By.cssSelector("[data-test='lastName']");
    private static final By CAMPO_CEP = By.cssSelector("[data-test='postalCode']");
    private static final By BOTAO_CONTINUAR = By.cssSelector("[data-test='continue']");
    private static final By BOTAO_FINALIZAR = By.cssSelector("[data-test='finish']");
    private static final By MENSAGEM_DE_CONFIRMACAO = By.cssSelector("[data-test='complete-header']");

    public CheckoutPage(WebDriver driver) {
        super(driver);
    }

    public CheckoutPage preencherDados(String primeiroNome, String sobrenome, String cep) {
        digitar(CAMPO_PRIMEIRO_NOME, primeiroNome);
        digitar(CAMPO_SOBRENOME, sobrenome);
        digitar(CAMPO_CEP, cep);
        return this;
    }

    public CheckoutPage continuar() {
        clicar(BOTAO_CONTINUAR);
        return this;
    }

    public CheckoutPage finalizar() {
        clicar(BOTAO_FINALIZAR);
        return this;
    }

    public String mensagemDeConfirmacao() {
        return texto(MENSAGEM_DE_CONFIRMACAO);
    }
}
