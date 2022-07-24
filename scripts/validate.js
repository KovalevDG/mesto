function isInputValid(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);  
}

function toggleButtonState(buttonElement, inputList) {
  if (isInputValid(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function checkInputValid(formElement, inputElement, conf) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, conf);
  } else {
    hideInputError(formElement, inputElement, conf);
  }
}

function showInputError (formElement, inputElement, errorMessage, conf) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  inputElement.classList.add(conf.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(conf.errorClass);
}

function hideInputError (formElement, inputElement, conf) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  inputElement.classList.remove(conf.inputErrorClass);
  errorElement.classList.remove(conf.errorClass);
  errorElement.textContent = '';
}

function setEventListeners (formElement, conf) {
  const inputList = Array.from(formElement.querySelectorAll(conf.inputSelector));

  const buttonElement = formElement.querySelector(conf.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValid(formElement, inputElement, conf);
      toggleButtonState(buttonElement, inputList);
    });
  });
  toggleButtonState(buttonElement, inputList);
}

function enableValidation(conf) {
  const formList = Array.from(document.querySelectorAll(conf.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, conf);
  });
}; 