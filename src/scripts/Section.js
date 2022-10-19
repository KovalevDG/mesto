export default class Section {
   constructor(data, selector) {
      this._items = data.items;
      this._render = data.render
      this._selector = selector;
      this._container = document.querySelector(this._selector);
   }

   render = () => {
      this._items.forEach((item) => this._render(item));
   }
   
   addItem = (element) => {
      this._container.prepend(element);
   }
}