export default class FormValidator {
   constructor(config, selector) {
      this._config = config;
      this._selector = selector;
   }
   
   _hasInvalidInput = () => {
      return this._inputList.some(inputElement => !inputElement.validity.valid);  
   }
    
   toggleButtonState = () => {
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
      this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
      inputElement.classList.add(this._config.inputErrorClass);
      this._errorElement.textContent = inputElement.validationMessage;
      this._errorElement.classList.add(this._config.errorClass);
   }
    
   _hideInputError = (inputElement) => {
      this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    
      inputElement.classList.remove(this._config.inputErrorClass);
      this._errorElement.classList.remove(this._config.errorClass);
      this._errorElement.textContent = '';
   }
      
   _setEventListeners = () => {
      this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
      this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    
      this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            this._checkInputValid(inputElement);
            this.toggleButtonState();
         });
      });
      this.toggleButtonState();
   }   
    
   enableValidation() {
      this._formElement = document.forms[this._selector];
      this._setEventListeners(this._formElement);
   }
}