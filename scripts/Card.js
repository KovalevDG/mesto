export default class Card {
   static _template = document.querySelector('#card').content;
   constructor(data, handleCardClick) {
      this._data = data;
      this._handleCardClick = handleCardClick;
      console.log(this._data)
   }

   _showImage = () => {
      this._handleCardClick(this._data[0], this._data[1]);
   }

   _putLike = (evt) => {
      evt.target.classList.toggle('element_like-active');
   }

   _deleteCard = () => {
      this._element.remove();
   }

   _setEventListeners = () => {
      this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard);
      this._elementImage.addEventListener('click', this._showImage);
      this._element.querySelector('.element__like').addEventListener('click', this._putLike);
   }

   createCard = () => {
      this._element = Card._template.cloneNode(true).children[0];
      this._element.querySelector('.element__text').textContent = this._data.name;
      this._elementImage = this._element.querySelector('.element__image');
      this._elementImage.src = this._data.link;
      this._elementImage.alt = this._data.name;
      this._setEventListeners(this._element);
      return this._element;
   }
}