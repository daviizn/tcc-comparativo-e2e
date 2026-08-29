package utils;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class DriverFactory {

    private static final int LARGURA_VIEWPORT = 1280;
    private static final int ALTURA_VIEWPORT = 720;

    private static WebDriver driver;

    public static WebDriver getDriver() {
        if (driver == null) {
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--headless");
            options.addArguments("--window-size=" + LARGURA_VIEWPORT + "," + ALTURA_VIEWPORT);
            driver = new ChromeDriver(options);
            ajustarViewport();
        }
        return driver;
    }

    private static void ajustarViewport() {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        long largura = (Long) js.executeScript("return window.innerWidth;");
        long altura = (Long) js.executeScript("return window.innerHeight;");
        Dimension janela = driver.manage().window().getSize();
        driver.manage().window().setSize(new Dimension(
            janela.getWidth() + (int) (LARGURA_VIEWPORT - largura),
            janela.getHeight() + (int) (ALTURA_VIEWPORT - altura)
        ));
    }

    public static void quitDriver() {
        if (driver != null) {
            driver.quit();
            driver = null;
        }
    }
}