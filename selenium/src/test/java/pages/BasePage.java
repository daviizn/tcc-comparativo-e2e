package pages;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class BasePage {
    
    protected static final Duration TIMEOUT = Duration.ofSeconds(8);
    protected static final Duration TIMEOUT_CURTO = Duration.ofSeconds(2);
    protected static final Duration TIMEOUT_DA_RETENTATIVA = Duration.ofSeconds(6);
    protected final WebDriver driver;
    protected final WebDriverWait espera;
    protected final WebDriverWait esperaCurta;
    protected final WebDriverWait esperaDaRetentativa;
    protected BasePage(WebDriver driver) {
        this.driver = driver;
        this.espera = new WebDriverWait(driver, TIMEOUT);
        this.esperaCurta = new WebDriverWait(driver, TIMEOUT_CURTO);
        this.esperaDaRetentativa = new WebDriverWait(driver, TIMEOUT_DA_RETENTATIVA);
    }

    protected void clicarAteQue(By botao, ExpectedCondition<?> condicao) {
        clicar(botao);
        try {
            esperaCurta.until(condicao);
        } catch (TimeoutException primeiraTentativa) {
            if (estaPresente(botao)) {
                clicar(botao);
            }
            esperaDaRetentativa.until(condicao);
        }
    }

    protected void clicarEIr(By botao, By destino) {
        clicarAteQue(botao, ExpectedConditions.visibilityOfElementLocated(destino));
    }

    protected WebElement visivel(By seletor) {
        return espera.until(ExpectedConditions.visibilityOfElementLocated(seletor));
    }

    protected void digitar(By seletor, String texto) {
        visivel(seletor).sendKeys(texto);
    }

    protected void clicar(By seletor) {
        espera.until(ExpectedConditions.elementToBeClickable(seletor)).click();
    }

    protected String texto(By seletor) {
        return visivel(seletor).getText();
    }

    protected String valor(By seletor) {
        String valor = visivel(seletor).getDomProperty("value");
        return valor == null ? "" : valor;
    }

    protected boolean estaAusente(By seletor) {
        espera.until(ExpectedConditions.invisibilityOfElementLocated(seletor));
        return driver.findElements(seletor).isEmpty();
    }

    protected boolean estaPresente(By seletor) {
        return !driver.findElements(seletor).isEmpty();
    }

    public String urlAtual() {
        return driver.getCurrentUrl();
    }
    
    public String tituloDaPagina() {
        return driver.getTitle();
    }
}