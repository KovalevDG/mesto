export default class FormValidator {
   constructor(config, form) {
      this._config = config;
      this._form = form;
   }
   
   _hasInvalidInput = () => {
      return this._inputList.some(inputElement => !inputElement.validity.valid);  
   }
    
   _toggleButtonState = () => {
      if (this._hasInvalidInput()) {
         this._buttonElement.disabled = true;
      } else {
         this._buttonElement.disabled = false;
      }
   }
    
   _checkInputValid = (inputElement) => {
      if (!inputElement.validity.valid) {
         this._showInputError(inputElement);
      } else {
         this._hideInputError(inputElement);
      }
   }
    
   _showInputError = (inputElement) => {
      this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._config.inputErrorClass);
      this._errorElement.textContent = inputElement.validationMessage;
      this._errorElement.classList.add(this._config.errorClass);
   }
    
   _hideInputError = (inputElement) => {
      this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    
      inputElement.classList.remove(this._config.inputErrorClass);
      this._errorElement.classList.remove(this._config.errorClass);
      this._errorElement.textContent = '';
   }
      
   _setEventListeners = () => {
      this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
      this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    
      this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            this._checkInputValid(inputElement);
            this._toggleButtonState();
         });
      });
      this._toggleButtonState();
   }   

   resetValidation() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
         this._hideInputError(inputElement);
      });

    }
    
   enableValidation() {
      this._setEventListeners();
   }
}