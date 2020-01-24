const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    submitBtn: `//button[@type="submit"]`,
    authCheck: `//div[@class="auth-page"]`,
    authBoxes: (type) => `//input[@name="${type}"]`,
};
const types = {
    login: `email`,
    password: `password`,
};

class AuthPage extends BasePage {
    types = types

    isSubmitBtnActive() {
        let isActive = !($(selectors.submitBtn).getAttribute('class').includes('button_disabled'));
        logger.debug(`isSubmitBtnActive: is auth button active: ${isActive}.`);
        return isActive;
    }

    authenticate() {
        logger.debug(`authenticate: trying to authenticate.`);
        super.clickOnElement(selectors.submitBtn);
    }

    enterAuthInfo(type, text) {
        logger.debug(`enterAuthInfo: entering ${text} into ${type} box.`);
        super.enterText(selectors.authBoxes(type), text);
    }

    clearField(type) {
        logger.debug(`clearField: clearing field: ${type}.`);
        $(selectors.authBoxes(type)).click();
        browser.keys(['Control', 'a']);
        browser.keys('Delete');
    }

    isAtAuthPage() {
        let isAtAuth = $(selectors.authCheck).isExisting();
        logger.debug(`isAtAuthPage: at auth page: ${isAtAuth}.`);
        return isAtAuth;
    }
};

module.exports = {
    authPage: new AuthPage()
};