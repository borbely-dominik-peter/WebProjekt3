using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;

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
        public void LoadedIn()
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

        private void AlertCar(string car)
        {
            var alert = driver.SwitchTo().Alert();
            alert.SendKeys(car);
            alert.Accept();
        }

        [Fact]
        public void CarMiddleLane()
        {
            StartGame();
            AlertCar("");
            Assert.Equal("CAR", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[3]/img[1]")).GetAttribute("id"));
        }

        [Fact]
        public void CarLeftLaneSwitch()
        {
            StartGame();
            AlertCar("");
            for (int i = 0; i < 100; i++)
            {
                var car = driver.FindElements(By.Id("CAR"));
                if (car.Count > 0 && car[0].Displayed)
                {
                    Thread.Sleep(100);
                    break;
                }
            }
            new Actions(driver).SendKeys(Keys.ArrowLeft).Perform();
            Assert.Equal("CAR", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[2]/img[1]")).GetAttribute("id"));
            new Actions(driver).SendKeys(Keys.ArrowLeft).Perform();
            Assert.Equal("CAR", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[1]/img[1]")).GetAttribute("id"));
        }

        [Fact]
        public void CarRightLaneSwitch()
        {
            StartGame();
            AlertCar("");
            for (int i = 0; i < 100; i++)
            {
                var car = driver.FindElements(By.Id("CAR"));
                if (car.Count > 0 && car[0].Displayed)
                {
                    Thread.Sleep(100);
                    break;
                }
            }
            new Actions(driver).SendKeys(Keys.ArrowRight).Perform();
            Assert.Equal("CAR", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[4]/img[1]")).GetAttribute("id"));
            new Actions(driver).SendKeys(Keys.ArrowRight).Perform();
            Assert.Equal("CAR", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[5]/img[1]")).GetAttribute("id"));
        }

        [Fact]
        public void CarIsYellow()
        {
            StartGame();
            AlertCar("1");
            Assert.Equal("https://borbely-dominik-peter.github.io/WebProjekt3/img/auto1.png", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[3]/img[1]")).GetAttribute("src"));
        }

        [Fact]
        public void CarIsGray()
        {
            StartGame();
            AlertCar("2");
            Assert.Equal("https://borbely-dominik-peter.github.io/WebProjekt3/img/auto2.png", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[3]/img[1]")).GetAttribute("src"));
        }

        [Fact]
        public void CarIsGreen()
        {
            StartGame();
            AlertCar("3");
            Assert.Equal("https://borbely-dominik-peter.github.io/WebProjekt3/img/auto3.png", driver.FindElement(By.XPath("/html/body/div[2]/table/tbody/tr/td[3]/img[1]")).GetAttribute("src"));
        }

        [Fact]
        public void BarrierGeneration()
        {
            StartGame();
            AlertCar("");
            for (int i = 0; i < 20; i++)
            {
                var barriers = driver.FindElements(By.ClassName("obs"));
                if (barriers.Count > 0 && barriers[0].Displayed)
                {
                    break;
                }
                Thread.Sleep(100);
            }

            var obstacles = driver.FindElements(By.ClassName("obs"));
            Assert.True(obstacles.Count > 0);
        }

        [Fact]
        public void GettingPoint()
        {
            StartGame();
            AlertCar("");

            Thread.Sleep(3000);

            var scoreElement = driver.FindElement(By.Id("SCOut"));
            var score = int.Parse(scoreElement.Text);

            if (driver.FindElement(By.XPath("//*[@id=\"endText\"]")).Displayed)
            {
                driver.FindElement(By.XPath("//*[@id=\"endText\"]")).Click();
                GettingPoint();
            }
            else
            {
                Assert.True(score > 0);
            }
        }

        [Fact]
        public void RetryGameOverScreen()
        {
            StartGame();
            AlertCar("");

            for (int i = 0; i < 100; i++)
            {
                var gameOverTextElements = driver.FindElements(By.Id("endText"));
                if (gameOverTextElements.Count > 0 && gameOverTextElements[0].Displayed)
                {
                    break;
                }
                Thread.Sleep(100);
            }

            var retryButton = driver.FindElement(By.Id("endText"));
            retryButton.Click();

            var startText = driver.FindElement(By.Id("startText")).Text;
            Assert.Equal("Start Game!", startText);
        }

        [Fact]
        public void HighScoreCheckIfStored()
        {
            StartGame();
            AlertCar("");

            var highscore1 = driver.FindElement(By.Id("HS_Value")).Text;
            for (int i = 0; i < 100; i++)
            {
                var gameOverTextElements = driver.FindElements(By.Id("endText"));
                if (gameOverTextElements.Count > 0 && gameOverTextElements[0].Displayed)
                {
                    highscore1 = driver.FindElement(By.Id("HS_Value")).Text;
                    break;
                }
                Thread.Sleep(100);
            }
            var retryButton = driver.FindElement(By.Id("endText"));
            retryButton.Click();

            var highscore2 = driver.FindElement(By.Id("HS_Value")).Text;

            Assert.Equal(highscore1, highscore2);
        }

        [Fact]
        public void HighScoreCheckIfValid()
        {
            StartGame();
            AlertCar("");
            Thread.Sleep(2000);

            var score = int.Parse(driver.FindElement(By.Id("SCOut")).Text);

            if (driver.FindElement(By.XPath("//*[@id=\"endText\"]")).Displayed)
            {
                driver.FindElement(By.XPath("//*[@id=\"endText\"]")).Click();
                GettingPoint();
            }
            else
            {
                for (int i = 0; i < 100; i++)
                {
                    var gameOverTextElements = driver.FindElements(By.Id("endText"));
                    if (gameOverTextElements.Count > 0 && gameOverTextElements[0].Displayed)
                    {
                        break;
                    }
                    Thread.Sleep(100);
                }
                var highscore = int.Parse(driver.FindElement(By.Id("HS_Value")).Text);
                var retryButton = driver.FindElement(By.Id("endText"));
                retryButton.Click();

                StartGame();
                AlertCar("");
                score = int.Parse(driver.FindElement(By.Id("SCOut")).Text);
                Assert.True(score < highscore);
            }
        }
    }
}
