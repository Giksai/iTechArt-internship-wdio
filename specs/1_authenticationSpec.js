const {mainPage} = require('../pages/mainPage'),
    {authPage} = require('../pages/authPage'),
    {profilePage} = require('../pages/profilePage'),
    {errors} = require('./specData');

let auth_correctPassword = `FakePassword`,
    auth_WrongPassword = `WRNGPass`,
    auth_WrongLogin = `WRNGlog`,
    auth_correctUsername = `FakeUser1389@gmail.com`;

function authenticateAndWaitForErrors() {
    let prevErrors = authPage.getAllErrors();
    authPage.authenticate();
    authPage.waitForErrorsToUpdate(prevErrors);
};

describe(`dev.by website's authentication check.`,() => {
    
    it(` Auth page's auth button should not be active when no data has been entered (1)`,
       () => {
            mainPage.open();
            mainPage.goTo(mainPage.sections.authentication);
            expect(authPage.isSubmitBtnActive()).toEqual(false);
    });

    it(` Auth page should display error message: ${errors.auth_allEmpty} 
            when entering empty username and password (2)`, 
        () => {
            authPage.authenticate();
            expect(authPage.getAllErrors()).toContain(errors.auth_allEmpty);
    });

    it(` Auth page's auth button should not be active when password has not been entered (3)`, 
        () => {
            authPage.enterAuthInfo(authPage.types.login, auth_WrongLogin);
            expect(authPage.isSubmitBtnActive()).toEqual(false);
    });

    it(` Auth page should display error message: ${errors.auth_emptyPassword} 
            when entering username without password (4)`, 
        () => {
            authenticateAndWaitForErrors();
            expect(authPage.getAllErrors()).toContain(errors.auth_emptyPassword);
    });

    it(` Auth page's auth button should not be active when username has not been entered (5)`, 
        () => {
            authPage.clearField(authPage.types.login);
            authPage.enterAuthInfo(authPage.types.password, auth_WrongPassword);
            expect(authPage.isSubmitBtnActive()).toEqual(false);
    });

    it(` Auth page should display error message: ${errors.auth_emptyLogin} 
            when entering password without username (6)`, 
        () => {
            authenticateAndWaitForErrors();
            expect(authPage.getAllErrors()).toContain(errors.auth_emptyLogin);
    });

    it(` Auth page's auth button should be active (7)`, 
        () => {
            authPage.enterAuthInfo(authPage.types.login, auth_WrongLogin);
            expect(authPage.isSubmitBtnActive()).toEqual(true);
    });

    it(` Auth page should display error message: ${errors.auth_wrongData} 
            when entering incorrect username and password (8)`, 
        () => {
            authenticateAndWaitForErrors();
            expect(authPage.getAllErrors()).toContain(errors.auth_wrongData);
    });

    it(` Auth page should authorize user (9)`, 
        () => {
            authPage.enterAuthInfo(authPage.types.login, auth_correctUsername);
            authPage.enterAuthInfo(authPage.types.password, auth_correctPassword);
            authPage.authenticate();
            expect(mainPage.hasLoggedIn()).toEqual(true);
            //Logging out
            mainPage.goTo(mainPage.sections.profile);
            profilePage.navigate(profilePage.navigationTypes.logout);
    });

  });