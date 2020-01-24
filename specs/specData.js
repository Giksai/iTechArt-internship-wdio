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
};

module.exports = {
    errors: errors,
    statValues: statValues,
    checkBoxData: checkBoxData,
};