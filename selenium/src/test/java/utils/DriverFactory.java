package utils;

import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.remote.RemoteWebDriver;

public class DriverFactory {

    private static final int LARGURA_VIEWPORT = 1280;
    private static final int ALTURA_VIEWPORT = 720;

    private static final String NAVEGADOR =
        System.getProperty("navegador", "chrome").trim().toLowerCase();

    private static final String GRID = System.getProperty("grid", "").trim();

    private static final ThreadLocal<WebDriver> DRIVER = new ThreadLocal<>();

    private static final List<WebDriver> CRIADOS = Collections.synchronizedList(new ArrayList<>());

    static {
        Runtime.getRuntime().addShutdownHook(new Thread(DriverFactory::encerrarTodos));
    }

    public static String navegador() {
        return NAVEGADOR;
    }

    public static boolean viaGrid() {
        return !GRID.isEmpty();
    }

    public static WebDriver getDriver() {
        if (DRIVER.get() == null) {
            WebDriver driver = criar();
            DRIVER.set(driver);
            CRIADOS.add(driver);
            ajustarViewport();
        }
        return DRIVER.get();
    }

    private static WebDriver criar() {
        MutableCapabilities opcoes = opcoesDe(NAVEGADOR);

        if (viaGrid()) {
            return new RemoteWebDriver(urlDoHub(), opcoes);
        }
        if (opcoes instanceof ChromeOptions) {
            return new ChromeDriver((ChromeOptions) opcoes);
        }
        if (opcoes instanceof EdgeOptions) {
            return new EdgeDriver((EdgeOptions) opcoes);
        }
        return new FirefoxDriver((FirefoxOptions) opcoes);
    }

    private static MutableCapabilities opcoesDe(String navegador) {
        String tamanho = LARGURA_VIEWPORT + "," + ALTURA_VIEWPORT;
        switch (navegador) {
            case "chrome": {
                ChromeOptions options = new ChromeOptions();
                options.addArguments("--headless");
                options.addArguments("--window-size=" + tamanho);
                return options;
            }
            case "edge": {
                EdgeOptions options = new EdgeOptions();
                options.addArguments("--headless");
                options.addArguments("--window-size=" + tamanho);
                return options;
            }
            case "firefox": {
                FirefoxOptions options = new FirefoxOptions();
                options.addArguments("-headless");
                options.addArguments("--width=" + LARGURA_VIEWPORT);
                options.addArguments("--height=" + ALTURA_VIEWPORT);
                return options;
            }
            default:
                throw new IllegalArgumentException(
                    "Navegador nao suportado: '" + navegador + "'. Use chrome, edge ou firefox.");
        }
    }

    private static URL urlDoHub() {
        try {
            return URI.create(GRID).toURL();
        } catch (Exception erro) {
            throw new IllegalArgumentException(
                "URL de Grid invalida: '" + GRID + "'. Esperado algo como http://localhost:4444", erro);
        }
    }

    private static void ajustarViewport() {
        WebDriver driver = DRIVER.get();
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
        WebDriver driver = DRIVER.get();
        if (driver != null) {
            driver.quit();
            CRIADOS.remove(driver);
            DRIVER.remove();
        }
    }

    private static void encerrarTodos() {
        synchronized (CRIADOS) {
            for (WebDriver driver : new ArrayList<>(CRIADOS)) {
                try {
                    driver.quit();
                } catch (RuntimeException ignorado) {
                }
            }
            CRIADOS.clear();
        }
    }
}