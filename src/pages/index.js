import {BUTTON_EDIT, BUTTON_ADD, NAME_INPUT, JOB_INPUT} from "../utils/constants.js";
import './index.css';
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

let cardInfo;
let elementDeleted;

const options = {
    headers: {
        authorization: '7c3683ec-8b7d-4bcf-ad22-d226ef2effb7'
    }
};

const userInfo = new UserInfo({
    userName: '.profile__user-name',
    userJob: '.profile__user-job',
    userAvatar: '.profile__avatar',
});

const api = new Api(options);

const configSelestors = {
    formSelector: 'form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inputErrorClass: 'form__input_type-error',
    errorClass: 'form__input-error_active',
}

const popupWithImage = new PopupWithImage('.popup-image');

popupWithImage.setEventListeners();

const popupWithFormAddCard = new PopupWithForm('.popup-add-card', handleCardFormSubmit);

popupWithFormAddCard.setEventListeners();

const formValidatorAddCard = new FormValidator(configSelestors, 'form-add-card');

formValidatorAddCard.enableValidation();

const popupWithFormEditProfile = new PopupWithForm('.popup-edit-profile', handleProfileFormSubmit);

popupWithFormEditProfile.setEventListeners();

const formValidatorEditProfile = new FormValidator(configSelestors, 'form-edit-profile');

formValidatorEditProfile.enableValidation();

const popupWithFormDeleteCard = new PopupWithForm('.popup-delete-card', handleDeleteCardFormSubmit);

popupWithFormDeleteCard.setEventListeners();

const section = new Section({
            items: [],
            render: insertCard,
        }, '.elements');

api.getInitialCards()
    .then((result) => {
        section.items = result;
        section.renderItems();
    })
    .catch((err) => {
        console.log(err);
    });

function setUserProfile() {
    api.getUserInfo()
        .then((res) => {
            userInfo.setUsetAvatar(res.avatar);
            userInfo.setUserInfo(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

function editUserProfile(data) {
    api.editUserInfo(data)
        .then((res) => {
            userInfo.setUserInfo(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

function postCard(data) {
    api.postCards(data)
        .then((res) => {
            insertCard(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

setUserProfile();

function createCard(data, selector) {
    const card = new Card(data, selector, handleCardClick, handleDeleteClick);
    return card;
}

function insertCard(data) {
    const card = createCard(data, '#card');
    section.addItem(card.createCard());
}

function deleteCard(data) {
    api.deleteCard(data)
    .then((res) => {
        // insertCard(res);
    })
    .catch((err) => {
        console.log(err);
    });
}

function handleCardClick(data) {
    popupWithImage.open(data);
}

function handleDeleteClick(data, element) {
    cardInfo = data;
    elementDeleted = element;
    popupWithFormDeleteCard.open();
}

function handleProfileFormSubmit(evt, data) {
    evt.preventDefault();
    editUserProfile(data);
    popupWithFormEditProfile.close();
}

function handleCardFormSubmit(evt, data) {
    evt.preventDefault();
    postCard(data);
    popupWithFormAddCard.close();
}

function handleDeleteCardFormSubmit(evt) {
    console.log(cardInfo);
    evt.preventDefault();
    deleteCard(cardInfo);
    elementDeleted.remove();
    elementDeleted = null;
    popupWithFormDeleteCard.close(); 
}

function openEditProfilePopup() {
    const profile = userInfo.getUserInfo();
    NAME_INPUT.value = profile.userName;
    JOB_INPUT.value = profile.userJob;
    formValidatorEditProfile.toggleButtonState();
    popupWithFormEditProfile.open();
}

function openAddCardPopup() {
    formValidatorAddCard.toggleButtonState();
    popupWithFormAddCard.open();
}

BUTTON_EDIT.addEventListener('click', openEditProfilePopup);

BUTTON_ADD.addEventListener('click', openAddCardPopup);