const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    headerStats: (type) => `//a[contains(@class, "header__main-info-item")][contains(text(), "${type}")]`,
    checkBoxes: (type) => `//div[@class="col"][1]/div[@class="${type}"]/ul/li`,
    employeesSlider: (type) => `//input[@id="${type}"]`,
    companyName: (index) => `//tbody/tr[${index}]/td[1]/a`,
    checkBoxState: `label`,
    checkBoxLabel: `label`,
    searchByParametersBtn: `//div[@class="t-search"]`,
    resetBtn: `//a[@class="a-reset-all a-cancel"]`,
    searchByParametersWindow: `//div[contains(@class, "widget-companies-fiter")]`,
    submitBtn: `//input[@class="btn blue b-srch-company"]`,
};
const headerStatTypes = {
    companies: `компани`,
    users: `пользовател`,
    jobs: `ваканси`,
};
const checkBoxType = {
    company: `field-type`,
    city: `field-city`,
};
const employeeSliderTypes = {
    max: `company_max_employees`,
    min: `company_min_employees`, 
};
const checkBoxOn = `active`;
const searchWindowOpen = 'active';

class CompaniesPage extends BasePage {
    headerStatTypes = headerStatTypes
    checkBoxType = checkBoxType

    getHeaderStatValue(type) {
        let stat = $(selectors.headerStats(type)).getText();
        logger.debug(`getHeaderStatValue: got text: ${stat} of stat type: ${type}.`);
        stat = getNumber(stat, type);
        logger.debug(`getHeaderStatValue: converted value to number: ${stat}.`);
        return stat;
    }

    searchByParameters() {
        logger.debug(`searchByParameters: opening window.`);
        super.clickOnElement(selectors.searchByParametersBtn);
    }

    getAllCheckboxesByType(type) {
        logger.debug(`getAllCheckboxesByType: getting all checkboxes by type: ${type}.`);
        let checkboxes = [];
        let count = 1;
        for(let element of $$(selectors.checkBoxes(type))) {
            let xpath = `//div[@class="col"][1]/div[@class="${type}"]/ul/li[${count}]`;
            let name = element.$(selectors.checkBoxLabel).getText();
            checkboxes.push(new CheckBox(xpath, name));
            count++;
        }
        logger.debug(`getAllCheckboxesByType: amount of found checkboxes: ${checkboxes.length}.`);
        logger.debug(`Found checkboxes: ${checkboxes}.`);
        return checkboxes;
    }

    setEmployeesAmount(min, max) {
        logger.debug(`setEmployeesAmount: setting max: ${max} and min: ${min} values of employees search.`);
        super.setAttributeOfElement(
            selectors.employeesSlider(employeeSliderTypes.max),
            'value',
            max);
        super.setAttributeOfElement(
            selectors.employeesSlider(employeeSliderTypes.min),
            'value',
            min);
    }

    resetAllParameters() {
        logger.debug(`resetAllParameters: resetting all parameters.`);
        super.clickOnElement(selectors.resetBtn);
    }

    waitForSearchWindowToAppear() {
        logger.debug(`waitForSearchWindowToAppear: waiting for search window to appear.`);
        browser.waitUntil(() => {
            this.searchByParameters();
            return $(selectors.searchByParametersWindow).getAttribute('class')
                .includes(searchWindowOpen);
          }, 10000, 'search window must open.');
    }

    waitForCompaniesToChange(prevValue) {
        browser.waitUntil(() => {
            return $(selectors.companyName(1)).getText() !== prevValue
          }, 10000, 'companies list must update');
    }

    getCompanyNameByIndex(index) {
        let companyName = $(selectors.companyName(index)).getText();
        logger.debug(`getCompanyNameByIndex: got company name: ${companyName}.`);
        return companyName;
    }

    submit() {
        logger.debug(`submit: saving changes.`);
        super.clickOnElement(selectors.submitBtn);
    }
};

class CheckBox {
    constructor(xpath, name) {
        this.xpath = xpath;
        this.name = name;
    }

    set() {
        logger.debug(`set: clicking on checkbox: ${this.name}`);
        $(this.xpath + '/span').click();
    }

    getState() {
        let state = $(this.xpath).$(selectors.checkBoxState).getAttribute('class')
            .includes(checkBoxOn);
        logger.debug(`getState: state of the ${this.name} checkbox: ${state}.`);
        return state;
    }
};

function getNumber(text, type) {
    return parseInt(text.replace(type, '').trim());
};

module.exports = {
    companiesPage: new CompaniesPage()
};