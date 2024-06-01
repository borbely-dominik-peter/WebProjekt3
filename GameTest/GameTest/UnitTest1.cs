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
            driver.Navigate().GoToUrl("https://borbely-dominik-peter.github.io/WebProjekt3/");
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
            Assert.Equal($"url(\"https://borbely-dominik-peter.github.io/WebProjekt3/img/balut.png\")", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[1]")).GetCssValue("background-image"));
            Assert.Equal($"url(\"https://borbely-dominik-peter.github.io/WebProjekt3/img/ut.png\")", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[5]")).GetCssValue("background-image"));
        }

        private void StartGame()
        {
            driver.FindElement(By.Id("startText")).Click();
        }
        
        private void AlertSkip()
        {
            var alert = driver.SwitchTo().Alert();
            alert.SendKeys("");
            alert.Accept();
        }

        [Fact]
        public void AutoKozepsoSav()
        {
            StartGame();
            AlertSkip();
            System.Threading.Thread.Sleep(1000);
            Assert.Equal("CAR", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[3]/img[1]")).GetAttribute("id"));
        }
        
    }
}
