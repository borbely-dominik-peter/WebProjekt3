using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

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

        private void AlertCar1()
        {
            var alert = driver.SwitchTo().Alert();
            alert.SendKeys("1");
            alert.Accept();
        }

        private void AlertCar2()
        {
            var alert = driver.SwitchTo().Alert();
            alert.SendKeys("2");
            alert.Accept();
        }

        private void AlertCar3()
        {
            var alert = driver.SwitchTo().Alert();
            alert.SendKeys("3");
            alert.Accept();
        }

        [Fact]
        public void AutoKozepsoSav()
        {
            StartGame();
            AlertSkip();
            Assert.Equal("CAR", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[3]/img[1]")).GetAttribute("id"));
        }

        [Fact]
        public void AutoBalSavValt()
        {
            StartGame();
            AlertSkip();
            new Actions(driver).SendKeys(Keys.ArrowLeft).Perform();
            Assert.Equal("CAR", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[2]/img[1]")).GetAttribute("id"));
            new Actions(driver).SendKeys(Keys.ArrowLeft).Perform();
            Assert.Equal("CAR", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[1]/img[1]")).GetAttribute("id"));
        }

        [Fact]
        public void AutoJobbSavValt()
        {
            StartGame();
            AlertSkip();
            new Actions(driver).SendKeys(Keys.ArrowRight).Perform();
            Assert.Equal("CAR", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[4]/img[1]")).GetAttribute("id"));
            new Actions(driver).SendKeys(Keys.ArrowRight).Perform();
            Assert.Equal("CAR", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[5]/img[1]")).GetAttribute("id"));
        }

        [Fact]
        public void AutoSarga()
        {
            StartGame();
            AlertCar1();
            Assert.Equal("https://borbely-dominik-peter.github.io/WebProjekt3/img/auto1.png", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[3]/img[1]")).GetAttribute("src"));
        }

        [Fact]
        public void AutoSzurke()
        {
            StartGame();
            AlertCar2();
            Assert.Equal("https://borbely-dominik-peter.github.io/WebProjekt3/img/auto2.png", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[3]/img[1]")).GetAttribute("src"));
        }

        [Fact]
        public void AutoZold()
        {
            StartGame();
            AlertCar3();
            Assert.Equal("https://borbely-dominik-peter.github.io/WebProjekt3/img/auto3.png", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[3]/img[1]")).GetAttribute("src"));
        }

    }
}
