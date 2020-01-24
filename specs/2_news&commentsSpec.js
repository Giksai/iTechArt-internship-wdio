const {mainPage} = require('../pages/mainPage'),
    {authPage} = require('../pages/authPage'),
    {articlePage} = require('../pages/articlePage'),
    {sandboxPage} = require('../pages/sandboxPage');

let commentSectionText = `Войдите, чтобы оставить комментарий`,
    commentDate = `25 сентября 2018`,
    sandbox_lastNews = `Итоги Hackby’13: 39 проектов за 24 часа`,
    sandbox_correctHeader = `Песочница`;

describe(`dev.by website's news and comments check.`,() => {
    beforeAll(() => {
        browser.maximizeWindow();
    });

    it(` Sandbox page's title should be displaying ${sandbox_correctHeader} 
            and next page button should be active (1)`,
       () => {
        mainPage.open();
        mainPage.navigateToHeaderLink(mainPage.headerLinksTexts.sandbox);
        expect(sandboxPage.getHeader()).toEqual(sandbox_correctHeader);
        expect(sandboxPage.isNextPageActive()).toEqual(true);
    });

    it(` Sandbox page should update news when user clicks on next page button and
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

    it(` Sandbox page's next page button should not be active,
            current page should update to 71,
            last news should be ${sandbox_lastNews} (3)`,
       () => {
        let prevValue = sandboxPage.getLastNews();
        sandboxPage.goToLastPage();
        //Waiting until news are updated
        sandboxPage.waitForNewsUpdate(prevValue);
        expect(sandboxPage.isNextPageActive()).toEqual(false);
        expect(sandboxPage.getCurrentPage()).toEqual(71);
        expect(sandboxPage.getLastNews()).toContain(sandbox_lastNews);
    });

    it(` Last news's header should be correct,
            there should be 1 comment (4)`,
       () => {
        let lastNewsHeader = sandboxPage.getLastNews();
        sandboxPage.goToLastNews();
        expect(lastNewsHeader).toContain(articlePage.getHeader());
        expect(articlePage.commentExists()).toEqual(true);
    });

    it(` Last comment date should be ${commentDate},
            comment section should display text: ${commentSectionText} (5)`,
       () => {
        articlePage.clickOnElement(articlePage.selectors.commentBtn);
        expect(articlePage.getCommentDate()).toEqual(commentDate);
        expect(articlePage.getCommentSectionText()).toEqual(commentSectionText);
    });

    it(` News page click on comment section should open login form (6)`,
       () => {
        browser.waitUntil(() => {
            articlePage.clickOnElement(articlePage.selectors.commentSection);
            return authPage.isAtAuthPage();
          }, 5000, `click on comment section must lead to auth page.`);
        expect(authPage.isAtAuthPage()).toEqual(true);
    });

  });