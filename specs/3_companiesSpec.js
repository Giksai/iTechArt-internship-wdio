const {mainPage} = require('../pages/mainPage'),
    {companiesPage} = require('../pages/companiesPage'),
    {statValues, checkBoxData} = require('./specData');

let employeesAmount = 500,
    maxemployeesAmount = 99999,
    firstCompanyName = `A1 (Унитарное предприятие "А1")`;

let companiesCheckBoxes;
let citiesCheckBoxes;

describe(`dev.by website's companies page check.`,() => {
    beforeAll(() => {
        browser.maximizeWindow();
    });

    it(` Companies page's stats should contain 
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

    it(` Companies page's checkboxes should be checked (2)`,
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

    it(` Companies page's checkboxes should not be checked (3)`,
       () => {
            companiesPage.resetAllParameters();
            for(let checkBox of companiesCheckBoxes.concat(citiesCheckBoxes)) {
                expect(checkBox.getState()).toEqual(false);
            } 
    });

    it(` Companies page's search results should contain ${firstCompanyName} as the first result (4)`,
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
            companiesPage.setEmployeesAmount(employeesAmount, maxemployeesAmount);
            let prevValue = companiesPage.getCompanyNameByIndex(1);
            companiesPage.submit();
            companiesPage.waitForCompaniesToChange(prevValue);
            expect(companiesPage.getCompanyNameByIndex(1)).toEqual(firstCompanyName);
    });

  });