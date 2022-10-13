import '../pages/index.css';
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";

const formElementProfile = document.forms['form-edit-profile']; 
const buttonEdit = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('[name=user-name]');
const jobInput = document.querySelector('[name=user-job]');

const titleInput = document.querySelector('[name=card-title]');
const linkInput = document.querySelector('[name=card-link]');
const formElementAddCard = document.forms['form-add-card'];

const popupWithFormAddCard = new PopupWithForm('.popup-add-card', submitPopupAddCard);

popupWithFormAddCard.setEventListeners();

const formValidatorAddCard = new FormValidator({
    formSelector: formElementAddCard,
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inputErrorClass: 'form__input_type-error',
    errorClass: 'form__input-error_active',
});

formValidatorAddCard.enableValidation();

const popupWithFormEditProfile = new PopupWithForm('.popup-edit-profile', submitPopupProfile);

popupWithFormEditProfile.setEventListeners();

const formValidatorEditProfile = new FormValidator({
    formSelector: formElementProfile,
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inputErrorClass: 'form__input_type-error',
    errorClass: 'form__input-error_active',
});

formValidatorEditProfile.enableValidation();

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
    const card = new Card(data, handleCardClick);
    section.addItem(card.createCard());
}

function handleCardClick(name, link) {
    const popupWithImage = new PopupWithImage(name, link, '.popup-image');
    popupWithImage.open();
    popupWithImage.setEventListeners();
}

function submitPopupProfile(evt) {
    evt.preventDefault();
    userInfo.setUserInfo(nameInput.value, jobInput.value);
    popupWithFormEditProfile.close();
}

function submitPopupAddCard(evt) {
    evt.preventDefault();
    addCard({ name: titleInput.value, link: linkInput.value, });
    popupWithFormAddCard.close();
}

buttonEdit.addEventListener('click', () => {
    nameInput.value = userInfo.getUserInfo().userName;
    jobInput.value = userInfo.getUserInfo().userJob;
    popupWithFormEditProfile._getInputValues();
    popupWithFormEditProfile.open();
});

addButton.addEventListener('click', () => {
    popupWithFormAddCard.open();
});