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
        public void Test1()
        {

        }
    }
}