import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";

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

const formValidatorEditProfile = new FormValidator({
    formSelector: formElementProfile,
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inputErrorClass: 'form__input_type-error',
    errorClass: 'form__input-error_active',
});

const formValidatorAddCard = new FormValidator({
    formSelector: formElementAddCard,
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inputErrorClass: 'form__input_type-error',
    errorClass: 'form__input-error_active',
});

formValidatorEditProfile.enableValidation();
formValidatorAddCard.enableValidation();

const popupWithForm = new PopupWithForm('.popup-edit-profile', submitPopupProfile);

popupWithForm._getInputValues();

// const popup = new Popup('.popup-edit-profile');

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

function addCard(item, showPopupImage) {
    const card = new Card(item.name, item.link, showPopupImage);
    return card.createCard();
}

// function showPopupEdit() {
//     nameInput.value = profileUserName.textContent;
//     jobInput.value = profileUserJob.textContent;
//     formValidatorEditProfile.toggleButtonState();
//     openPopup(popupProfileActive);
// }

function submitPopupProfile(evt) {
    evt.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserJob.textContent = jobInput.value;
    popup.close();
}

function showPopupAddCard() {
    formElementAddCard.reset();
    formValidatorAddCard.toggleButtonState();
    openPopup(popupCardActive);
}

function submitPopupAddCard(evt) {
    evt.preventDefault();
    const newCard = addCard({ name: titleInput.value, link: linkInput.value, }, showPopupImage);
    elements.prepend(newCard);
    closePopup(popupCardActive);
}

function showPopupImage(name, link) {
    const popupWithImage = new PopupWithImage(name, link, '.popup-image');
    popupWithImage.open();
    popupWithImage.setEventListeners();
}

buttonEdit.addEventListener('click', () => { 
    // showPopupEdit();
    // popup.open();
    // popup.setEventListeners();
});

addButton.addEventListener('click', () => {
    showPopupAddCard();
});
formElementProfile.addEventListener('submit', submitPopupProfile);
formElementAddCard.addEventListener('submit', submitPopupAddCard);

initialCards.forEach(function (item) {
    elements.prepend(addCard(item, showPopupImage));
});