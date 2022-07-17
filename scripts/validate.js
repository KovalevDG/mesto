function isValid (formElement, inputElement, conf) {
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
  inputElement.classList.remove(conf.errorClass);
  inputElement.textContent = '';
}

function setEventListeners (formElement, conf) {
  const inputList = Array.from(formElement.querySelectorAll(conf.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, conf);
    });
  });
}

function enableValidation(conf) {
  const formList = Array.from(document.querySelectorAll(conf.formSelector));

  formList.forEach((formElement) => {
    console.log(formElement);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, conf);
  });
}; 