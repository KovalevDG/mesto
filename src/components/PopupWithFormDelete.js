import Popup from "./Popup.js";

export default class PopupWithFormDelete extends Popup {
   constructor() {
   }
   open = (data) => {
      super.open();
      this._popupTitle.textContent = data.name;
      this._popupImage.src = data.link;
      this._popupImage.alt = data.name;
   }
} 