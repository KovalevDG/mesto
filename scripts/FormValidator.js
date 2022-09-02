class FormValidator {
   constructor(...conf) {
      this._conf = conf;
   }
   
   _isInputValid = (inputList) => {
      return inputList.some(inputElement => !inputElement.validity.valid);  
   }
    
   _toggleButtonState = (buttonElement, inputList) => {
      if (this._isInputValid(inputList)) {
         buttonElement.disabled = true;
      } else {
         buttonElement.disabled = false;
      }
   }
    
   _checkInputValid = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(formElement, inputElement);
      }
   }
    
   _showInputError = (formElement, inputElement, errorMessage) => {
      this._errorElement = formElement.querySelector(`#${inputElement.name}-error`);
      inputElement.classList.add(this._conf[0].inputErrorClass);
      this._errorElement.textContent = errorMessage;
      this._errorElement.classList.add(this._conf[0].errorClass);
   }
    
   _hideInputError = (formElement, inputElement) => {
      this._errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    
      inputElement.classList.remove(this._conf[0].inputErrorClass);
      this._errorElement.classList.remove(this._conf[0].errorClass);
      this._errorElement.textContent = '';
   }
      
   _setEventListeners = (formElement) => {
      this._inputList = Array.from(formElement.querySelectorAll(this._conf[0].inputSelector));

      this._buttonElement = formElement.querySelector(this._conf[0].submitButtonSelector);
    
      this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
            this._checkInputValid(formElement, inputElement);
            this._toggleButtonState(this._buttonElement, this._inputList);
         });
      });
      this._toggleButtonState(this._buttonElement, this._inputList);
   }      
    
   enableValidation() {
      this._formElement = this._conf[0].formSelector;
      this._formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
      this._setEventListeners(this._formElement);
   }
}