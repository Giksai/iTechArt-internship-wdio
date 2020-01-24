const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    headerLink: (linkName) => `//div[@class="header-nav__item"]/a[text()="${linkName}"]`,
};
const sections = {
    authentication: `//div[@class="header__auth"]/div/a`,
    profile: `//div[@class="header__auth"]/a[@class="header__auth-image-wrapper"]`,
};
const headerLinksTexts = {
    sandbox: 'Песочница',
    companies: 'Компании',
};
const adress = 'dev.by';

class MainPage extends BasePage {
    sections = sections
    headerLinksTexts = headerLinksTexts

    /**
     * Navigates to the different sections of the main page.
     * Example: Authentication page
     * @param {Object} section 
     */
    goTo(section) {
        logger.debug(`goTo: navigating to: ${section}.`);
        super.clickOnElement(section);
    }

    navigateToHeaderLink(linkText) {
        logger.debug(`navigateToHeaderLink: going to: ${linkText}.`);
        super.clickOnElement(selectors.headerLink(linkText));
    }

    hasLoggedIn() {
        super.waitForElement(sections.profile);
        let hasLoggedIn = $(sections.profile).isExisting();
        logger.debug(`hasLoggedIn: has been logged in: ${hasLoggedIn}.`);
        return hasLoggedIn;
    }

    open() {
        logger.debug(`open: opening ${adress}.`);
        super.open(adress);
    }
};

module.exports = {
    mainPage: new MainPage()
};