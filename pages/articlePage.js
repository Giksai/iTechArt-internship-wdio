const log4js = require('../loggerConfig/loggerConfigurator'),
    {BasePage} = require('./basePage');

const logger = log4js.getLogger('default');

const selectors = {
    header: `//h1[@class="article__title"]`,
    commentBtn: `//button/span[text()="1 комментарий"]`,
    commentDate: `//div[@class="comments__list"]/div/div/div/div/div/a`,
    commentSection: `//span[@class="comments__auth-button-inner"]`,

};

class ArticlePage extends BasePage {
    selectors = selectors
    
    getHeader() {
        let header = $(selectors.header).getText();
        logger.debug(`getHeader: got header text on the article page: ${header}.`);
        return header;
    }

    commentExists() {
        super.waitForElement(selectors.commentBtn, 10000);
        let exists = $(selectors.commentBtn).isExisting();
        logger.debug(`commentExists: comment exists: ${exists}.`);
        return exists;
    }

    getCommentDate() {
        let commentDate = $(selectors.commentDate).getText();
        logger.debug(`getCommentDate: got date of the comment: ${commentDate}.`);
        return commentDate;
    }

    getCommentSectionText() {
        let commentSText = $(selectors.commentSection).getText();
        logger.debug(`getCommentSectionText: got text of the comment section: ${commentSText}.`);
        return commentSText;
    }

};

module.exports = {
    articlePage: new ArticlePage()
};