const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    navigationBtn: (type) => {
        return `//a[@class="navigation__link" and text()="${type}"]`;
    },
};

const navigationTypes = {
    logout: `Выйти`,
}

class ProfilePage extends BasePage {
    navigationTypes = navigationTypes

    navigate(type) {
        logger.debug(`navigate: navigating from profile page to ${type}.`);
        super.clickOnElement(selectors.navigationBtn(type));
    }
    
};

module.exports = {
    profilePage: new ProfilePage()
};