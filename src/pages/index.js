import {BUTTON_EDIT, BUTTON_ADD, NAME_INPUT, JOB_INPUT, INITIAL_CARDS} from "../components/constants.js";
import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo({
    userName: '.profile__user-name',
    userJob: '.profile__user-job',
});

const selectorsAddCard = {
    formSelector: 'form-add-card',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inputErrorClass: 'form__input_type-error',
    errorClass: 'form__input-error_active',
}

const selectorsEditProfile = {
    formSelector: 'form-edit-profile',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inputErrorClass: 'form__input_type-error',
    errorClass: 'form__input-error_active',
};

const popupWithImage = new PopupWithImage('.popup-image');

const popupWithFormAddCard = new PopupWithForm('.popup-add-card', handleCardFormSubmit);

popupWithFormAddCard.setEventListeners();

const formValidatorAddCard = new FormValidator(selectorsAddCard);

formValidatorAddCard.enableValidation();

const popupWithFormEditProfile = new PopupWithForm('.popup-edit-profile', handleProfileFormSubmit);

popupWithFormEditProfile.setEventListeners();

const formValidatorEditProfile = new FormValidator(selectorsEditProfile);

formValidatorEditProfile.enableValidation();

const section = new Section({
            items: INITIAL_CARDS,
            render: insertCard,
        }, '.elements');

section.render();

function createCard(data, selector) {
    const card = new Card(data, selector, handleCardClick);
    return card;
}

function insertCard(data) {
    const card = createCard(data, '#card');
    section.addItem(card.createCard());
}

function handleCardClick(data) {
    popupWithImage.open(data);
    popupWithImage.setEventListeners();
}

function handleProfileFormSubmit(evt, data) {
    evt.preventDefault();
    userInfo.setUserInfo(data.name, data.job);
    popupWithFormEditProfile.close();
}

function handleCardFormSubmit(evt, data) {
    evt.preventDefault();
    insertCard(data);
    popupWithFormAddCard.close();
}

function setEventListenersProfileEdit() {
    const profile = userInfo.getUserInfo();
    NAME_INPUT.value = profile.userName;
    JOB_INPUT.value = profile.userJob;
    formValidatorEditProfile.toggleButtonState();
    popupWithFormEditProfile.open();
}

function setEventListenersAddCard() {
    formValidatorAddCard.toggleButtonState();
    popupWithFormAddCard.open();
}

BUTTON_EDIT.addEventListener('click', setEventListenersProfileEdit);

BUTTON_ADD.addEventListener('click', setEventListenersAddCard);