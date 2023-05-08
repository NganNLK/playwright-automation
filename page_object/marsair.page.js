const { expect } = require("chai")
const { Locator } = require ('../features/support/locator')
const locator = new Locator()

class MarsAirPage {
    async navigate() {
        await page.goto(locator.url)
        await page.waitForSelector(locator.welcomeContent) 
    }

    async departing(month) { 
        await page.click(locator.departing)
        await page.selectOption('select[name="departing"]', {label: `${month}`});
        await page.click(locator.outside)
        const val = (await page.locator(locator.departing).innerText()).valueOf()
        expect(val).to.contains(`${month}`)
    }

    async returning(month) { 
        await page.click(locator.returning)
        await page.selectOption('select[name="returning"]', {label: `${month}`});
        await page.click(locator.outside)
        const val = (await page.locator(locator.returning).innerText()).valueOf()
        expect(val).to.contains(`${month}`)
    }

    async search(string) { 
        await page.click(`text=${string}`)
    }

    async informationContent(string) { 
        await page.waitForSelector(`text=${string}`)
        const val = (await page.locator(locator.content).innerText()).valueOf()
        expect(val).to.contains(`${string}`)
    }

    async defaultValue(string) { 
        await page.waitForSelector('text="Book a ticket to the red planet now!"')
        const departingDefaultValue = (await page.locator(locator.departing).innerText()).valueOf()
        const returningDefaultValue = (await page.locator(locator.returning).innerText()).valueOf()
        expect(departingDefaultValue).to.contains(`${string}`)
        expect(returningDefaultValue).to.contains(`${string}`)
    }

    async emptyCode() {
        const promotionalCode = await page.locator(locator.promotionalCode).inputValue()
        expect(promotionalCode).to.be.empty
    }
  }
  module.exports = { MarsAirPage }