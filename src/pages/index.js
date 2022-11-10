import {BUTTON_EDIT, BUTTON_EDIT_AVATAR, BUTTON_ADD, CONFIG_SELECTORS} from "../utils/constants.js";
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
let userId;

const formAddCard = document.forms['form-add-card'];
const formEditProfile = document.forms['form-edit-profile'];
const formEditAvatar = document.forms['form-edit-avatar'];

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

const popupWithImage = new PopupWithImage('.popup-image');

popupWithImage.setEventListeners();

const popupWithFormAddCard = new PopupWithForm('.popup-add-card', handleCardFormSubmit);

popupWithFormAddCard.setEventListeners();

const formValidatorAddCard = new FormValidator(CONFIG_SELECTORS, formAddCard);

formValidatorAddCard.enableValidation();

const popupWithFormEditProfile = new PopupWithForm('.popup-edit-profile', handleProfileFormSubmit);

popupWithFormEditProfile.setEventListeners();

const formValidatorEditProfile = new FormValidator(CONFIG_SELECTORS, formEditProfile);

formValidatorEditProfile.enableValidation();

const popupWithFormDeleteCard = new PopupWithForm('.popup-delete-card', handleDeleteCardFormSubmit);

popupWithFormDeleteCard.setEventListeners();

const popupWithFormEditAvatar = new PopupWithForm('.popup-edit-avatar', handleAvatarFormSubmit);

popupWithFormEditAvatar.setEventListeners();

const formValidatorEditAvatar = new FormValidator(CONFIG_SELECTORS, formEditAvatar);

formValidatorEditAvatar.enableValidation();

const section = new Section({
            items: [],
            render: insertCard,
        }, '.elements');

let getCards = api.getInitialCards()
        .then((res) => {
            return res;
        });

let getUserInfo = api.getUserInfo()
    .then((res) => {
        return res;
    });

Promise.all([getUserInfo, getCards])
    .then(([userData, cards]) => {
        userInfo.setUsetAvatar(userData.avatar);
        userInfo.setUserInfo(userData);
        userId = userData._id;
        section.renderItems(cards);
    })
    .catch(err => {
            console.log(err);
    });

function editUserProfile(data) {
    return api.editUserInfo(data)
        .then((res) => {
            userInfo.setUserInfo(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

function editUserAvatar(data) {
    return api.editUserAvatar(data)
        .then((res) => {
            userInfo.setUsetAvatar(res.avatar);
        })
        .catch((err) => {
            console.log(err);
        });
}

function postCard(data) {
    return api.postCards(data)
        .then((res) => {   
            insertCard(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

function createCard(data, selector) {
    const card = new Card(data, selector, userId,{
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
    return api.deleteCard(data)
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
    return editUserProfile(data);
}

function handleAvatarFormSubmit(data) {
    return editUserAvatar(data);
}

function handleCardFormSubmit(data) {
    return postCard(data);
}

function handleDeleteCardFormSubmit() {
    return deleteCard(cardInfo)
        .then(() => {
            elementDeleted.remove();
            elementDeleted = null;
        })
}

function openEditProfilePopup() {
    const profile = userInfo.getUserInfo();
    popupWithFormEditProfile.setInputValues(profile);
    formValidatorEditAvatar.resetValidation();
    popupWithFormEditProfile.open();
}

function openEditAvatarPopup() {
    formValidatorEditAvatar.resetValidation();
    popupWithFormEditAvatar.open();
}

function openAddCardPopup() {
    formValidatorEditAvatar.resetValidation();
    popupWithFormAddCard.open();
}

BUTTON_EDIT.addEventListener('click', openEditProfilePopup);

BUTTON_EDIT_AVATAR.addEventListener('click', openEditAvatarPopup);

BUTTON_ADD.addEventListener('click', openAddCardPopup);