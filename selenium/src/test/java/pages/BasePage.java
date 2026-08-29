package pages;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class BasePage {
    
    protected static final Duration TIMEOUT = Duration.ofSeconds(8);

    protected final WebDriver driver;
    protected final WebDriverWait espera;

    protected BasePage(WebDriver driver) {
        this.driver = driver;
        this.espera = new WebDriverWait(driver, TIMEOUT);
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

    protected boolean estaAusente(By seletor) {
        espera.until(ExpectedConditions.invisibilityOfElementLocated(seletor));
        return driver.findElements(seletor).isEmpty();
    }

    public String urlAtual() {
        return driver.getCurrentUrl();
    }

    public String tituloDaPagina() {
        return driver.getTitle();
    }
}
