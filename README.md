## Getting Started

* To install Playwright : `npm install playwright --save-dev`
* To install Cucumber   : `npm install cucumber --save-dev`
* To install Junit Reporter : `npm install cucumberjs-junitxml --save-dev`
* To install Chai : `npm install chai --save-dev`
 
## To execute the tests

Define the scripts in package.json as follows :
```json
"scripts": {
    "test": "cucumber-js --parallel 1 -f json:report/report.json && node report.js && cat report/report.json | npx cucumber-junit > report/junitreport.xml"
  }
```
Finally execute the tests with `npm test`
Run specific feature with `npm test -- marsair.page.js`

### Create a fresh browser context for each test
```Javascript
Before(async() =>{
    global.context = await global.browser.newContext();
    global.page = await global.context.newPage();
});
```
### A sample Feature file
```gherkin
Scenario Outline: Login to the E-Shop Application with Wrong Password
    Given User launched eshop login page
    When User logged in eshop using the invalid emailid "<EmailID>" and the invalid password "<Password>"
    Then User should not get logged in

    Examples:
      | EmailID                    | Password  |
      | testuser_negative@shop.com | Testing$1 |
```
### A sample stepdefinition
```Javascript
When('User click on {string}', { timeout: 20000 }, async(string) =>{
    await marsAirPage.search(string);
});
```
### Example of how a Playwright code snippet looks
```Javascript
const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://marsair.recruiting.thoughtworks.net/NganNguyen');
  await page.screenshot({ path: 'page.png', fullPage: true });

  await browser.close();
})();
```
For more on Playwright click [here](https://playwright.dev/)