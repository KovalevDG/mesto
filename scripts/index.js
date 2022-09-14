import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popups = document.querySelectorAll('.popup');
const popupProfileActive = document.querySelector('.popup-edit-profile');
const formElementProfile = document.forms['form-edit-profile']; 
const buttonEdit = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('[name=user-name]');
const jobInput = document.querySelector('[name=user-job]');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserJob = document.querySelector('.profile__user-job');

const titleInput = document.querySelector('[name=card-title]');
const linkInput = document.querySelector('[name=card-link]');
const formElementAddCard = document.forms['form-add-card'];
const popupCardActive = document.querySelector('.popup-add-card');

const popupImageActive = document.querySelector('.popup-image');
const cardTitle = popupImageActive.querySelector('.popup-image__title');
const cardLink = popupImageActive.querySelector('.popup-image__image');
const elements = document.querySelector('.elements');

const formValidator = new FormValidator({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inputErrorClass: 'form__input_type-error',
    errorClass: 'form__input-error_active',
});

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function addCard(item) {
    const card = new Card(item.name, item.link, showPopupImage);
    elements.prepend(card.createCard());
}

function showPopupEdit() {
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserJob.textContent;
    formValidator.enableValidation(formElementProfile);
    openPopup(popupProfileActive);
}

function submitPopupProfile(evt) {
    evt.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserJob.textContent = jobInput.value;
    closePopup(popupProfileActive);
}

function showPopupAddCard() {
    formElementAddCard.reset();
    formValidator.enableValidation(formElementAddCard);
    openPopup(popupCardActive);
}

function submitPopupAddCard(evt) {
    evt.preventDefault();
    addCard({ name: titleInput.value, link: linkInput.value,}, showPopupImage);
    closePopup(popupCardActive);
}

function showPopupImage(name, link) {
    cardTitle.textContent = name;
    cardLink.src = link;
    openPopup(popupImageActive);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function popupAddEventListener() {
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
                closePopup(popup);
            }
        });
    });
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

buttonEdit.addEventListener('click', () => { 
    showPopupEdit();
});

addButton.addEventListener('click', () => {
    showPopupAddCard();
});
formElementProfile.addEventListener('submit', submitPopupProfile);
formElementAddCard.addEventListener('submit', submitPopupAddCard);
popupAddEventListener();

initialCards.forEach(function (item) {
    addCard(item);
});