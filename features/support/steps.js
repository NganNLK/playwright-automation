const {Given, When, Then} = require ('@cucumber/cucumber');
const {MarsAirPage} = require('../../page_object/marsair.page')
const marsAirPage = new MarsAirPage();

Given('User go to MarsAir page', { timeout: 20000 },  async()=>{
    await marsAirPage.navigate();
 });

When('User select {string} for departing value', { timeout: 20000 }, async(month) =>{
    await marsAirPage.departing(month);
});

When('User select {string} for returning value', { timeout: 20000 }, async(month) =>{
    await marsAirPage.returning(month);
});

When('User click on {string}', { timeout: 20000 }, async(string) =>{
    await marsAirPage.search(string);
});

Then('User should able to see {string}', { timeout: 20000 }, async(string) =>{
    await marsAirPage.informationContent(string);
});

Then('Departing value and returning value should be {string}', { timeout: 20000 }, async(string) =>{
    await marsAirPage.defaultValue(string);
});

Then('Promotional code is empty', { timeout: 20000 }, async() =>{
    await marsAirPage.emptyCode();
});

When('User enter a valid promotional code', { timeout: 20000 }, async()=>{
    await marsAirPage.validPromotionalCode();
});
