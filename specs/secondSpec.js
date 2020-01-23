const log4js = require('../loggerConfig/loggerConfigurator'),
    {mainPage} = require('../pages/mainPage'),
    {authPage} = require('../pages/authPage'),
    {articlePage} = require('../pages/articlePage'),
    {sandboxPage} = require('../pages/sandboxPage'),
    {data} = require('./specData');

const logger = log4js.getLogger('default');

describe('dev.by website',() => {
    afterEach(() => {
        browser.pause(1000);
    });
    afterAll(() => {
        browser.pause(3000);
    });
    beforeAll(() => {
        browser.maximizeWindow();
    });

    it(`'s sandbox page's title should be displaying ${data.sandbox_correctHeader} 
            and next page button should be active (1)`,
       () => {
        mainPage.open();
        mainPage.navigateToHeaderLink(mainPage.headerLinksTexts.sandbox);
        expect(sandboxPage.getHeader()).toEqual(data.sandbox_correctHeader);
        expect(sandboxPage.isNextPageActive()).toEqual(true);
    });

    it(`'s sandbox page should update news when user clicks on next page button and
            current page counter should update to second page (2)`,
       () => {
        let allNewsBefore = sandboxPage.getAllNews();
        let prevValue = sandboxPage.getLastNews();
        sandboxPage.nextPage();
        //Waiting until news are updated
        sandboxPage.waitForNewsUpdate(prevValue);
        let allNewsAfter = sandboxPage.getAllNews();
        expect(allNewsBefore).not.toEqual(allNewsAfter);
        expect(sandboxPage.getCurrentPage()).toEqual(2);
    });

    it(`'s sandbox page's next page button should not be active,
            current page should update to 71,
            last news should be ${data.sandbox_lastNews} (3)`,
       () => {
        let prevValue = sandboxPage.getLastNews();
        sandboxPage.goToLastPage();
        //Waiting until news are updated
        sandboxPage.waitForNewsUpdate(prevValue);
        expect(sandboxPage.isNextPageActive()).toEqual(false);
        expect(sandboxPage.getCurrentPage()).toEqual(71);
        expect(sandboxPage.getLastNews()).toContain(data.sandbox_lastNews);
    });

    it(`'s last news's header should be correct,
            there should be 1 comment (4)`,
       () => {
        let lastNewsHeader = sandboxPage.getLastNews();
        sandboxPage.goToLastNews();
        expect(lastNewsHeader).toContain(articlePage.getHeader());
        expect(articlePage.commentExists()).toEqual(true);
    });

    it(`'s last comment date should be ${data.commentDate},
            comment section should display text: ${data.commentSectionText} (5)`,
       () => {
        articlePage.clickOnElement(articlePage.selectors.commentBtn);
        expect(articlePage.getCommentDate()).toEqual(data.commentDate);
        expect(articlePage.getCommentSectionText()).toEqual(data.commentSectionText);
    });

    it(`'s should open login form (6)`,
       () => {
        articlePage.clickOnElement(articlePage.selectors.commentSection);
        expect(authPage.isAtAuthPage()).toEqual(true);
    });

  });