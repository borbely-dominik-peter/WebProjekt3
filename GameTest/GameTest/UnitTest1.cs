using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;

namespace GameTest
{
    public class UnitTest1 : IDisposable
    {
        private readonly ChromeDriver driver;

        public UnitTest1()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl("http://127.0.0.1:5500/index.html");
        }

        public void Dispose()
        {
            driver.Quit();
        }


        [Fact]
        public void Megjelenes()
        {
            Assert.Equal("Car Game", driver.FindElement(By.XPath("/html/body/h1")).Text);
            Assert.Equal("Start Game!", driver.FindElement(By.XPath("/html/body/div[2]/h1[1]")).Text);
            Assert.Equal("Score:", driver.FindElement(By.XPath("/html/body/div[1]/p[1]")).Text);
            Assert.Equal(5, driver.FindElements(By.XPath("/html/body/div[2]/table/tbody/tr/td")).Count);
            // Assert.Equal($"url()", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[1]")).GetCssValue("background-image"));
            // Assert.Equal($"url()", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[5]")).GetCssValue("background-image"));
        }

    }
}