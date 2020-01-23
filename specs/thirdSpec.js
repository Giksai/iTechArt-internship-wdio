const log4js = require('../loggerConfig/loggerConfigurator'),
    {mainPage} = require('../pages/mainPage'),
    {companiesPage} = require('../pages/companiesPage'),
    {data, statValues, checkBoxData} = require('./specData');

const logger = log4js.getLogger('default');

let companiesCheckBoxes;
let citiesCheckBoxes;

describe('dev.by website',() => {
    afterAll(() => {
        browser.saveScreenshot(`screenshots/${Date.now()}.png`);
        logger.trace(`Third test has ended.`);
    });
    beforeAll(() => {
        browser.maximizeWindow();
        logger.trace(`Third test has started.`);
    });

    it(`'s company page's stats should contain 
            ${statValues.companies} companies,
            ${statValues.users} users,
            ${statValues.jobs} jobs (1)`,
       () => {
            mainPage.open();
            mainPage.navigateToHeaderLink(mainPage.headerLinksTexts.companies);
            expect(companiesPage.getHeaderStatValue(companiesPage.headerStatTypes.companies))
                .toBeGreaterThan(statValues.companies);
            expect(companiesPage.getHeaderStatValue(companiesPage.headerStatTypes.users))
                .toBeGreaterThan(statValues.users);
            expect(companiesPage.getHeaderStatValue(companiesPage.headerStatTypes.jobs))
                .toBeGreaterThan(statValues.jobs);
    });

    it(`'s companies page's checkboxes should be checked (2)`,
       () => {
           companiesPage.waitForSearchWindowToAppear();
            companiesCheckBoxes = companiesPage.getAllCheckboxesByType(
                    companiesPage.checkBoxType.company);
            citiesCheckBoxes = companiesPage.getAllCheckboxesByType(
                    companiesPage.checkBoxType.city);
            for(let checkBox of companiesCheckBoxes.concat(citiesCheckBoxes)) {
                expect(checkBox.getState()).toEqual(true);
            }  
    });

    it(`'s companies page's checkboxes should not be checked (3)`,
       () => {
            companiesPage.resetAllParameters();
            for(let checkBox of companiesCheckBoxes.concat(citiesCheckBoxes)) {
                expect(checkBox.getState()).toEqual(false);
            } 
    });

    it(`'s companies page's search results should contain ${data.firstCompanyName} as the first result (4)`,
       () => {
            for(let checkBox of companiesCheckBoxes) {
                if(checkBox.name === checkBoxData.CType_BigData
                    || checkBox.name === checkBoxData.CType_Ecommerce)
                        checkBox.set();
            } 
            for(let checkBox of citiesCheckBoxes) {
                if(checkBox.name === checkBoxData.City_Minsk)
                    checkBox.set();
            }
            companiesPage.setEmployeesAmount(data.employeesAmount, data.maxemployeesAmount);
            let prevValue = companiesPage.getCompanyNameByIndex(1);
            companiesPage.submit();
            companiesPage.waitForCompaniesToChange(prevValue);
            expect(companiesPage.getCompanyNameByIndex(1)).toEqual(data.firstCompanyName);
    });

  });