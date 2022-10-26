export default class Section {
   constructor(data, selector) {
      this.items = data.items;
      this._render = data.render
      this._selector = selector;
      this._container = document.querySelector(this._selector);
   }

   renderItems = () => {
      this.items.slice().reverse().forEach((item) => this._render(item));
   }
   
   addItem = (element) => {
      this._container.prepend(element);
   }
}