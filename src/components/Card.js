export default class Card {
   constructor(data, selector, handleCardClick) {
      this._data = data;
      this._selector = selector;
      this._handleCardClick = handleCardClick;
   }

   _handleClickImage = () => {
      this._handleCardClick(this._data);
   }

   _handleLikeClick = (evt) => {
      evt.target.classList.toggle('element_like-active');
   }

   _handleClickDeleteCard = () => {
      this._element.remove();
      this._element = null;
   }

   _setEventListeners = () => {
      this._element.querySelector('.element__delete').addEventListener('click', this._handleClickDeleteCard);
      this._elementImage.addEventListener('click', this._handleClickImage);
      this._element.querySelector('.element__like').addEventListener('click', this._handleLikeClick);
   }

   createCard = () => {
      this._template = document.querySelector(this._selector).content;
      this._element = this._template.cloneNode(true).children[0];
      this._element.querySelector('.element__text').textContent = this._data.title;
      this._elementImage = this._element.querySelector('.element__image');
      this._elementImage.src = this._data.link;
      this._elementImage.alt = this._data.title;
      this._setEventListeners();
      return this._element;
   }
}