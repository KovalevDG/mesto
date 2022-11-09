import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor(selector, handleSubmit) {
      super(selector);
      this._handleSubmit = handleSubmit;
      this._popup = document.querySelector(this._selector);
      this._popupForm = this._popup.querySelector('.form');
      this._submitButton = this._popupForm.querySelector('.form__submit-button');
      this._textSubmitButton = this._submitButton.textContent;
   }

   renderLoading(isLoading, loadingText='Сохранение...') {
      if (isLoading) {
        this._submitButton.textContent = loadingText;
      } else {
        this._submitButton.textContent = this._submitBtnText;
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

   _getInputValues = () => {
      this._data = {};
      this._inputList = this._popup.querySelectorAll('.form__input');
      this._inputList.forEach((element) => {
         if (element.id == 'title') {
            element.id = 'name';
         }
         this._data[element.id] = element.value;
      });
      return this._data;
   }

   close = () => {
      super.close();
      this._popupForm.reset();
   }
} 