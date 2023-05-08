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

    async validPromotionalCode() {
        
        const twoRandomNumber = Math.floor(Math.random() * 90 + 10)
        const aRandomDigit = Math.floor(Math.random() * 10)
        
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        function generateString(length) {
            let result = '';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            return result;
        }

        const str1 = `${generateString(2)}`
        const newStr1 = str1.concat('', aRandomDigit)
        const str2 = `${generateString(3)}`
        const str3 = twoRandomNumber.toString()
        
        function getSumOfDigits(num) {
            return String(num)
              .split('')
              .reduce((accumulator, digit) => {
                return accumulator + Number(digit);
              }, 0);
        }

        const total = (getSumOfDigits(twoRandomNumber) + aRandomDigit) % 10
        const a = total.toString()
        const b = str3.concat('', a)

        const validCode = newStr1.concat('-',str2, '-',b)
        await page.fill(locator.promotionalCode, `${validCode}`)

        const promotionalCode = await page.locator(locator.promotionalCode).inputValue()
        expect(promotionalCode).to.contains(`${validCode}`)
    }
  }
  module.exports = { MarsAirPage }