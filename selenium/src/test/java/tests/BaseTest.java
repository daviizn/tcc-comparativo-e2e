package tests;

import pages.InventoryPage;
import pages.LoginPage;
import utils.DriverFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.WebDriver;

public class BaseTest {

    protected static final String USUARIO_PADRAO = "standard_user";
    protected static final String SENHA_PADRAO = "secret_sauce";

    protected WebDriver driver;
    protected LoginPage loginPage;

    @BeforeEach
    void iniciarSessao() {
        driver = DriverFactory.getDriver();
        loginPage = new LoginPage(driver);
    }

    @AfterEach
    void encerrarSessao() {
        DriverFactory.quitDriver();
    }

    protected InventoryPage autenticar() {
        return loginPage.acessar().logarComo(USUARIO_PADRAO, SENHA_PADRAO);
    }
}
