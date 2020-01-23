const log4js = require('../loggerConfig/loggerConfigurator');

const logger = log4js.getLogger('default');

const selectors = {
    errorBox: `//span[@class="message message_error"]`,
    submitBtn: `//input[@type="submit"]`,

};

class BasePage {

    open(uri) {
        logger.debug(`open: opening page: ${uri}.`);
        browser.url(uri);
    }

    setAttributeOfElement(xpath, attribute, value) {
        let script = 
            `document.evaluate('${xpath}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.setAttribute("${attribute}", "${value}");`;
        browser.executeScript(script, []);
    }

    getTextOfElements(selector, textConversionMethod) {
        logger.debug(`getTextOfElements: Trying to get text of elements with selector: (${selector}), 
        using converter function: (${textConversionMethod ? 'true' : 'false'}).`);
        let foundElements = [];
        let allElements = $$(selector);
        logger.debug(`getTextOfElements: Amount of found elements: ${allElements.length}`);
            for(let elem of allElements) {
                    if(textConversionMethod) {
                        foundElements.push(textConversionMethod(elem.getText()));
                    } else {
                        foundElements.push(elem.getText());
                    }
            }

        logger.debug(`getTextOfElements: Found elements's texts: (${foundElements}).`);
        return foundElements;
    }

    enterText(selector, text) {
        logger.debug(`enterText: trying to enter text: ${text} in a form: ${selector}.`);
        $(selector).setValue(text);
    }
    clearText(selector) {
        logger.debug(`clearText: clearing text of element: ${selector}.`);
        $(selector).clearValue();
    }

    waitForElement(selector, waitingTime = 20000) {
        logger.debug(`waitForElement: waiting: ${waitingTime} for element: ${selector} to appear.`);
        const elementToWaitFor = $(selector);
        elementToWaitFor.waitForDisplayed(waitingTime);
    }

    waitForErrorsToUpdate(prevValue, updateTime = 10000) {
        browser.waitUntil(() => {
            return this.getAllErrors() !== prevValue
          }, updateTime, `errors must update.`);
    }

    waitForElementToUpdate(element, prevValue, updateTime = 20000) {
        browser.waitUntil(() => {
            return $(element).getText() !== prevValue
          }, updateTime, `element ${element} must update`);
    }

    getAllErrors(prevValue = null) {
        logger.debug(`getAllErrors: trying to get all errors from current page.`);
        if(prevValue)
            this.waitForElementToUpdate(selectors.errorBox, prevValue);
        let allText;
        let allErrorsText = this.getTextOfElements(selectors.errorBox);
        for(let error of allErrorsText) {
            allText += error + ' ';
        }
        logger.debug(`getAllErrors: got errors: ${allText}.`);
        return allText;
    }

    clickOnElement(selector) {
        logger.debug(`clickOnElement: Trying to click on element: (${selector}).`);
        $(selector).click();
    }

};

module.exports = {
    BasePage: BasePage
};