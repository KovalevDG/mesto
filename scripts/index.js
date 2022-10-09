import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";

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

const popupWithFormAddCard = new PopupWithForm('.popup-add-card', () => {
        const newCard = addCard({ name: titleInput.value, link: linkInput.value, }, showPopupImage);
        elements.prepend(newCard);
        popupWithFormAddCard.close();
});

const popupWithFormEditProfile = new PopupWithForm('.popup-edit-profile', () => {
    evt.preventDefault();
    userInfo.setUserInfo(nameInput.value, jobInput.value);
    popupWithFormEditProfile.close();
});

popupWithFormEditProfile.setEventListeners();
popupWithFormAddCard.setEventListeners();

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

const userInfo = new UserInfo({
    userName: '.profile__user-name',
    userJob: '.profile__user-job',
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

const section = new Section({
            items: initialCards,
            render: addCard,
        }, '.elements');

section.render();

function addCard(data) {
    console.log(data);
    const card = new Card(data, handleCardClick);
    section.addItem(card.createCard());
}

function handleCardClick(data) {
    const popupWithImage = new PopupWithImage(data.name, data.link, '.popup-image');
    popupWithImage.open();
    popupWithImage.setEventListeners();
}

// section.addItem();

function showPopupEdit() {
    const profileUserInfo = userInfo.getUserInfo();
    nameInput.value = profileUserInfo.userName.textContent;
    jobInput.value = profileUserInfo.userJob.textContent;
    formValidatorEditProfile.toggleButtonState();
    popupWithFormEditProfile.open();
}

// function submitPopupProfile(evt) {
//     evt.preventDefault();
//     userInfo.setUserInfo(nameInput.value, jobInput.value);
//     popupWithFormEditProfile.close();
// }

function showPopupAddCard() {
    formValidatorAddCard.toggleButtonState();
    popupWithFormAddCard.open();
}

// function submitPopupAddCard() {
//     evt.preventDefault();
//     const newCard = addCard({ name: titleInput.value, link: linkInput.value, }, showPopupImage);
//     elements.prepend(newCard);
//     popupWithFormAddCard.close();
// }

// function showPopupImage(name, link) {
//     const popupWithImage = new PopupWithImage(name, link, '.popup-image');
//     popupWithImage.open();
//     popupWithImage.setEventListeners();
// }

buttonEdit.addEventListener('click', () => { 
    showPopupEdit();
});

addButton.addEventListener('click', () => {
    showPopupAddCard();
});