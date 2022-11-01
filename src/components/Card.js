export default class Card {
   constructor(data, selector, objFunctioins) {
      this._data = data;
      this._id = data._id;
      this._selector = selector;
      this._handleCardClick = objFunctioins.handleCardClick;
      this._handleDeleteClick = objFunctioins.handleDeleteClick;
      this._putLikeCard = objFunctioins.putLikeCard;
      this._removeLikeCard = objFunctioins.removeLikeCard;
      this._owner = document.querySelector('.profile__user-name');
      this._arrayLikes = this._data.likes;
   }

   _handleClickImage = () => {
      this._handleCardClick(this._data);
   }

   _handleLikeClick = (evt) => {
      if (evt.target.classList.contains('element_like-active')) {
         evt.target.classList.remove('element_like-active');
         this._removeLikeCard(this._id);
      } else {
         evt.target.classList.add('element_like-active');
         this._putLikeCard(this._id);
      }
   }

   _setCounterLike = () => {
      this._likeCounter.textContent = this._arrayLikes.length;
      // console.log(this._likeCounter);
   }

   setLikeInfo = (data) => {
      // console.log(data);
      this._arrayLikes = data.likes;
      this._setCounterLike();
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
      this._elementLikeCounter = this._element.querySelector('.element__like-counter');
      if (this._data.owner.name == this._owner.textContent) {
         this._element.querySelector('.element__delete').hidden = false;
      } else {
         this._element.querySelector('.element__delete').hidden = true;
      }
      this._element.querySelector('.element__text').textContent = this._data.name;
      this._setCounterLike();
      this._elementImage = this._element.querySelector('.element__image');
      this._elementImage.src = this._data.link;
      this._elementImage.alt = this._data.name;
      this._elementLikeCounter = this._arrayLikes;
      this._setEventListeners();
      this._putLikeCard(this._id);
      return this._element;
   }
}