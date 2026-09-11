package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class CheckoutPage extends BasePage {

    private static final By TITULO = By.cssSelector("[data-test='title']");
    private static final By CAMPO_PRIMEIRO_NOME = By.cssSelector("[data-test='firstName']");
    private static final By CAMPO_SOBRENOME = By.cssSelector("[data-test='lastName']");
    private static final By CAMPO_CEP = By.cssSelector("[data-test='postalCode']");
    private static final By BOTAO_CONTINUAR = By.cssSelector("[data-test='continue']");
    private static final By BOTAO_CANCELAR = By.cssSelector("[data-test='cancel']");
    private static final By BOTAO_FINALIZAR = By.cssSelector("[data-test='finish']");
    private static final By MENSAGEM_DE_ERRO = By.cssSelector("[data-test='error']");
    private static final By MENSAGEM_DE_CONFIRMACAO = By.cssSelector("[data-test='complete-header']");
    private static final By LISTA_DO_CARRINHO = By.cssSelector("[data-test='cart-list']");

    public CheckoutPage(WebDriver driver) {
        super(driver);
    }

    public CheckoutPage preencherPrimeiroNome(String primeiroNome) {
        digitar(CAMPO_PRIMEIRO_NOME, primeiroNome);
        return this;
    }

    public CheckoutPage preencherSobrenome(String sobrenome) {
        digitar(CAMPO_SOBRENOME, sobrenome);
        return this;
    }

    public CheckoutPage preencherCep(String cep) {
        digitar(CAMPO_CEP, cep);
        return this;
    }

    public CheckoutPage preencherDados(String primeiroNome, String sobrenome, String cep) {
        return preencherPrimeiroNome(primeiroNome).preencherSobrenome(sobrenome).preencherCep(cep);
    }

    public CheckoutPage continuar() {
        clicarAteQue(BOTAO_CONTINUAR, ExpectedConditions.or(
                ExpectedConditions.visibilityOfElementLocated(MENSAGEM_DE_ERRO),
                ExpectedConditions.visibilityOfElementLocated(BOTAO_FINALIZAR)));
        return this;
    }

    public CartPage cancelar() {
        clicarEIr(BOTAO_CANCELAR, LISTA_DO_CARRINHO);
        return new CartPage(driver);
    }

    public CheckoutPage finalizar() {
        clicarEIr(BOTAO_FINALIZAR, MENSAGEM_DE_CONFIRMACAO);
        return this;
    }

    public String titulo() {
        return texto(TITULO);
    }

    public String mensagemDeErro() {
        return texto(MENSAGEM_DE_ERRO);
    }

    public String mensagemDeConfirmacao() {
        return texto(MENSAGEM_DE_CONFIRMACAO);
    }
    
    public boolean camposObrigatoriosEmBranco() {
        return valor(CAMPO_PRIMEIRO_NOME).isEmpty()
                && valor(CAMPO_SOBRENOME).isEmpty()
                && valor(CAMPO_CEP).isEmpty();
    }
}