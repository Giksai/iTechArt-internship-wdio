const data ={
    auth_WrongPassword: `WRNGPass`,
    auth_WrongLogin: `WRNGlog`,
    auth_correctUsername: `FakeUser1389@gmail.com`,
    auth_correctPassword: `FakePassword`,

    sandbox_correctHeader: `Песочница`,
    sandbox_lastNews: `Итоги Hackby’13: 39 проектов за 24 часа`,

    commentDate: `25 сентября 2018`,
    commentSectionText: `Войдите, чтобы оставить комментарий`,

    employeesAmount: 500,
    maxemployeesAmount: 99999,
    firstCompanyName: `A1 (Унитарное предприятие "А1")`,

};

const errors = {
    auth_allEmpty: `Введите адрес электронной почты или имя пользователя.`,
    auth_emptyPassword: `Введите пароль.`,
    auth_emptyLogin: `Введите адрес электронной почты или имя пользователя.`,
    auth_wrongData: `Неверный логин или пароль.`,

};

const statValues = {
    companies: 1500,
    users: 110000,
    jobs: 400,

};

const checkBoxData = {
    CType_BigData: `Big Data`,
    CType_Ecommerce: `E-commerce`,
    City_Minsk: `Минск`,
}

module.exports = {
    errors: errors,
    data: data,
    statValues: statValues,
    checkBoxData: checkBoxData,

};