import {BUTTON_EDIT, BUTTON_EDIT_AVATAR, BUTTON_ADD, NAME_INPUT, JOB_INPUT} from "../utils/constants.js";
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

const userInfo = new UserInfo({
    userName: '.profile__user-name',
    userJob: '.profile__user-job',
    userAvatar: '.profile__avatar-image',
});

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52/',
    headers: {
        authorization: '7c3683ec-8b7d-4bcf-ad22-d226ef2effb7',
        'Content-Type': 'application/json'
     }
});

const configSelectors = {
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

const formValidatorAddCard = new FormValidator(configSelectors, 'form-add-card');

formValidatorAddCard.enableValidation();

const popupWithFormEditProfile = new PopupWithForm('.popup-edit-profile', handleProfileFormSubmit);

popupWithFormEditProfile.setEventListeners();

const formValidatorEditProfile = new FormValidator(configSelectors, 'form-edit-profile');

formValidatorEditProfile.enableValidation();

const popupWithFormDeleteCard = new PopupWithForm('.popup-delete-card', handleDeleteCardFormSubmit);

popupWithFormDeleteCard.setEventListeners();

const popupWithFormEditAvatar = new PopupWithForm('.popup-edit-avatar', handleAvatarFormSubmit);

popupWithFormEditAvatar.setEventListeners();

const formValidatorEditAvatar = new FormValidator(configSelectors, 'form-edit-avatar');

formValidatorEditAvatar.enableValidation();

const section = new Section({
            items: [],
            render: insertCard,
        }, '.elements');

api.getInitialCards()
    .then((res) => {
        section.renderItems(res);
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

function editUserAvatar(data) {
    api.editUserAvatar(data)
        .then((res) => {
            userInfo.setUsetAvatar(res.avatar);
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
    const card = new Card(data, selector, {
        handleCardClick,
        handleDeleteClick,
        putLikeCard: (cardId) => {
            api.putLikeCard(cardId)
                .then((res) => {
                    card.setLikeInfo(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        removeLikeCard: () => {
            api.removeLikeCard(data)
                .then((res) => {
                    card.setLikeInfo(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
    return card;
}

function insertCard(data) {
    const card = createCard(data, '#card');
    section.addItem(card.createCard());
}

function deleteCard(data) {
    api.deleteCard(data)
    .then((res) => res)
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

function handleProfileFormSubmit(data) {
    editUserProfile(data);
    popupWithFormEditProfile.close();
}

function handleAvatarFormSubmit(data) {
    editUserAvatar(data);
    popupWithFormEditAvatar.close();
}

function handleCardFormSubmit(data) {
    postCard(data);
    popupWithFormAddCard.close();
}

function handleDeleteCardFormSubmit() {
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

function openEditAvatarPopup() {
    formValidatorEditAvatar.toggleButtonState();
    popupWithFormEditAvatar.open();
}

function openAddCardPopup() {
    formValidatorAddCard.toggleButtonState();
    popupWithFormAddCard.open();
}

BUTTON_EDIT.addEventListener('click', openEditProfilePopup);

BUTTON_EDIT_AVATAR.addEventListener('click', openEditAvatarPopup);

BUTTON_ADD.addEventListener('click', openAddCardPopup);