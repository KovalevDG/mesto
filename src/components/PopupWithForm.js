import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor(selector, handleSubmit) {
      super(selector);
      this._handleSubmit = handleSubmit;
      this._popupForm = this._popup.querySelector('.form');
      this._submitButton = this._popupForm.querySelector('.form__submit-button');
      this._textSubmitButton = this._submitButton.textContent;
      this._inputList = this._popup.querySelectorAll('.form__input');
   }

   renderLoading(isLoading, loadingText='Сохранение...') {
      if (isLoading) {
        this._submitButton.textContent = loadingText;
      } else {
        this._submitButton.textContent = this._textSubmitButton;
      }
    }

   _setSubmitPopup = (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
   }

   setEventListeners = () => {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', (evt) => {
         evt.preventDefault();
         this.renderLoading(true);
         this._handleSubmit(this._getInputValues())
            .then(() => this.close())
            .finally(() => {
               this.renderLoading(false);
            })
      });
   }

   setInputValues = (data) => {
      this._inputList.forEach((input) => {
        input.value = data[input.name];
      });
    }

   _getInputValues = () => {
      this._data = {};
      this._inputList.forEach((element) => {
         this._data[element.name] = element.value;
      });
      return this._data;
   }

   close = () => {
      super.close();
      this._popupForm.reset();
   }
} 