// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('simon', function () {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function () {
    await driver.quit();
  })
  it('simon', async function () {
    await driver.get("http://localhost:3000/login")
    await driver.manage().window().setRect({ width: 1936, height: 1056 })
    settimeout(3000)
    await driver.findElement(By.id("AAAAAAAAAAHG")).click()
    settimeout(3000)
    await driver.findElement(By.id("botonadmon")).click()
    await driver.findElement(By.id("text")).click()
    await driver.findElement(By.id("text")).sendKeys("juan")
    await driver.findElement(By.id("text1")).sendKeys("juan")
    await driver.findElement(By.id("text4")).sendKeys("juan")
    await driver.findElement(By.id("text2")).sendKeys("juan")
    await driver.findElement(By.id("text3")).sendKeys("juan777")
    settimeout(3000)
    await driver.findElement(By.id("pruebasss")).click()
    settimeout(3000)
    //console.log(await driver.findElement(By.id("mensajeError")).getText())
    if (!(await driver.findElement(By.id("mensajeError")).getText()) == "Placa ya en uso o input incorrecto.") {
      throw console.error();
    } else {
      settimeout(3000)

      await driver.close()
    }

  })
})



























function settimeout(tiempo) {
  let a = 0
  while (a < (tiempo * 1000000)) a++
}