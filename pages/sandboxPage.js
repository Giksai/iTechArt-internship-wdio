const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    header: `//div[@class]/h1`,
    nextPageBtn: `//ul[@class="paginator__list"]/li[contains(@class, "paginator__next-container")]`,
    newsNames: `//div[@class="article-preview__info"]/a/h3`,
    lastNews: `//ul[@class="article-preview-list__list"]/li[last()]/div/div/a/h3`,
    currentPage: `//ul[@class="paginator__list"]/li[contains(@class, "item_active")]/a`,
    lastPageBtn: `//li[@class="paginator__list-item"]/a[text()="71"]`,

};

class SandboxPage extends BasePage {

    getHeader() {
        let header = $(selectors.header).getText();
        logger.debug(`getHeader: header: ${header}.`);
        return header;
    }

    nextPage() {
        logger.debug(`nextPage: advancing to the next page.`);
        super.clickOnElement(selectors.nextPageBtn);
    }

    isNextPageActive() {
        let isActive = !($(selectors.nextPageBtn).getAttribute('class').includes('is-disabled'));
        logger.debug(`isNextPageActive: is next page btn active: ${isActive}.`);
        return isActive;
    }

    getAllNews() {
        let allNews = super.getTextOfElements(selectors.newsNames);
        logger.debug(`getAllNews: got all news: ${allNews}.`);
        return allNews;
    }
    getLastNews() {
        let newsText = $(selectors.lastNews).getText();
        logger.debug(`getFirstNews: first news text is: ${newsText}.`);
        return newsText;
    }
    goToLastNews() {
        logger.debug(`goToLastNews: going to the last article.`);
        super.clickOnElement(selectors.lastNews);
    }

    getCurrentPage() {
        let currentPage = parseInt($(selectors.currentPage).getText());
        logger.debug(`getCurrentPage: current page is ${currentPage}.`);
        return currentPage;
    }

    goToLastPage() {
        logger.debug(`goToLastPage: going to the last page.`);
        super.clickOnElement(selectors.lastPageBtn);
    }

};

module.exports = {
    sandboxPage: new SandboxPage()
};