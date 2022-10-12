export default class FormValidator {
   constructor(conf) {
      this._conf = conf;
   }
   
   _isInputValid = (inputList) => {
      return inputList.some(inputElement => !inputElement.validity.valid);  
   }
    
   toggleButtonState = () => {
      if (this._isInputValid(this._inputList)) {
         this._buttonElement.disabled = true;
      } else {
         this._buttonElement.disabled = false;
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
      inputElement.classList.add(this._conf.inputErrorClass);
      this._errorElement.textContent = errorMessage;
      this._errorElement.classList.add(this._conf.errorClass);
   }
    
   _hideInputError = (formElement, inputElement) => {
      this._errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    
      inputElement.classList.remove(this._conf.inputErrorClass);
      this._errorElement.classList.remove(this._conf.errorClass);
      this._errorElement.textContent = '';
   }
      
   _setEventListeners = (formElement) => {
      this._inputList = Array.from(formElement.querySelectorAll(this._conf.inputSelector));
      this._buttonElement = formElement.querySelector(this._conf.submitButtonSelector);
    
      this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
            this._checkInputValid(formElement, inputElement);
            this.toggleButtonState();
         });
      });
      this.toggleButtonState();
   }   
   
   // setSubmitEventListeners = (evt) => {
   //    evt.preventDefault();
   //    console.log('Validator', evt);
   // }
    
   enableValidation() {
      this._formElement = this._conf.formSelector;
      // this._formElement.addEventListener('submit', this._setSubmitEventListeners);
      // console.log(this._formElement);
      this._setEventListeners(this._formElement);
   }
}