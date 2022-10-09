import Card from './Card.js';

export default class Section {
   constructor({ items, renderer }, selector) {
      this._items = items;
      this._renderer = renderer;
      this._selector = selector;
   }

//    initialCards.forEach(function (item) {
//       elements.prepend(addCard(item, showPopupImage));
//   });
   
   renderElements() {
      this._items.forEach((item) => {
         this._renderer(item)
      });
   }
   
   addItem(element) {
      this._elements = document.querySelector(selector);
      this._elements.prepend(element);
   }
}