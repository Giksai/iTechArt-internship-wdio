const log4js = require('../loggerConfig/loggerConfigurator'),
    {mainPage} = require('../pages/mainPage'),
    {authPage} = require('../pages/authPage'),
    {profilePage} = require('../pages/profilePage'),
    {data, errors} = require('./specData');

const logger = log4js.getLogger('default');

describe('dev.by website',() => {
    afterEach(() => {
        browser.pause(1000);
    });
    afterAll(() => {
        browser.pause(3000);
    });

    it(`'s auth page's auth button should not be active when no data has been entered (1)`,
       () => {
            mainPage.open();
            mainPage.goTo(mainPage.sections.authentication);
            expect(authPage.isSubmitBtnActive()).toEqual(false);
    });

    it(`'s auth page should display error message: ${errors.auth_allEmpty} 
            when entering empty username and password (2)`, 
        () => {
            authPage.authenticate();
            expect(authPage.getAllErrors()).toContain(errors.auth_allEmpty);
    });

    it(`'s auth page's auth button should not be active when password has not been entered (3)`, 
        () => {
            authPage.enterAuthInfo(authPage.types.login, data.auth_WrongLogin);
            expect(authPage.isSubmitBtnActive()).toEqual(false);
    });

    it(`'s auth page should display error message: ${errors.auth_emptyPassword} 
            when entering username without password (4)`, 
        () => {
            authPage.authenticate();
            expect(authPage.getAllErrors()).toContain(errors.auth_emptyPassword);
    });

    it(`'s auth page's auth button should not be active when username has not been entered (5)`, 
        () => {
            
            authPage.enterAuthInfo(authPage.types.password, data.auth_WrongPassword);
            authPage.clearField(authPage.types.login);
            //authPage.enterAuthInfo(authPage.types.login, '');
            expect(authPage.isSubmitBtnActive()).toEqual(false);
    });

    it(`'s auth page should display error message: ${errors.auth_emptyLogin} 
            when entering password without username (6)`, 
        () => {
            authPage.authenticate();
            expect(authPage.getAllErrors()).toContain(errors.auth_emptyLogin);
    });

    it(`'s auth page's auth button should be active (7)`, 
        () => {
            authPage.enterAuthInfo(authPage.types.login, data.auth_WrongLogin);
            expect(authPage.isSubmitBtnActive()).toEqual(true);
    });

    it(`'s auth page should display error message: ${errors.auth_wrongData} 
            when entering incorrect username and password (8)`, 
        () => {
            authPage.authenticate();
            expect(authPage.getAllErrors()).toContain(errors.auth_wrongData);
    });

    it(` should authorize user (9)`, 
        () => {
            authPage.enterAuthInfo(authPage.types.login, data.auth_correctUsername);
            authPage.enterAuthInfo(authPage.types.password, data.auth_correctPassword);
            authPage.authenticate();
            expect(mainPage.hasLoggedIn()).toEqual(true);
            //Logging out
            mainPage.goTo(mainPage.sections.profile);
            profilePage.navigate(profilePage.navigationTypes.logout);
    });

  });