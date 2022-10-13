import Card from './Card.js';

export default class Section {
   constructor(data, selector) {
      this._data = data;
      this._selector = selector;
   }

   render = () => {
      this._data.items.forEach((item) => this._data.render(item));
   }
   
   addItem = (card) => {
      this._elements = document.querySelector(this._selector);
      this._elements.prepend(card);
   }
}