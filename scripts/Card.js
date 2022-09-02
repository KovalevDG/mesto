class Card {
   static _template = document.querySelector('#card').content;
   constructor(name, link) {
      this._name = name;
      this._link = link;
   }

   _createCard() {
      this._element = Card._template.cloneNode(true);
  
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').alt = this._name;
      this._element.querySelector('.element__text').textContent = this._name;

      return this._element;
   }

   _putLike = (evt) => {
      evt.target.classList.toggle('element_like-active');
   }
 
   _showImage = () => {
      cardTitle.textContent = this._name;
      cardLink.src = this._link;
      cardLink.alt = this._name;
      showPopupImage();
   }
   
   _deleteCard = () => {
      this._card.remove();
   }

   render = (container) => {
      this._card = this._createCard(this._name, this._link).children[0];
      this._card.querySelector('.element__delete').addEventListener('click', this._deleteCard);
      this._card.querySelector('.element__image').addEventListener('click', this._showImage);
      this._card.querySelector('.element__like').addEventListener('click', this._putLike);
      container.prepend(this._card);
   }
}