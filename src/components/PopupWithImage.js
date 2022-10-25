import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
   constructor(selector) {
      super(selector);
      this._popupTitle = this._popup.querySelector('.popup-image__title');
      this._popupImage = this._popup.querySelector('.popup-image__image');
   }
   open = (data) => {
      super.open();
      this._popupTitle.textContent = data.name;
      this._popupImage.src = data.link;
      this._popupImage.alt = data.name;
   }
} 