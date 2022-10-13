import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
   constructor(selector, submitPopup) {
      super(selector);
      this._submitPopup = submitPopup;
      this._popup = document.querySelector(this._selector);
   }

   _setSubmitPopup = (evt) => {
      evt.preventDefault();
      this._submitPopup(evt);
   }

   setEventListeners = () => {
      super.setEventListeners;
      this._popupButtonClose = this._popup.querySelector('.popup__button-close');
      this._popupButtonClose.addEventListener('click', this.close);
      this._popupForm = this._popup.querySelector('.form');
      this._popupForm.addEventListener('submit', this._setSubmitPopup);
   }

   _getInputValues = () => {
      this._inputList = this._popup.querySelectorAll('.form__input');
      this._inputList.forEach((element) => {
         // console.log(element);
      });
   }

   close = () => {
      this._formElement = this._popup.querySelector('.form');
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      this._formElement.reset();
   }
} 