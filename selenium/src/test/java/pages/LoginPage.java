package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class LoginPage extends BasePage {

    private static final String URL = "https://www.saucedemo.com/";

    private static final By CAMPO_USUARIO = By.cssSelector("[data-test='username']");
    private static final By CAMPO_SENHA = By.cssSelector("[data-test='password']");
    private static final By BOTAO_LOGIN = By.cssSelector("[data-test='login-button']");
    private static final By MENSAGEM_DE_ERRO = By.cssSelector("[data-test='error']");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public LoginPage acessar() {
        driver.get(URL);
        visivel(CAMPO_USUARIO);
        return this;
    }

    public LoginPage preencherUsuario(String usuario) {
        digitar(CAMPO_USUARIO, usuario);
        return this;
    }

    public LoginPage preencherSenha(String senha) {
        digitar(CAMPO_SENHA, senha);
        return this;
    }

    public InventoryPage entrar() {
        clicar(BOTAO_LOGIN);
        return new InventoryPage(driver);
    }

    public LoginPage submeter() {
        clicar(BOTAO_LOGIN);
        return this;
    }

    public InventoryPage logarComo(String usuario, String senha) {
        return preencherUsuario(usuario).preencherSenha(senha).entrar();
    }

    public boolean estaExibida() {
        return visivel(BOTAO_LOGIN).isDisplayed();
    }

    public boolean campoUsuarioEStaHabilitado() {
        WebElement campo = visivel(CAMPO_USUARIO);
        return campo.isDisplayed() && campo.isEnabled();
    }

    public String mensagemDeErro() {
        return texto(MENSAGEM_DE_ERRO);
    }

    public boolean camposDestacadosComErro() {
        return driver.findElement(CAMPO_USUARIO).getDomAttribute("class").contains("error")
                && driver.findElement(CAMPO_SENHA).getDomAttribute("class").contains("error");
    }
    
}
