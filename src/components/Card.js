import { data } from "autoprefixer";

export default class Card {
   constructor(data, selector, handleCardClick, handleDeleteClick) {
      this._data = data;
      this._selector = selector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
   }

   _handleClickImage = () => {
      this._handleCardClick(this._data);
   }

   _handleLikeClick = (evt) => {
      evt.target.classList.toggle('element_like-active');
   }

   _handleClickDeleteCard = () => {
      this._handleDeleteClick(this._data, this._element);
      // this._removeCard();
   }

   _removeCard = () => {
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
      if (this._data.owner.name == 'MyMy') {
         this._element.querySelector('.element__delete').hidden = false;
      } else {
         this._element.querySelector('.element__delete').hidden = true;
      }
      this._element.querySelector('.element__text').textContent = this._data.name;
      this._elementImage = this._element.querySelector('.element__image');
      this._elementImage.src = this._data.link;
      this._elementImage.alt = this._data.name;
      this._setEventListeners();
      return this._element;
   }
}