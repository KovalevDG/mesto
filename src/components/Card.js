export default class Card {
   constructor(data, selector, objFunctioins) {
      this._data = data;
      this._selector = selector;
      this._handleCardClick = objFunctioins.handleCardClick;
      this._handleDeleteClick = objFunctioins.handleDeleteClick;
      this._putLike = objFunctioins.putLikeCard;
      this._removeLike = objFunctioins.removeLikeCard;
      this._owner = document.querySelector('.profile__user-name');
      this._likeCounter = document.querySelector('.element__like-counter');
      this._arrayLikes = this._data.likes;
   }

   _handleClickImage = () => {
      this._handleCardClick(this._data);
   }

   _handleLikeClick = (evt) => {
      if (evt.target.classList.contains('element_like-active')) {
         evt.target.classList.remove('element_like-active');
         this._removeLike(this);
      } else {
         evt.target.classList.add('element_like-active');
         this._putLike(this);
      }
   }

   setLikeInfo = (data) => {
      this._arrayLikes = data.likes;
      this._likeCounter.textContent = this._arrayLikes.length;
   }

   _handleClickDeleteCard = () => {
      this._handleDeleteClick(this._data, this._element);
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
      if (this._data.owner.name == this._owner.textContent) {
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