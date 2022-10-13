import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
   constructor(title, link, selector) {
      super(selector);
      this._title = title;
      this._link = link;
   }
   open = () => {
      this._popup = document.querySelector(this._selector);
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
      this._popupTitle = this._popup.querySelector('.popup-image__title');
      this._popupImage = this._popup.querySelector('.popup-image__image');
      this._popupTitle.textContent = this._title;
      this._popupImage.src = this._link;
   }
} 