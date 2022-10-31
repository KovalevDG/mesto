import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor(selector, handleSubmit) {
      super(selector);
      this._handleSubmit = handleSubmit;
      this._popup = document.querySelector(this._selector);
      this._popupForm = this._popup.querySelector('.form');
      this._submitButton = this._popupForm.querySelector('.form__submit-button');
   }

   _setSubmitPopup = (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
   }

   setEventListeners = () => {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', this._setSubmitPopup);
      // this._popupForm.addEventListener('submit', (evt) => {
      //    evt.preventDefault();
      //    const textSubmitButton = this._submitButton.textContent;
      //    this._submitButton.textContent = 'Сохранение...';
      //    this._handleSubmit(this._getInputValues())
      //       .then(() => this.close())
      //       .finality(() => {
      //          this._submitButton.textContent = textSubmitButton;
      //       });
      // });
   }

   _getInputValues = () => {
      this._data = {};
      this._inputList = this._popup.querySelectorAll('.form__input');
      this._inputList.forEach((element) => {
         this._data[element.id] = element.value;
      });
      return this._data;
   }

   close = () => {
      super.close();
      this._popupForm.reset();
   }
} 