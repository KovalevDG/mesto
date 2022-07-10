const hideInputElement = (inputElement) => {
    const messageElementError = document.querySelector(`#${inputElement.id}-error`);
    messageElementError.textContent = '';
}

const showInputError = (inputElement) => {
    const messageElementError = document.querySelector(`#${inputElement.id}-error`);
    messageElementError.textContent = inputElement.validationMessage;
}

const checkValidInput = (inputElement) => {
    //проверить валидность ввода input
    console.log(inputElement.validity.valid);
    if (inputElement.validity.valid) {
        hideInputElement(inputElement);
    } else {
        showInputError(inputElement);
    }
    //если данные валидные, скрыть ошибку, в пративном случаии показать ошибку
};

const setEventListeners = (formElement) => {
    //найти все поля input
    const inputList = Array.from(formElement.querySelectorAll('input'));
    //добавить слушатели на input
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidInput(inputElement);
        });
    });
};

const enableValidation = (config) => {
    //найти все формы на страницы
    const formList = Array.from(document.querySelectorAll('form'));
    //включить валидацию для каждой формы. Установить слушетели.
    formList.forEach(formElement => {
        setEventListeners(formElement);
    });
};