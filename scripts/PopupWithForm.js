import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";

export default class PopupWithForm extends Popup {
   constructor(selector, submitPopup) {
      super(selector);
      this._submitPopup = submitPopup;
      this._popup = document.querySelector(this._selector);
      console.log(this._popup);
   }

   _getInputValues() {
      this._inputList = this._popup.querySelectorAll('.form__input');
      this._inputList.forEach((element) => {
         console.log(element.value);
      });
   }
} 